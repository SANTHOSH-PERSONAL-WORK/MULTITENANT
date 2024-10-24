import useTenantLogin from '../../customHooks/useTenantLogin';
import 'react-toastify/dist/ReactToastify.css';

// Handle user login
const TenantLogin = () => {
  const {domain, setDomain, password, setPassword, handleSubmit} = useTenantLogin ();

  return (
    <div className='flex justify-center items-center min-h-screen  bg-[#FFE4C4]'>
      <form className='flex justify-around bg-white shadow-lg rounded-lg  p-8 min-h-[300px] flex-col w-1/3' 
        onSubmit={handleSubmit}>
        <h1 className='text-center text-2xl  font-bold '>Login</h1>
        <input className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black'
          type='text'
          required
          placeholder='Domain'
          value={domain}
          onChange={(e) => setDomain (e.target.value)}>
        </input>
        <input className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black'
          type='password'
          required
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword (e.target.value)}>
        </input>
        <button className='w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition duration-200' type='submit'>
          Login
        </button>
        <div className='flex justify-center'>
          <span className='text-center'>
            Need an account ?
          </span>
          <a href='/tenant/register' className='text-blue-500 hover:underline'>&nbsp;Sign Up</a>
        </div>
      </form>
    </div>
  );
};

export default TenantLogin;