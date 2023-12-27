import { Link } from 'react-router-dom';
import TarefaForm from '../componentes/TarefaForm';
import { Button } from 'antd';

const CreateTask = () => {
  return (
    <div>
      <TarefaForm />
      <div style={{ textAlign: 'right', margin: '16px' }}>
        <Button type="primary">
          <Link to="/">Voltar para Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default CreateTask;
