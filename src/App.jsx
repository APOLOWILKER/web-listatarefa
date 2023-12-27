import {
  BrowserRouter, Routes,
  Route
} from "react-router-dom";
import Main from './routes/Main';
import CreateTask from './routes/CreateTask';
import EditTask from './routes/EditTask';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<Main/>} />
        <Route path='/create'  element={<CreateTask/>}/>
        <Route path='/edit/:id'  element={<EditTask/>}/>
      </Routes>   
    </BrowserRouter>
  );
};

export default App;
