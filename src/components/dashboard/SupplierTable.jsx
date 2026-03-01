import { supplierData } from '../../data/supplierTableData';
import { useSort } from '../../hooks/useSort';
import { SortIcon } from '../ui/SortIcon';
import { formatCompact, formatPct } from '../../utils/format';

const COLUMNS = [
  { key: 'id', label: '#', align: 'left' },
  { key: 'name', label: 'Supplier', align: 'left' },
  { key: 'rechargeType', label: 'Recharge Type', align: 'left' },
  { key: 'cost', label: 'Cost ($)', align: 'right' },
  { key: 'pct', label: 'Cost (%)', align: 'right' },
];

export function SupplierTable() {
  const { sorted, sortKey, sortDir, toggleSort } = useSort(supplierData, 'cost', 'desc');
  const maxCost = Math.max(...supplierData.map((r) => r.cost));

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Cost by Supplier</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                onClick={() => toggleSort(col.key)}
                className={`py-2 px-2 text-gray-500 font-medium cursor-pointer hover:text-gray-800 select-none text-${col.align}`}
              >
                <span className={`flex items-center gap-1 ${col.align === 'right' ? 'justify-end' : ''}`}>
                  {col.label}
                  <SortIcon direction={sortKey === col.key ? sortDir : 'none'} />
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="py-2.5 px-2 text-gray-500">{row.id}</td>
              <td className="py-2.5 px-2 font-medium text-gray-800">
                <div className="flex items-center gap-1.5">
                  {row.name}
                  <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">···</span>
                </div>
              </td>
              <td className="py-2.5 px-2">
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                  row.rechargeType === 'Annual in Advance'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-green-50 text-green-700'
                }`}>
                  {row.rechargeType}
                </span>
              </td>
              <td className="py-2.5 px-2 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full"
                      style={{ width: `${(row.cost / maxCost) * 100}%` }}
                    />
                  </div>
                  <span className="text-gray-700 font-medium">{formatCompact(row.cost)}</span>
                </div>
              </td>
              <td className="py-2.5 px-2 text-right text-gray-600">{formatPct(row.pct)}</td>
            </tr>
          ))}
          <tr className="border-t-2 border-gray-200 bg-gray-50 font-semibold">
            <td className="py-2.5 px-2 text-gray-600" colSpan={3}>Totals</td>
            <td className="py-2.5 px-2 text-right text-gray-800">
              {formatCompact(supplierData.reduce((s, r) => s + r.cost, 0))}
            </td>
            <td className="py-2.5 px-2 text-right text-gray-800">100.00%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
