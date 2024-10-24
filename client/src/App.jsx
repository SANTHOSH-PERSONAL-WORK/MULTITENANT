import {BrowserRouter, Routes, Route} from 'react-router-dom';
import TenantLogin from './components/tenant/login/tenantLogin';
import TenantRegister from './components/tenant/register/tenantRegister';
import {DisplayUser} from './components/tenant/displayUser/displayUser';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TenantLogin />} />
          <Route path='/tenant/register' element={<TenantRegister />} />
          <Route path='/tenant/:tenantDomain/user' element={<DisplayUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;