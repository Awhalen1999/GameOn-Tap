import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

const Layout = () => {
  return (
    <div className='app-container'>
      <Nav className='navbar' />
      <div className='content-container'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
