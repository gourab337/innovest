import { useRef } from 'react';
import { IoCopyOutline } from 'react-icons/io5';

function SidebarLeft({ text }) {
  const buttonRef = useRef();

  const copyText = () => {
    const textToCopy = buttonRef.current.innerText;

    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);
  };

  return (
    <aside className=' z-40 w-full h-screen  bg-black border-r border-gray-800 flex justify-center'>
      <div className='px-4 py-5 flex flex-col mt-4 gap-2'>
        <img
          className='inline-block rounded-full h-16 w-16 ring-2 ring-white '
          src='https://profile.coinbase.com/images/default_avatars/Frame-12.svg'
          alt=''
        />
        <div>
          <h1 className='text-white font-bold '>GC Lowdi</h1>
        </div>
        <div>
          <button
            ref={buttonRef}
            type='button'
            className='flex items-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none rounded-full border hover:bg-gray-100 focus:z-10 focus:ring-4 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
            onClick={copyText}
          >
            <IoCopyOutline className='mr-1' />
            {text}
          </button>
        </div>
      </div>
    </aside>
  );
}

export default SidebarLeft;
