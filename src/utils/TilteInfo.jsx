function Info() {
  return (
    <svg
      className='w-4 h-4 ml-2 mt-1 '
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      fill='gray'
      viewBox='0 0 25 25'
    >
      <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
    </svg>
  );
}

function TilteInfo({ className, title }) {
  return (
    <div
      className={
        'flex items-center justify-start font-roboto font-semibold text-gray-300 text-lg ' +
        className
      }
    >
      {title}
      <Info />
    </div>
  );
}

export default TilteInfo;
