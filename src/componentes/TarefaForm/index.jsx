import { useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createTarefaRequest, updateTarefaRequest } from '../../redux/actions/tarefasActions';
import { useNavigate, useParams } from 'react-router-dom';
import CustomHeader from '../Header';

const { Option } = Select;

const TarefaForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const tarefas = useSelector((state) => state.tarefas);
  const tarefaEdit = tarefas.find((tarefa) => tarefa.id === id) || {};
  console.log('tarefaEdit', tarefaEdit);

  useEffect(() => {
    if (id) {
      console.log('Buscar detalhes da tarefa com ID:', updateTarefaRequest(id));
      dispatch(updateTarefaRequest(id));
    }
  }, [id, dispatch]);

  const onFinish = (values) => {
    try {
      if (id) {
        console.log('Editar tarefa com ID:', id);
        dispatch(updateTarefaRequest({ ...values, id }));
      } else {
        dispatch(createTarefaRequest({ ...values, status: 'pendente' }));
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
        <Form form={form} onFinish={onFinish} layout="vertical" style={{minWidth: 600}}>
          <Form.Item
            style={{fontWeight: 'bold'}}
            label="Descrição da Tarefa"
            name="description"
            rules={[{ required: true, message: 'Informe a descrição da tarefa' }]}
            initialValue={id ? tarefaEdit.description : ''}
          >
            <Input />
          </Form.Item>
          <Form.Item style={{fontWeight: 'bold'}} label="Status" name="status" initialValue="pendente">
            <Select>
              <Option value="pendente">Pendente</Option>
              <Option value="finalizada">Finalizada</Option>
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
