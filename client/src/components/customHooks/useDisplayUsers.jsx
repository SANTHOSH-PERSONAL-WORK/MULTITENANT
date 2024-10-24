/* eslint-disable no-console */
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';

// Custom Hook for display user infomation
const useDisplayUsers = (tenantDomain) => {
  const [users, setUsers] = useState ([]);
  const [editingUserId, setEditingUserId] = useState (null);
  const [showAddUserForm, setShowAddUserForm] = useState (false);
  const [showEditUserForm, setShowEditUserForm] = useState (false);
  const [name, setName] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
 
  useEffect (() => {

    // Fetch user information
    fetch (`${import.meta.env.VITE_API_URL}/api/tenant/${tenantDomain}/getUser`, {
      'method':'GET',
      'credentials':'include'
    }).then (res => res.json ()).then ((data) => {
      if (data) {
        setUsers (data?.users);
      } else {
        throw new Error ('Error');
      }
    });
  }, [tenantDomain]);
  

  // Add new user information to the domain
  const addUser = async (name, email, password) => {
    try {
      const response = await fetch (`${import.meta.env.VITE_API_URL}/api/tenant/${tenantDomain}/addUser`, {
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        'body':JSON.stringify ({name, email, password}),
        'credentials':'include'
      });

      if (response.ok) {
        const data = await response.json ();
        setUsers ((prevUsers) => [...prevUsers, data.newUser]);
      } else {
        throw new Error (response.statusText);
      }
    } catch (error) {
      console.log (error);
      toast.error ('Please check the fields');
    }
  };

  // Delete the user information from domain
  const deleteUser = async (id) => {
    try {
      const response = await fetch (`${import.meta.env.VITE_API_URL}/api/tenant/${tenantDomain}/deleteUser`, {
        'method':'DELETE',
        'headers':{'Content-Type':'application/json'},
        'body':JSON.stringify ({id}),
        'credentials':'include'
      });

      if (response.ok) {
        setUsers ((prevUsers) => prevUsers.filter ((user) => user._id !== id));
      } else {
        throw new Error ('Error while deleting user');
      }
    } catch (error) {
      console.log (error);
    }
  };

  // Update the user information in the domain
  const updateUser = async (id, name, email) => {
    try {
      const response = await fetch (`${import.meta.env.VITE_API_URL}/api/tenant/${tenantDomain}/updateUser`, {
        'method':'PUT',
        'headers':{'Content-Type':'application/json'},
        'body':JSON.stringify ({id, 'newData':{name, email}}),
        'credentials':'include'
      });

      if (response.ok) {
        setUsers ((prevUsers) => prevUsers.map ((user) => (user._id === id ? {...user, name, email} : user))
        );
        setEditingUserId (null);
      } else {
        throw new Error (response.statusText);
      }
    } catch (error) {
      console.log (error);
    }
  };

   
  // Handle add user
  const handleAddUser = (e) => {
    e.preventDefault ();
    addUser (name, email, password);
    setName ('');
    setEmail ('');
    setPassword ('');
    setShowAddUserForm (false);
  };
  
  // Handle edit user
  const handleEditUser = (e) => {
    e.preventDefault ();
    updateUser (editingUserId, name, email);
    setName ('');
    setEmail ('');
    setShowEditUserForm (false);
  };
  
  // Handle edit user pop-up
  const initiateEditUser = (user) => {
    setEditingUserId (user._id);
    setName (user.name);
    setEmail (user.email);
    setShowEditUserForm (true);
  };
  
  // Handle cancel button
  const handleCancel = () => {
    setName ('');
    setEmail ('');
    setPassword ('');
    setShowAddUserForm (false);
    setShowEditUserForm (false);
  };


  return {
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
  };
};

export default useDisplayUsers;
