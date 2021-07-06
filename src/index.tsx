import ReactDOM from 'react-dom';
import App from './container/App/app'
import { Provider } from 'react-redux';
import rootStore from './store/configureStore';

ReactDOM.render(
    <Provider store={rootStore}>
        <App />
    </Provider>,
    document.getElementById('root'));
