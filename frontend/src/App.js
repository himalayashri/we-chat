import './App.css';
// import { Button } from '@chakra-ui/react';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';

function App() {
  return (
    <div className='app'>
      <Route path="/" exact component={Home} />
      <Route path="/chats" component={Chat} />

    </div>
  );
}

export default App;
