// redux/actions/tarefasActions.js
import * as types from '../types';

export const fetchTarefasRequest = () => ({ type: types.FETCH_TAREFAS_REQUEST });
export const fetchTarefasSuccess = tarefas => ({ type: types.FETCH_TAREFAS_SUCCESS, payload: tarefas });
export const fetchTarefasFailure = error => ({ type: types.FETCH_TAREFAS_FAILURE, payload: error });

export const createTarefaRequest = dados => ({ type: types.CREATE_TAREFA_REQUEST, payload: dados });
export const createTarefaSuccess = () => ({ type: types.CREATE_TAREFA_SUCCESS });
export const createTarefaFailure = error => ({ type: types.CREATE_TAREFA_FAILURE, payload: error });

export const updateTarefaRequest = dados => ({ type: types.UPDATE_TAREFA_REQUEST, payload: dados });
export const updateTarefaSuccess = () => ({ type: types.UPDATE_TAREFA_SUCCESS });
export const updateTarefaFailure = error => ({ type: types.UPDATE_TAREFA_FAILURE, payload: error });

export const deleteTarefaRequest = id => ({ type: types.DELETE_TAREFA_REQUEST, payload: id });
export const deleteTarefaSuccess = id => ({ type: types.DELETE_TAREFA_SUCCESS, payload: id });
export const deleteTarefaFailure = error => ({ type: types.DELETE_TAREFA_FAILURE, payload: error });

export const completeTarefaRequest = tarefa => ({ type: types.COMPLETE_TAREFA_REQUEST, payload: tarefa });
export const completeTarefaSuccess = tarefa => ({ type: types.COMPLETE_TAREFA_SUCCESS, payload: tarefa });
export const completeTarefaFailure = error => ({ type: types.COMPLETE_TAREFA_FAILURE, payload: error });

export const updateTarefaImageRequest = (id, image) => ({ type: types.UPDATE_TAREFA_IMAGE_REQUEST, payload: { id, image } });
export const updateTarefaImageSuccess = () => ({ type: types.UPDATE_TAREFA_IMAGE_SUCCESS });
export const updateTarefaImageFailure = error => ({ type: types.UPDATE_TAREFA_IMAGE_FAILURE, payload: error });
