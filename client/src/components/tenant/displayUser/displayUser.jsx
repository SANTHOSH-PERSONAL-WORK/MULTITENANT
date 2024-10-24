import {useParams} from 'react-router-dom';
import useDisplayUsers from '../../customHooks/useDisplayUsers';

// Handle display user information
export const DisplayUser = () => {
  const {tenantDomain} = useParams ();
  const {
    users, 
    deleteUser,
    showAddUserForm,
    setShowAddUserForm,
    showEditUserForm,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleAddUser,
    handleEditUser,
    initiateEditUser,
    handleCancel
  } = useDisplayUsers (tenantDomain);
  
  return (
    <div className=' min-h-screen  bg-[#FFE4C4]' >
      <div className='flex justify-between p-8'>
        <h1 className='text-center text-2xl  font-bold '>{tenantDomain}&nbsp;:&nbsp;Users</h1>
        <button className='p-5 bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition duration-200' 
          onClick={() => setShowAddUserForm (true)}>Add User</button>
      </div>
      
      {showAddUserForm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='p-10 bg-white shadow-md rounded-lg'>
            <form onSubmit={handleAddUser}>
              <h3 className='text-xl font-bold mb-4'>Add New User</h3>
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName (e.target.value)}
                required
                className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail (e.target.value)}
                required
                className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword (e.target.value)}
                required
                className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <div className='flex justify-between'>
                <button  className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600' type='submit' >Save User</button>
                <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600' type='button' 
                  onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditUserForm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
          <div className='p-10 bg-white shadow-md rounded-lg'>
            <form onSubmit={handleEditUser}>
              <h3 className='text-xl font-bold mb-4'>Edit User</h3>
              <input
                type='text'
                placeholder='Name'
                value={name}
                onChange={(e) => setName (e.target.value)}
                required
                className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <input
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail (e.target.value)}
                required
                className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500'
              />
              <div className='flex justify-between'>
                <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600' type='submit'>Update User</button>
                <button  className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600' type='button'  
                  onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className='flex flex-wrap justify-center'>
        
        {users.length>0?users?.map (user => (
          <div  className=' flex  flex-col justify-between  bg-[#f1f1f1] shadow-lg m-3 p-5 rounded-lg w-full max-w-[300px] h-[200px]' key={user._id}>
            <div  className='flex justify-between items-center '>
              <button onClick={() => deleteUser (user._id)}>🗑️</button>
              <button onClick={() => initiateEditUser (user)}>✏️</button>
            </div>
            <div className='flex flex-col justify-between items-center '>
              <img className='max-w-[100px] max-h-[100px]' src='/images/displayUser/user.png'></img>
            </div>
            <div className='flex flex-col pb-10 justify-between items-center '>
              <h3 className='p-1'>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          
          </div>
        )):<div className='flex flex-col justify-center items-center'>
          <img className='max-w-[500px] max-h-[500px]' src='/images/displayUser/search.png'></img>
          <span className='text-center   font-bold '> NO USER FOUND</span> 
        </div>}
      </div>
      <div className='flex justify-end'>
        <a href='/' className='text-blue-500 hover:underline p-12 text-xl'>Back...</a>
      </div>
    </div>
  );
};
