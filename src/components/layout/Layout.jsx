import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../nav/Nav';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SideBarRight';

import VerticalHeighlights from '../profile/VerticalHighlights';
import { authContext } from '../../store/Auth';

function Layout() {
  return (
    <div className='antialiased bg-black flex flex-col'>
      <div className='h-20'>
        <Nav />
      </div>
      <div className='flex'>
        <SidebarLeft />
        <main className='h-auto w-full p-2 '>
          <Outlet />
        </main>
        <SidebarRight />
      </div>
      <div className='border-t mb-10 border-gray-800'></div>
      <div className='flex items-center justify-center w-full mb-10'>
        <div className='w-2/3'>
          <div className='flex justify-between text-white text-2xl font-bold mb-6 font-lato'>
            <div>Explore Profiles</div>
            <div className='text-innovest text-lg cursor-pointer'>See all</div>
          </div>
          <VerticalHeighlights />
        </div>
      </div>
    </div>
  );
}

export default Layout;
