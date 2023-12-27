import { Layout } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import PropTypes from 'prop-types';

const { Header } = Layout;

const CustomHeader = () => {
  const location = useLocation();

  let pageTitle = 'Tarefas';

  if (location.pathname.includes('/edit') ) {
    pageTitle = 'Editar Tarefa';
  } else if (location.pathname === '/create') {
    pageTitle = 'Criar Tarefa';
  }

  return (
    <Header className="custom-header">
      <Link to="/" className="custom-link">
        {pageTitle}
      </Link>
    </Header>
  );
};

CustomHeader.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default CustomHeader;
