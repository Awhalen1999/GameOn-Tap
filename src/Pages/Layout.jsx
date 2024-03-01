import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Layout = () => {
  return (
    <div className='h-screen'>
      <Nav />
      <Outlet />
    </div>
  );
};

export default Layout;
