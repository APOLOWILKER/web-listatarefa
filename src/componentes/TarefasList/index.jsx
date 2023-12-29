import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTarefasRequest, completeTarefaRequest, deleteTarefaRequest } from '../../redux/actions/tarefasActions';
import { Table, Button, Space, Popconfirm, message, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, PictureOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './TarefaForm.css';

const TarefasList = () => {
  const dispatch = useDispatch();
  const tarefas = useSelector((state) => state.tarefas);

  useEffect(() => {
    dispatch(fetchTarefasRequest());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTarefaRequest(id));
    message.success('Tarefa excluída com sucesso!');
  };

  const handleComplete = async (id, status) => {
    if (status === 'Pendente') {
      try {
        const tarefaCompleta = tarefas.find(tarefa => tarefa.id === id);
        dispatch(completeTarefaRequest(tarefaCompleta));
        message.success('Tarefa concluída com sucesso!');
      } catch (error) {
        console.error('Erro ao completar tarefa:', error);
        message.error('Erro ao completar tarefa. Tente novamente mais tarde.');
      }
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
          {record.imageUrl ? (
            <img src={`data:image/jpeg;base64,${record.imageUrl}`} alt={`Imagem ${record.id}`} style={{ width: '50px' }} />
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
      render: (status) => (
        <Tag color={status === 'Finalizada' ? 'green' : 'red'} style={{ fontWeight: 'bold' }}>
          {status}
        </Tag>
      ),
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
