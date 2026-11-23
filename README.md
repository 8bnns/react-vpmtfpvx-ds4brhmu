# React Asset Allocation Chart

A small React 19 and Recharts example that renders an asset-allocation donut chart. The component includes sample data by default and also accepts custom allocation, net-worth, and currency props.

[Edit in StackBlitz](https://stackblitz.com/~/github.com/8bnns/react-vpmtfpvx-ds4brhmu)

## Requirements

- Node.js `^20.19.0` or `>=22.12.0`, matching Vite's runtime requirement.
- npm.

The project uses Vite 8 and TypeScript 5. Direct development dependencies are pinned, but the repository does not currently include a lockfile; commit a reviewed lockfile separately if fully reproducible transitive installs are required.

## Install and run

```bash
npm install
npm run dev
```

Vite serves the example locally and prints the local URL in the terminal. `npm start` is available as an alias for `npm run dev`.

## Validate

```bash
npm run typecheck
npm run test:ci
npm run build
```

Or run the complete sequence:

```bash
npm run check
```

The tests render the chart with default props and with custom values and an empty allocation. They do not perform browser, visual-regression, or accessibility testing.

## Component API

`src/Example.tsx` exports `AssetAllocationDonut` with optional props:

| Prop | Type | Default |
| --- | --- | --- |
| `netWorth` | `number` | `1973944.93` |
| `currency` | `string` | `USD` |
| `assetAllocation` | `Array<{ category_code: string; name: string; total_value: number }>` | Built-in sample data |

Example:

```tsx
<AssetAllocationDonut
  netWorth={120000}
  currency="EUR"
  assetAllocation={[
    { category_code: 'cash', name: 'Cash', total_value: 20000 },
    { category_code: 'stocks', name: 'Stocks', total_value: 100000 },
  ]}
/>
```

Values and percentages are formatted for display. An empty allocation is accepted and its percentage fallback is 0.0%.

## Project structure

```text
react-vpmtfpvx-ds4brhmu/
├── index.html
├── public/
├── src/
│   ├── Example.tsx
│   ├── Example.test.tsx
│   └── index.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

Generated build output, dependencies, coverage, logs, and local environment files are ignored. Do not commit secrets or real financial data; the included values are sample data only.
