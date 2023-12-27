// redux/actions/tarefasActions.js
export const fetchTarefasRequest = () => ({ type: 'FETCH_TAREFAS_REQUEST' });
export const fetchTarefasSuccess = tarefas => ({ type: 'FETCH_TAREFAS_SUCCESS', payload: tarefas });
export const fetchTarefasFailure = error => ({ type: 'FETCH_TAREFAS_FAILURE', payload: error });

export const createTarefaRequest = dados => ({ type: 'CREATE_TAREFA_REQUEST', payload: dados });
export const createTarefaSuccess = () => ({ type: 'CREATE_TAREFA_SUCCESS' });
export const createTarefaFailure = error => ({ type: 'CREATE_TAREFA_FAILURE', payload: error });

export const updateTarefaRequest = dados => ({ type: 'UPDATE_TAREFA_REQUEST', payload: dados });
export const updateTarefaSuccess = () => ({ type: 'UPDATE_TAREFA_SUCCESS' });
export const updateTarefaFailure = error => ({ type: 'UPDATE_TAREFA_FAILURE', payload: error });

export const deleteTarefaRequest = id => ({ type: 'DELETE_TAREFA_REQUEST', payload: id });
export const deleteTarefaSuccess = id => ({ type: 'DELETE_TAREFA_SUCCESS', payload: id });
export const deleteTarefaFailure = error => ({ type: 'DELETE_TAREFA_FAILURE', payload: error });

export const completeTarefaRequest = id => ({ type: 'COMPLETE_TAREFA_REQUEST', payload: id });
export const completeTarefaSuccess = id => ({ type: 'COMPLETE_TAREFA_SUCCESS', payload: id });
export const completeTarefaFailure = error => ({ type: 'COMPLETE_TAREFA_FAILURE', payload: error });
