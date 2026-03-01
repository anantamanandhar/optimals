import { useState } from 'react';
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { monthlyBreakdown, monthColumns } from '../../data/monthlyBreakdownData';
import { formatCompact } from '../../utils/format';

export function MonthlyBreakdown() {
  const [expanded, setExpanded] = useState(new Set());

  const toggleRow = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const rowTotal = (months) => months.reduce((s, v) => s + v, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mt-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Breakdown</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ minWidth: 1100 }}>
          <thead>
            <tr className="border-b border-gray-200">
              <th className="sticky left-0 bg-white py-2 px-3 text-left text-gray-500 font-medium w-44">
                Bill To
              </th>
              <th className="py-2 px-3 text-left text-gray-500 font-medium w-28">Supplier</th>
              {monthColumns.map((m) => (
                <th key={m} className="py-2 px-2 text-right text-gray-500 font-medium whitespace-nowrap text-xs">
                  {m}
                </th>
              ))}
              <th className="py-2 px-3 text-right text-gray-500 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {monthlyBreakdown.map((row) => (
              <React.Fragment key={row.id}>
                <tr
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => toggleRow(row.id)}
                >
                  <td className="sticky left-0 bg-inherit py-2.5 px-3 font-medium text-gray-800">
                    <div className="flex items-center gap-2">
                      <ChevronRight
                        size={14}
                        className={`text-gray-400 transition-transform shrink-0 ${expanded.has(row.id) ? 'rotate-90' : ''}`}
                      />
                      {row.name}
                      <span className="text-xs text-gray-400">({row.count})</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-gray-500 text-xs">—</td>
                  {row.months.map((v, i) => (
                    <td key={i} className="py-2.5 px-2 text-right text-gray-700 text-xs whitespace-nowrap">
                      {v ? formatCompact(v) : <span className="text-gray-300">∅</span>}
                    </td>
                  ))}
                  <td className="py-2.5 px-3 text-right font-semibold text-gray-800 text-xs">
                    {formatCompact(rowTotal(row.months))}
                  </td>
                </tr>
                {expanded.has(row.id) &&
                  row.children?.map((child) => (
                    <tr
                      key={child.id}
                      className="border-b border-gray-50 bg-gray-50"
                    >
                      <td className="sticky left-0 bg-gray-50 py-2 px-3 text-gray-500 text-xs pl-10">
                        {row.name}
                      </td>
                      <td className="py-2 px-3 text-gray-600 text-xs">{child.name}</td>
                      {child.months.map((v, i) => (
                        <td key={i} className="py-2 px-2 text-right text-gray-500 text-xs whitespace-nowrap">
                          {v ? formatCompact(v) : <span className="text-gray-300">∅</span>}
                        </td>
                      ))}
                      <td className="py-2 px-3 text-right text-gray-600 text-xs">
                        {formatCompact(rowTotal(child.months))}
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
