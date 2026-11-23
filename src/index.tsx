import { createRoot } from 'react-dom/client';
import Example from './Example';

const container = document.getElementById('root');

if (!container) {
  throw new Error('The #root element is missing from the HTML document.');
}

createRoot(container).render(<Example />);
