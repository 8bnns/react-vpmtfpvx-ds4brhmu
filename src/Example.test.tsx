import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderToString } from 'react-dom/server';
import AssetAllocationDonut from './Example';

test('renders using the documented default props', () => {
  assert.doesNotThrow(() => renderToString(<AssetAllocationDonut />));
});

test('accepts custom values and an empty allocation', () => {
  assert.doesNotThrow(() =>
    renderToString(
      <AssetAllocationDonut
        netWorth={0}
        currency="EUR"
        assetAllocation={[]}
      />,
    ),
  );
});
