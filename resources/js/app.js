
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/reset.css'; // AntD 5: Dùng reset CSS
import App from '@components/App';


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}