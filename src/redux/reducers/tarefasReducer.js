const initialState = {
  tarefas: [],
  loading: false,
  error: null,
};

const tarefasReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TAREFAS_REQUEST':
    case 'CREATE_TAREFA_REQUEST':
    case 'UPDATE_TAREFA_REQUEST':
    case 'DELETE_TAREFA_REQUEST':
    case 'COMPLETE_TAREFA_REQUEST':
      return { ...state, loading: true, error: null };

    case 'FETCH_TAREFAS_SUCCESS':
      return { ...state, tarefas: action.payload, loading: false };

    case 'CREATE_TAREFA_SUCCESS':
    case 'UPDATE_TAREFA_SUCCESS':
    case 'DELETE_TAREFA_SUCCESS':
      return { ...state, loading: false };

      case 'COMPLETE_TAREFA_SUCCESS':
        return {
          ...state,
          loading: false,
          tarefas: state.tarefas.map(tarefa =>
            tarefa.id === action.payload ? { ...tarefa, status: 'Finalizada' } : tarefa
          ),
        };

    case 'FETCH_TAREFAS_FAILURE':
    case 'CREATE_TAREFA_FAILURE':
    case 'UPDATE_TAREFA_FAILURE':
    case 'DELETE_TAREFA_FAILURE':
    case 'COMPLETE_TAREFA_FAILURE':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default tarefasReducer;
