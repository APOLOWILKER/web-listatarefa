import { useEffect, useState, useMemo } from 'react';
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
  const tarefa = useMemo(() => tarefas.find((t) => t.id == id), [id, tarefas]);

  const [initialStatus] = useState('Pendente');
  
  useEffect(() => {
    if (id) {
      dispatch(fetchTarefasRequest(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    // Atualiza o formulário com os valores da tarefa quando ela é carregada
    form.setFieldsValue({
      description: tarefa?.description || '',
      status: tarefa?.status || initialStatus,
    });
  }, [tarefa, form, initialStatus]);

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

  const handleBack = () => {
    navigate('/');
  };
  {console.log(tarefa?.description)}
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
            value={tarefa?.description}
          >
            <Input />
          </Form.Item>
          <Form.Item style={{ fontWeight: 'bold' }} label="Status" name="status" initialValue={initialStatus}>
            <Select>
              <Option value="Pendente">Pendente</Option>
              <Option value="Finalizada">Finalizada</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar Tarefa
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleBack}>
              Voltar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default TarefaForm;
