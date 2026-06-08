'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
  Tooltip,
  Legend,
} from 'recharts';

// import {
//   formatCompactCurrency,
//   formatCurrency,
//   formatPercentage,
// } from '@/lib/number-format';

const COLORS = ['red', 'white', 'purple', 'pink', 'green', 'grey'];

const assetAllocation = [
  {
    category_code: 'cash',
    name: 'Cash & Equivalents',
    total_value: 15000,
  },
  {
    category_code: 'stocks',
    name: 'Stocks',
    total_value: 45000,
  },
  {
    category_code: 'crypto',
    name: 'Cryptocurrencies',
    total_value: 8000,
  },
  {
    category_code: 'real_estate',
    name: 'Real Estate',
    total_value: 30000,
  },
  {
    category_code: 'bonds',
    name: 'Bonds',
    total_value: 10000,
  },
];

const netWorth = 1973944.93;
const currency = 'USD';

export default function AssetAllocationDonut({}: {
  netWorth: number;
  currency: string;
  assetAllocation: Array<{
    category_code: string;
    name: string;
    total_value: number;
  }>;
}) {
  // Calculate total value for percentage calculation
  const totalHoldingsValue = useMemo(() => {
    return assetAllocation.reduce((sum, item) => sum + item.total_value, 0);
  }, [assetAllocation]);

  return (
    <div
      className="flex h-64 flex-col gap-0 md:h-80"
      style={{ backgroundColor: '#111', color: '#fff' }}
    >
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={assetAllocation}
              dataKey="total_value"
              nameKey="name"
              innerRadius={'80%'}
              outerRadius={'90%'}
              paddingAngle={2}
              cornerRadius={99}
              labelLine={false}
            >
              {assetAllocation.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
              {/* works like in 3.1.0 */}
              <Label
                position="center"
                value={`${netWorth} ${currency}`}
                style={{
                  fontSize: '16px',
                  fontWeight: 'bolder',
                  fill: '#fff',
                }}
                dy={-5}
              />
              <Label
                position="center"
                value="Net Worth"
                style={{
                  fontSize: '12px',
                  fill: '#fff',
                }}
                dy={15}
              />
              {/* centers on the whole thing not just the pie */}
              {/* <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 5}
                          style={{
                            fontSize: '16px',
                            fontWeight: 'bolder',
                            fill: '#fff',
                          }}
                        >
                          {`${netWorth} ${currency}`}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 15}
                          style={{
                            fontSize: '12px',
                            fill: '#fff',
                          }}
                        >
                          Net Worth
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              /> */}
            </Pie>
            <Tooltip
              wrapperStyle={{ zIndex: 10 }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;

                const data = payload[0];
                return (
                  <div className="bg-background border-border flex items-center gap-1.5 rounded-md border px-2.5 py-1.5">
                    <div
                      className="h-3 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: data.payload.fill }}
                    />
                    <span className="text-muted-foreground text-xs">
                      {data.payload.name}
                    </span>
                    <span className="text-foreground text-xs font-semibold">
                      {`${Number(data.value)}, ${currency})`}
                    </span>
                  </div>
                );
              }}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{ width: '45%', right: 0, zIndex: 1 }}
              content={({ payload }) => {
                if (payload)
                  return (
                    <ul className="flex flex-col gap-2">
                      {payload.map((entry, index) => {
                        // Fix for Recharts 3.0: Access data from entry.payload instead
                        const categoryData = assetAllocation.find(
                          (item) => item.name === entry.value
                        );

                        return (
                          <li key={`item-${index}`}>
                            <div className="flex items-center gap-1">
                              <div
                                className="h-2 w-2 shrink-0 rounded-[2px]"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="text-xs">
                                {entry.value}{' '}
                                <span className="text-muted-foreground text-xs">
                                  {categoryData &&
                                    categoryData.total_value /
                                      totalHoldingsValue}
                                </span>
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  );
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
