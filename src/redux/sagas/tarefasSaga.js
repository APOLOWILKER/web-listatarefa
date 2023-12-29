// redux/sagas/tarefasSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../../api';
import * as actions from '../actions/tarefasActions';
import * as types from '../types';

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
    const { image, ...tarefaData } = action.payload;

    if (image) {
      yield call(api.updateTarefaImage, tarefaData.id, image);
      delete tarefaData.image;
    }

    yield call(api.createTarefa, tarefaData);

    yield put(actions.createTarefaSuccess());
    yield put(actions.fetchTarefasRequest()); // Atualiza a lista após criar uma tarefa
  } catch (error) {
    yield put(actions.createTarefaFailure(error.message));
  }
}

function* deleteTarefa(action) {
  try {
    yield call(api.deleteTarefa, action.payload);
    yield put(actions.deleteTarefaSuccess(action.payload));
    yield put(actions.fetchTarefasRequest()); // Atualiza a lista após deletar uma tarefa
  } catch (error) {
    yield put(actions.deleteTarefaFailure(error.message));
  }
}

function* updateTarefa(action) {
  try {
    const { id, ...tarefaData } = action.payload;

    console.log('Atualizando tarefa. ID:', id, 'Dados:', tarefaData);

    if (tarefaData.image) {
      console.log('Atualizando imagem para tarefa. ID:', id, 'Imagem:', tarefaData.image);
      yield call(api.updateTarefaImage, id, tarefaData.image);
      delete tarefaData.image;
    }

    console.log('Fazendo solicitação PUT para atualizar tarefa. ID:', id, 'Dados:', tarefaData);
    yield call(api.updateTarefa, id, tarefaData);

    console.log('Solicitação PUT concluída com sucesso.');

    console.log('Buscando tarefa atualizada por ID:', id);
    const updatedTarefa = yield call(api.fetchTarefaById, id);

    console.log('Tarefa atualizada com sucesso. Tarefa:', updatedTarefa);

    yield put(actions.updateTarefaSuccess(updatedTarefa));
    console.log('Solicitando uma atualização da lista de tarefas.');
    yield put(actions.fetchTarefasRequest()); // Atualiza a lista após atualizar uma tarefa
  } catch (error) {
    console.error('Erro ao atualizar a tarefa:', error);
    yield put(actions.updateTarefaFailure(error.message));
  }
}


function* completeTarefa(action) {
  try {
    const tarefa = action.payload;
    
    if (tarefa.id !== undefined) {
      const updatedTarefa = { ...tarefa, status: 'Finalizada' };

      yield call(api.updateTarefa, tarefa.id, updatedTarefa);
      yield call(api.updateTarefa, tarefa.id, updatedTarefa);

      yield put(actions.completeTarefaSuccess(updatedTarefa));
      yield put(actions.fetchTarefasRequest());
    } else {
      console.error('ID da tarefa não definido');
    }
  } catch (error) {
    if (error.response) {
      console.error('Detalhes da resposta:', error.response.data);
      console.error('Status HTTP:', error.response.status);
    }
    yield put(actions.completeTarefaFailure(error.message));
  }
}

function* tarefasSaga() {
  yield takeLatest(types.FETCH_TAREFAS_REQUEST, fetchTarefas);
  yield takeLatest(types.CREATE_TAREFA_REQUEST, createTarefa);
  yield takeLatest(types.DELETE_TAREFA_REQUEST, deleteTarefa);
  yield takeLatest(types.UPDATE_TAREFA_REQUEST, updateTarefa);
  yield takeLatest(types.COMPLETE_TAREFA_REQUEST, completeTarefa);
}

export default tarefasSaga;
