function SidebarLeft() {
  return (
    <aside className=' z-40 w-full h-screen  bg-black border-r border-gray-800 flex justify-center'>
      <div className='px-4 py-5 flex flex-col mt-4 gap-2'>
        <img
          className='inline-block rounded-full h-16 w-16 ring-2 ring-white '
          src='https://profile.coinbase.com/images/default_avatars/Frame-12.svg'
          alt=''
          // style={{height:'64px',width:'64px'}}
        />
        <div>
          <h1 className='text-white font-bold '>GC Lowdi</h1>
        </div>
        <div></div>
      </div>
    </aside>
  );
}

export default SidebarLeft;
