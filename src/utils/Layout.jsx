import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

const Layout = () => {
  return (
    <div className='h-screen flex flex-col'>
      <Nav className='h-20' />
      <div className='flex-grow'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
