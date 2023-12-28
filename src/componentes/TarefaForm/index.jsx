import { useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createTarefaRequest, updateTarefaRequest, fetchTarefasRequest } from '../../redux/actions/tarefasActions';
import { useNavigate, useParams } from 'react-router-dom';
import CustomHeader from '../Header';

const { Option } = Select;

const TarefaForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const tarefas = useSelector((state) => state.tarefas);

  useEffect(() => {
    if (id) {
      dispatch(fetchTarefasRequest(id));
    }
  }, [id, dispatch]);

  const onFinish = (values) => {
    try {
      if (id) {
        dispatch(updateTarefaRequest({ ...values, id }));
      } else {
        dispatch(createTarefaRequest({ ...values, status: 'Pendente' }));
      }

      message.success('Tarefa salva com sucesso!');
      form.resetFields();
      navigate('/');
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
      message.error('Erro ao salvar a tarefa. Tente novamente mais tarde.');
    }
  };

  return (
    <>
      <CustomHeader pageTitle={id ? 'Editar Tarefa' : 'Nova Tarefa'} />

      <div style={{ display: 'flex', width: 'auto', justifyContent: 'center' }}>
        <Form form={form} onFinish={onFinish} layout="vertical" style={{ minWidth: 600 }}>
          <Form.Item
            style={{ fontWeight: 'bold' }}
            label="Descrição da Tarefa"
            name="description"
            rules={[{ required: true, message: 'Informe a descrição da tarefa' }]}
            initialValue={id ? tarefas[0]?.description : ''}
          >
            <Input />
          </Form.Item>
          {id && tarefas[0]?.imagem && (
            <img src={tarefas[0].imagem} alt={`Imagem da Tarefa`} style={{ width: '50px' }} />
          )}
          <Form.Item style={{ fontWeight: 'bold' }} label="Status" name="status" initialValue="Pendente">
            <Select>
              <Option value="Pendente">Pendente</Option>
              <Option value="Finalizada">Finalizada</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar Tarefa
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default TarefaForm;
