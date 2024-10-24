import useTenantRegister from '../../customHooks/useTenantRegister';
import 'react-toastify/dist/ReactToastify.css';

// Handle user register
const TenantRegister = () => {
  const {
    name,
    domain,
    password,
    setName,
    setDomain,
    setPassword,
    handleSubmit
  } = useTenantRegister ();

  return (
    <div className='flex justify-center items-center min-h-screen  bg-[#FFE4C4]'>
      <form className='flex justify-around bg-white shadow-lg rounded-lg  p-8 min-h-[400px] flex-col w-1/2' 
        onSubmit={handleSubmit}>
        <h1 className='text-center text-2xl  font-bold '>Create store</h1>
        <input
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black'
          type='text'
          required
          placeholder='Name'
          value={name}
          onChange={(e) => setName (e.target.value)}>
        </input>
        <input
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black'
          type='text'
          required
          placeholder='Domain'
          value={domain}
          onChange={(e) => setDomain (e.target.value)}>
        </input>
        <input
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-black'
          type='password'
          required
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword (e.target.value)}>
        </input>
        <button
          className='w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition duration-200'
          type='submit'>
          Register
        </button>
        <div className='flex justify-center'>
          <span
            className='text-center'
          >
            Already have account ?
          </span>
          <a href='/' className='text-blue-500 hover:underline'>&nbsp;Login</a>
        </div>
      </form>
    </div>
  );
};

export default TenantRegister;