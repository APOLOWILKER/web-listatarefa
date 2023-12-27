import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTarefasRequest, completeTarefaRequest, deleteTarefaRequest } from '../../redux/actions/tarefasActions';
import { Table, Button, Space, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, PictureOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './TarefaForm.css'

const TarefasList = () => {
  const dispatch = useDispatch();
  const tarefas = useSelector((state) => state.tarefas);

  useEffect(() => {
    dispatch(fetchTarefasRequest());
  }, [dispatch]);

  const handleDelete = (id) => {
    
    dispatch(deleteTarefaRequest(id));
    message.success('Tarefa excluída com sucesso!');
    console.log(`Deletar tarefa com ID: ${id}`);
  };

  const handleComplete = (id, status) => {
    if (status === 'Pendente') {
      dispatch(completeTarefaRequest(id));
      message.success('Tarefa concluída com sucesso!');
      console.log(`Completar tarefa com ID: ${id}`);
    } else {
      message.warning('Apenas tarefas pendentes podem ser concluídas.');
    }
  };

  const columns = [
    {
      title: 'Tarefa',
      dataIndex: 'description',
      key: 'description',
      render: (text, record) => (
        <span>
          {text} <br />
          {record.imagem ? (
            <img src={record.imagem} alt={`Imagem ${record.id}`} style={{ width: '50px' }} />
          ) : (
            <PictureOutlined />
          )}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ações',
      key: 'acoes',
      render: (text, record) => (
        <Space>
          <Link to={`/edit/${record.id}`}>
            <Button icon={<EditOutlined />} type="primary">
              Editar
            </Button>
          </Link>
          <Popconfirm
            title="Tem certeza que deseja excluir esta tarefa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Cancelar"
          >
            <Button icon={<DeleteOutlined />} type="danger">
              Excluir
            </Button>
          </Popconfirm>
          <Button
            icon={<CheckOutlined />}
            type="default"
            disabled={record.status !== 'Pendente'}
            onClick={() => handleComplete(record.id, record.status)}
          >
            Concluir Tarefa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="tarefas-list-container">
      <Table dataSource={tarefas} columns={columns} rowKey="id" />
    </div>
  );
};

export default TarefasList;
