import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout';
import Home from './views/home';
import SignUp from './views/signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnauthorizePage from './views/unauthorised.page';
import Login from './views/login';
import ProtectedRoute from './components/protectedRout';


function Application() {
  return (
    <>
      <CssBaseline />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>} />

          {/* Private Route */}
          {/* <Route element={<RequireUser allowedRoles={['buyer', 'seller']} />}>
            <Route path="profile" element={<ProfilePage />} />
          </Route> */}
          {/* <Route element={<RequireUser allowedRoles={['seller']} />}>
            <Route path="product" element={<ProductPage />} />
          </Route> */}
          <Route path="*" element={<UnauthorizePage />} />
          <Route path="unauthorized" element={<UnauthorizePage />} />
          </Route>
        <Route
          path="register"
          element={ <SignUp />}
          // element={
          //   <ProtectedRoute>
          //     <SignUp />
          //   </ProtectedRoute>
          // }
        />
        <Route
          path="login"element={<Login />}
          // element={
          //   <ProtectedRoute>
          //     <Login />
          //   </ProtectedRoute>
          // }
        />
       
      </Routes>
    </>
  );
}

export default Application;
