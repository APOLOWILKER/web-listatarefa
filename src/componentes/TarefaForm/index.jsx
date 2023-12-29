import { useEffect, useState, useMemo } from 'react';
import { Form, Input, Select, Button, message, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { createTarefaRequest, updateTarefaRequest, fetchTarefasRequest } from '../../redux/actions/tarefasActions';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import CustomHeader from '../Header';

const { Option } = Select;

const TarefaForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const tarefas = useSelector((state) => state.tarefas);
  const tarefa = useMemo(() => {
    if (Array.isArray(tarefas)) {
      return tarefas.find((t) => t.id == id);
    }
    return null;
  }, [id, tarefas]);

  const [initialStatus] = useState('Pendente');
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (id && Array.isArray(tarefas)) {
      dispatch(fetchTarefasRequest(id));
    }
  }, [id, dispatch, tarefas]);

  useEffect(() => {
    form.setFieldsValue({
      description: tarefa?.description || '',
      status: tarefa?.status || initialStatus,
    });

    if (tarefa?.imageUrl) {
      setFileList([{ uid: '-1', name: 'Imagem', status: 'done', url: tarefa.imageUrl }]);
    } else {
      setFileList([]);
    }
  }, [tarefa, form, initialStatus]);

  const handleChange = (info) => {
    if (info.file.status === 'done' || info.file.status === 'error') {
      // Se necessário, você pode adicionar lógica aqui
    }
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const isValidImage = file.type.startsWith('image/');
      if (!isValidImage) {
        message.error('Por favor, selecione apenas arquivos de imagem!');
        onError();
        return;
      }

      // Simulando um atraso de upload
      setTimeout(async () => {
        // Substitua esta função pela lógica real de upload para o backend
        const imageUrl = 'URL_DA_IMAGEM_NO_BACKEND';
        setFileList([{ uid: file.uid, name: file.name, status: 'done', url: imageUrl }]);
        onSuccess();
      }, 1000);
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      onError();
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async (values) => {
    try {
      if (fileList.length > 0) {
        const imageUrl = fileList[0].url;
        const statusToSet = id ? tarefa?.status : values.status;
        if (id) {
          await dispatch(updateTarefaRequest({ ...values, id, imageUrl }));
        } else {
          await dispatch(createTarefaRequest({ ...values, status: statusToSet, imageUrl }));
        }
      } else {
        const statusToSet = id ? tarefa?.status : values.status; 
        if (id) {
          await dispatch(updateTarefaRequest({ ...values, id }));
        } else {
          await dispatch(createTarefaRequest({ ...values, status: statusToSet }));
        }
      }
  
      form.resetFields();
      navigate('/');
      message.success('Tarefa salva com sucesso!');
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
            label="Descrição da Tarefa"
            name="description"
            rules={[{ required: true, message: 'Informe a descrição da tarefa' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Select>
              <Option value="Pendente">Pendente</Option>
              <Option value="Finalizada">Finalizada</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Imagem" extra="Escolha uma imagem para a tarefa">
            <Upload
              name="file"
              listType="picture-card"
              fileList={fileList}
              customRequest={customRequest}
              showUploadList={{ showDownloadIcon: false }}
              beforeUpload={() => false}
              onChange={handleChange}
            >
              {fileList.length >= 1 ? (
                <img src={fileList[0].url} alt="Imagem da Tarefa" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar Tarefa
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={() => navigate('/')}>
              Voltar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default TarefaForm;
