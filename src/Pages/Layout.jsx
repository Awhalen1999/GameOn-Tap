import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Layout = () => {
  const location = useLocation();

  return (
    <div className='h-screen'>
      <Nav location={location} />
      <Outlet />
    </div>
  );
};

export default Layout;
