import { Link } from 'react-router-dom';
import { Button } from 'antd';
import CustomHeader from '../componentes/Header';
import TarefasList from '../componentes/TarefasList';

const Main = () => {
  return (
    <div>
      <CustomHeader/>
      <div style={{ margin: '16px' }}>
        <Link to="/create">
          <Button type="primary">Criar Nova Tarefa</Button>
        </Link>
      </div>
      <TarefasList />
    </div>
  );
};

export default Main;
