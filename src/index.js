import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// !!!!!!!

// Uncomment this to run the program in Local Machine // 
ReactDOM.render(<App />, document.getElementById('root'));

// Uncomment this to build the App to Chain Market //
// App ID = a1234567
// window.a1234567 = {
//     mount: () => {
//         const el = document.getElementById('a1234567');
//         ReactDOM.render(<App />, el);
//     },
//     unmount: () => {
//         const el = document.getElementById('a1234567');
//         ReactDOM.unmountComponentAtNode(el);
//     }
// }
// serviceWorker.unregister();
