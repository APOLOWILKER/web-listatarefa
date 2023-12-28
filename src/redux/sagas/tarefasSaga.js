// redux/sagas/tarefasSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api';
import * as actions from '../actions/tarefasActions';

function* fetchTarefas() {
  try {
    const tarefas = yield call(api.fetchTarefas);
    yield put(actions.fetchTarefasSuccess(tarefas));
  } catch (error) {
    yield put(actions.fetchTarefasFailure(error.message));
  }
}

function* createTarefa(action) {
  try {
    yield call(api.createTarefa, action.payload);
    yield put(actions.createTarefaSuccess());
    yield put(actions.fetchTarefasRequest()); // Atualiza a lista após criar uma tarefa
  } catch (error) {
    yield put(actions.createTarefaFailure(error.message));
  }
}

function* deleteTarefa(action) {
  try {
    yield call(api.deleteTarefa, action.payload); // Supondo que deleteTarefa aceita o ID como argumento
    yield put(actions.deleteTarefaSuccess(action.payload));
    yield put(actions.fetchTarefasRequest()); // Atualiza a lista após deletar uma tarefa
  } catch (error) {
    yield put(actions.deleteTarefaFailure(error.message));
  }
}

function* updateTarefa(action) {
  try {
    yield call(api.updateTarefa, action.payload.id, action.payload); // Certifique-se de passar ID e dados corretamente
    const updatedTarefa = yield call(api.fetchTarefaById, action.payload.id);

    yield put(actions.updateTarefaSuccess(updatedTarefa));
    yield put(actions.fetchTarefasRequest()); // Atualiza a lista após atualizar uma tarefa
  } catch (error) {
    yield put(actions.updateTarefaFailure(error.message));
  }
}

function* completeTarefa(action) {
  try {
    yield call(api.updateTarefa, action.payload, { status: 'Finalizada' }); // Supondo que completeTarefa aceita o ID como argumento
    yield put(actions.completeTarefaSuccess(action.payload));
    yield put(actions.fetchTarefasRequest()); // Atualiza a lista após completar uma tarefa
  } catch (error) {
    yield put(actions.completeTarefaFailure(error.message));
  }
}

function* tarefasSaga() {
  yield takeLatest('FETCH_TAREFAS_REQUEST', fetchTarefas);
  yield takeLatest('CREATE_TAREFA_REQUEST', createTarefa);
  yield takeLatest('DELETE_TAREFA_REQUEST', deleteTarefa);
  yield takeLatest('UPDATE_TAREFA_REQUEST', updateTarefa);
  yield takeLatest('COMPLETE_TAREFA_REQUEST', completeTarefa);
}

export default tarefasSaga;
