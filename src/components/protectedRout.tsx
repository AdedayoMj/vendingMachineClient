import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';



const ProtectedRoute = ({ redirectPath = '/login', children }) => {
  const [cookies] = useCookies(['logged_in']);
  const logged_in = cookies.logged_in;

  const location = useLocation();


  if (!logged_in) {
   return  <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
