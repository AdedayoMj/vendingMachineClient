import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './views/home';
import NotFound from './views/not-found';
import SignUp from './views/signup';
import RequireUser from './components/requireUser';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnauthorizePage from './views/unauthorised.page';
import ProductPage from './views/product';
import Login from './views/login';

function Application() {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* Private Route */}
          <Route element={<RequireUser allowedRoles={['buyer', 'seller']} />}>
            {/* <Route path="profile" element={<ProfilePage />} /> */}
          </Route>
          <Route element={<RequireUser allowedRoles={['seller']} />}>
            <Route path="product" element={<ProductPage />} />
          </Route>
          <Route path="unauthorized" element={<UnauthorizePage />} />
        </Route>
        <Route path="register" element={<SignUp />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default Application;
