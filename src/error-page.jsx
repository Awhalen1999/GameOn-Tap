import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id='error-page'
      className='min-h-screen flex items-center justify-center bg-base-300'
    >
      <div className='text-center'>
        <h1 className='text-4xl font-bold text-warning'>Oops!</h1>
        <p className='mt-4 text-xl text-accent'>
          Sorry, an unexpected error has occurred.
        </p>
        <p className='mt-2 text-accent'>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
