import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
} from 'recharts';
import { pieData } from '../../data/pieData';

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-sm">
      <p className="font-medium text-gray-800">{name}</p>
      <p className="text-gray-600">{value.toFixed(2)}%</p>
    </div>
  );
}

function CustomLegend({ data }) {
  return (
    <div className="flex flex-col gap-1.5 justify-center">
      {data.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="w-2.5 h-2.5 rounded-sm shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-700 truncate max-w-[130px]">{entry.name}</span>
          <span className="text-gray-500 ml-auto pl-2 font-medium">{entry.value.toFixed(2)}%</span>
        </div>
      ))}
    </div>
  );
}

export function CostByBillToPie() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">% of Cost by BillTo</h3>
      <div className="flex items-center gap-4">
        <div className="flex-1 min-w-0" style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={55}
                paddingAngle={1}
                startAngle={90}
                endAngle={-270}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="white" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-48 shrink-0">
          <CustomLegend data={pieData} />
        </div>
      </div>
    </div>
  );
}
