import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import "semantic-ui-css/semantic.css";
// import './semantic-ui/semantic-ui.less'
// import './semantic/semantic';
// import './semantic/semantic.less';
import './semantic/dist/semantic.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
