const initialState = {
  tarefas: [],
  loading: false,
  error: null,
};

const tarefasReducer = (state = initialState, action) => {
  console.log('Action:', action);

  switch (action.type) {
    case 'FETCH_TAREFAS_REQUEST':
    case 'CREATE_TAREFA_REQUEST':
    case 'UPDATE_TAREFA_REQUEST':
    case 'DELETE_TAREFA_REQUEST':
    case 'COMPLETE_TAREFA_REQUEST':
      return handleRequest(state);

    case 'FETCH_TAREFAS_SUCCESS':
      return handleFetchTarefasSuccess(state, action.payload);

    case 'CREATE_TAREFA_SUCCESS':
    case 'UPDATE_TAREFA_SUCCESS':
    case 'DELETE_TAREFA_SUCCESS':
      return handleSuccess(state);

    case 'COMPLETE_TAREFA_SUCCESS':{
      const completedTarefaId = action.payload;
      console.log('Completed Tarefa ID:', completedTarefaId);
      return handleCompleteTarefaSuccess(state, completedTarefaId);
}
    case 'FETCH_TAREFAS_FAILURE':
    case 'CREATE_TAREFA_FAILURE':
    case 'UPDATE_TAREFA_FAILURE':
    case 'DELETE_TAREFA_FAILURE':
    case 'COMPLETE_TAREFA_FAILURE':
      return handleFailure(state, action.payload);

    default:
      return state;
  }
};

// Função para lidar com as requisições (loading true, error null)
const handleRequest = (state) => {
  console.log('Handling request...');
  return {
    ...state,
    loading: true,
    error: null,
  };
};

// Função para lidar com o sucesso (loading false)
const handleSuccess = (state) => {
  console.log('Handling success...');
  return {
    ...state,
    loading: false,
  };
};

// Função para lidar com o sucesso ao completar uma tarefa (loading false, atualiza o status da tarefa)
const handleCompleteTarefaSuccess = (state, completedTarefaId) => {
  console.log('Handling complete tarefa success. Completed Tarefa ID:', completedTarefaId);
  return {
    ...state,
    loading: false,
    tarefas: state.tarefas.map((tarefa) =>
      tarefa.id === completedTarefaId ? { ...tarefa, status: 'Finalizada' } : tarefa
    ),
  };
};

// Função para lidar com o sucesso ao buscar tarefas (loading false, atualiza a lista de tarefas)
const handleFetchTarefasSuccess = (state, tarefas) => {
  console.log('Handling fetch tarefas success. Tarefas:', tarefas);
  return {
    ...state,
    tarefas,
    loading: false,
  };
};

// Função para lidar com falhas (loading false, atualiza o erro)
const handleFailure = (state, error) => {
  console.log('Handling failure. Error:', error);
  return {
    ...state,
    loading: false,
    error,
  };
};

export default tarefasReducer;
