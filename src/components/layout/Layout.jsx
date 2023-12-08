import { Outlet } from 'react-router-dom';
import Nav from '../nav/Nav';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SideBarRight';

function Layout() {
  return (
    <div className='antialiased bg-black flex flex-col'>
      <div className='h-auto'>
        <Nav />
      </div>
      <div className='flex  items-center'>
        <SidebarLeft text={'Hi'} />
        <main className='h-auto w-full p-2 '>
          <Outlet />
        </main>
        <SidebarRight />
      </div>
    </div>
  );
}

export default Layout;
