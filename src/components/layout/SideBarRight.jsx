import {useContext} from 'react'
import HighlightProfile from '../profile/Highlight';
import TitleInfo from '../../utils/TilteInfo';
import { authContext } from '../../store/Auth';

function SidebarRight() {
  const { data } = useContext(authContext);
  const popularProfiles= data?.popularProfiles
  return (
    <aside className='z-40 min-h-screen  bg-black border-l border-gray-800 w-full '>
      <div className='pl-8 py-5 flex flex-col text-gray-300'>
        <TitleInfo title='Popular Profiles' />
        <span className='mb-4'></span>
        {popularProfiles?.map(profile => {
          return <HighlightProfile key={profile?.username} profile={profile} />;
        })}
        <div className='flex items-center justify-start text-blue-700 font-roboto font-semibold mt-4 cursor-pointer'>
          Explore more
        </div>
      </div>
    </aside>
  );
}

export default SidebarRight;
