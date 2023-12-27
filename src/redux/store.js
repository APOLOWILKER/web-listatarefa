import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import tarefasReducer from './reducers/tarefasReducer';
import tarefasSaga from './sagas/tarefasSaga';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(tarefasReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(tarefasSaga);

export default store;
