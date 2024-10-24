import {useState} from 'react';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

// Custom Hook for  user register
const useTenantRegister = () => {
  const [name, setName] = useState ('');
  const [domain, setDomain] = useState ('');
  const [password, setPassword] = useState ('');

  const navigate = useNavigate ();

  // Handle register function
  const handleSubmit = async (e) => {
    e.preventDefault ();
    try {
      if(name, domain, password){
        const response = await fetch (`${import.meta.env.VITE_API_URL}/api/tenant/register`, {
          'method':'POST',
          'headers':{'Content-Type':'application/json'},
          'body':JSON.stringify ({name, domain, password})
        });
        
        // Clear the form fields
        setDomain ('');
        setName ('');
        setPassword ('');
        
        if(response.ok){
          toast.success ('Registered Successfully');
          navigate ('/');
        }else{
          toast.error ('Please check the fields');
        } 
        return response;
      }
     
    } catch (err) {
      toast.error ('Error Registering Tenant');
      throw err;
    }
  };

  return {
    name,
    domain,
    password,
    setName,
    setDomain,
    setPassword,
    handleSubmit
  };
};

export default useTenantRegister;
