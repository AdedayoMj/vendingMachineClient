import { useCookies } from 'react-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { userApi } from '../redux/api/userApi';


const ProtectedRoute = ({ redirectPath = '/', children }) => {
  const [cookies] = useCookies(['logged_in']);
  const logged_in = cookies.logged_in;

  const location = useLocation();

  const { data: user } = userApi.endpoints.getMe.useQuery(null, {
    skip: !logged_in,
  });
  if (logged_in && user) {
   return  <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
