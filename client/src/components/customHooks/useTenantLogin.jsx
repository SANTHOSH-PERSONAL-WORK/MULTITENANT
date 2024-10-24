import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

// Custom Hook for user login
const useTenantLogin = () => {
  const [domain, setDomain] = useState ('');
  const [password, setPassword] = useState ('');

  const navigate = useNavigate ();

  // Handle login function
  const handleSubmit = async (e) => {
    e.preventDefault ();
    try {
      const response = await fetch (`${import.meta.env.VITE_API_URL}/api/tenant/login`, {
        'method':'POST',
        'headers':{'Content-Type':'application/json'},
        'body':JSON.stringify ({domain, password}),
        'credentials':'include'
      });

      if (response.status === 200) {
        navigate (`/tenant/${domain}/user`);
      } else {
        toast.error (response.statusText);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log (error);
      alert ('Invalid credentials');
    }
  };

  return {
    domain,
    setDomain,
    password,
    setPassword,
    handleSubmit
  };
};

export default useTenantLogin;
