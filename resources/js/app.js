import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css'; // AntD 5: Dùng reset CSS
import App from '@components/App';


const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);