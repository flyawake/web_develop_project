// App.jsx
import React from 'react';
import GlobalHeader from './components/GlobalHeader';
import './App.css';

function App() {
    return (
        <div className="App">
            <GlobalHeader />
            {/* 其他页面内容 */}
            <div style={{ marginTop: '150px' }}>
                {/* 添加一些间距防止内容被头部覆盖 */}
                <p>这里是页面内容</p>
            </div>
        </div>
    );
}

export default App;