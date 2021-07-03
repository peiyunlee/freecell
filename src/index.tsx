import ReactDOM from 'react-dom';
import App from './container/App/app'
import { Provider } from 'react-redux';
import store from './store/configureStore';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));
