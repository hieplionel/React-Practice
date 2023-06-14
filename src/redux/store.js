import { createStore, applyMiddleware  } from 'redux';

import rootReducer from '../redux/reducers/rootReducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store  = createStore(rootReducer, applyMiddleware(thunk));

export default store;