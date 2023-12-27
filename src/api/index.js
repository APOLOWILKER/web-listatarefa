import axios from 'axios';

const baseURL = 'http://localhost:8081/tarefas';

const fetchTarefas = () => axios.get(baseURL).then(response => response.data);

const fetchTarefaById = id => axios.get(`${baseURL}/${id}`).then(response => response.data);

const createTarefa = dados => axios.post(baseURL, dados).then(response => response.data);

const updateTarefa = (id, dados) => axios.put(`${baseURL}/${id}`, dados).then(response => response.data);

console.log(updateTarefa(156));

const deleteTarefa = id => axios.delete(`${baseURL}/${id}`);

export { fetchTarefas, fetchTarefaById, createTarefa, updateTarefa, deleteTarefa };
