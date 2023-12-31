import { useEffect, useState, useMemo } from 'react';
import { Form, Input, Select, Button, message, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { createTarefaRequest, updateTarefaRequest, fetchTarefasRequest } from '../../redux/actions/tarefasActions';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import CustomHeader from '../Header';

const { Option } = Select;

const TarefaForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const tarefas = useSelector((state) => state.tarefas);

  const isEditing = !!id; // Verifica se está editando uma tarefa existente

  const tarefa = useMemo(() => {
    if (Array.isArray(tarefas)) {
      return tarefas.find((t) => t.id == id);
    }
    return null;
  }, [id, tarefas]);

  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchTarefasRequest());
  }, [dispatch]);

  useEffect(() => {
    form.resetFields(); // Resetar os campos do formulário

    if (isEditing) {
      // Se estiver editando, preencher os campos com os dados da tarefa
      form.setFieldsValue({
        description: tarefa.description || '',
        status: tarefa.status || 'Pendente',
      });

      if (tarefa.image) {
        setFileList([{ uid: '-1', name: 'Imagem', status: 'done', url: tarefa.image }]);
      } else {
        setFileList([]);
      }
    }
  }, [id, isEditing, tarefa, form]);

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJpgOrPng) {
      message.error('Você só pode fazer upload de arquivos JPG/PNG!');
    }

    if (!isLt2M) {
      message.error('A imagem deve ter menos de 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }

    if (info.file.status === 'done' || info.file.status === 'error') {
      setLoading(false);

      if (info.file.status === 'done') {
        getBase64(info.file.originFileObj, (url) => {
          setFileList([{ uid: '-1', name: 'Imagem', status: 'done', url }]);
        });
      } else {
        console.error('Erro durante o upload:', info.file.error);
      }
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onFinish = async (values) => {
    try {
      const tarefaData = { ...values, id };

      if (isEditing) {
        if (fileList.length > 0) {
          const imageUrl = fileList[0].url;
          await dispatch(updateTarefaRequest({ ...tarefaData, image: imageUrl }));
        } else {
          await dispatch(updateTarefaRequest({ ...tarefaData, image: null }));
        }
      } else {
        if (fileList.length > 0) {
          const imageUrl = fileList[0].url;
          const createdTarefa = await dispatch(createTarefaRequest({ ...tarefaData, image: imageUrl }));
          await dispatch(updateTarefaRequest({ ...createdTarefa, image: imageUrl }));
        } else {
          const createdTarefa = await dispatch(createTarefaRequest(tarefaData));
          await dispatch(updateTarefaRequest({ ...createdTarefa, image: null }));
        }
      }

      form.resetFields();
      setFileList([]);
      navigate('/');
      message.success('Tarefa salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
      message.error('Erro ao salvar a tarefa. Tente novamente mais tarde.');
    }
  };

  return (
    <>
      <CustomHeader pageTitle={isEditing ? 'Editar Tarefa' : 'Nova Tarefa'} />

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
          <Form.Item
            label="Imagem"
            extra="Escolha uma imagem para a tarefa"
            name="file"
            valuePropName="file"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              name="file"
              listType="picture-card"
              showUploadList={{ showDownloadIcon: false }}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              <div>
                {fileList.length >= 1 ? (
                  <img src={fileList[0].url} alt="Imagem da Tarefa" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </div>
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

TarefaForm.propTypes = {
  fetchTarefas: PropTypes.func,
};

export default TarefaForm;
