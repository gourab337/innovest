import TitleInfo from '../utils/TitleInfo';

function Profile() {
  return (
    <div className='text-white mt-4'>
      <div>
        <TitleInfo title='Total balance on Ethereum' />
        <div className='text-2xl font-bold'>$69.72</div>
      </div>
    </div>
  );
}

export default Profile;
