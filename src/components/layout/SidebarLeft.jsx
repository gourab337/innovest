function SidebarLeft() {
  return (
    <aside className=' z-40 w-full h-screen  bg-black border-r border-gray-800 '>
      <div className='px-4 py-5 flex flex-col mt-4 gap-2'>
        <img
          className='inline-block h-10 w-10 rounded-full ring-2 ring-white '
          src='https://profile.coinbase.com/images/default_avatars/Frame-12.svg'
          alt=''
        />
        <div>
          <h2 className='text-white font-bold'>GC Lowdi</h2>
        </div>
        <div></div>
      </div>
    </aside>
  );
}

export default SidebarLeft;
