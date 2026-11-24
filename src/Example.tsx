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

type AssetAllocationItem = {
  category_code: string;
  name: string;
  total_value: number;
};

type AssetAllocationDonutProps = {
  netWorth?: number;
  currency?: string;
  assetAllocation?: AssetAllocationItem[];
};

const COLORS = ['red', 'white', 'purple', 'pink', 'green', 'grey'];

const DEFAULT_ASSET_ALLOCATION: AssetAllocationItem[] = [
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

const DEFAULT_NET_WORTH = 1973944.93;
const DEFAULT_CURRENCY = 'USD';

function formatValue(value: number, currency: string) {
  return `${new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  }).format(value)} ${currency}`;
}

function formatPercentage(value: number, total: number) {
  if (total <= 0) return '0.0%';
  return `${((value / total) * 100).toFixed(1)}%`;
}

export default function AssetAllocationDonut({
  netWorth = DEFAULT_NET_WORTH,
  currency = DEFAULT_CURRENCY,
  assetAllocation = DEFAULT_ASSET_ALLOCATION,
}: AssetAllocationDonutProps) {
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
              innerRadius="80%"
              outerRadius="90%"
              paddingAngle={2}
              cornerRadius={99}
              labelLine={false}
            >
              {assetAllocation.map((item, index) => (
                <Cell
                  key={item.category_code}
                  fill={COLORS[index % COLORS.length]}
                  stroke="none"
                />
              ))}
              <Label
                position="center"
                value={formatValue(netWorth, currency)}
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
                      {formatValue(Number(data.value), currency)}
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
                if (!payload) return null;

                return (
                  <ul className="flex flex-col gap-2">
                    {payload.map((entry) => {
                      const categoryData = assetAllocation.find(
                        (item) => item.name === entry.value,
                      );

                      return (
                        <li key={entry.value}>
                          <div className="flex items-center gap-1">
                            <div
                              className="h-2 w-2 shrink-0 rounded-[2px]"
                              style={{ backgroundColor: entry.color }}
                            />
                            <span className="text-xs">
                              {entry.value}{' '}
                              {categoryData && (
                                <span className="text-muted-foreground text-xs">
                                  {formatPercentage(
                                    categoryData.total_value,
                                    totalHoldingsValue,
                                  )}
                                </span>
                              )}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
