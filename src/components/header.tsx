import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useLogoutUserMutation } from '../redux/api/authApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import FormModal from './formModal';
import { LoadingButtonHeader } from './button';

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cookies] = useCookies(['logged_in']);
  const logged_in = cookies.logged_in;

  const navigate = useNavigate();

  const [logoutUser, { isLoading, isSuccess, error, isError }] =
    useLogoutUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }

    if (isError) {
      console.log(error);
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data, {
          position: 'top-right',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const onLogoutHandler = async () => {
    logoutUser();
  };

  return (
    <AppBar
      position="static"
      style={{ background: '#073642', boxShadow: 'none' }}
    >
      <FormModal open={open} handleClose={handleClose} />
      <Container maxWidth="lg">
        <Toolbar>
          <img style={{ height: 70, width: 70 }} alt="logo" src="/itest.png" />
          <Typography
            variant="h5"
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer' }}
          >
            iMak
          </Typography>
          <Box display="flex" sx={{ ml: 'auto' }}>
            {!logged_in && (
              <>
                <LoadingButtonHeader
                  sx={{ mr: 2, backgroundColor: '#eee' }}
                  onClick={() => navigate('/register')}
                >
                  SignUp
                </LoadingButtonHeader>
                <LoadingButtonHeader
                  sx={{ backgroundColor: '#eee' }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </LoadingButtonHeader>
              </>
            )}
            {logged_in && (
              <LoadingButtonHeader
                sx={{ backgroundColor: '#eee' }}
                onClick={onLogoutHandler}
                loading={isLoading}
              >
                Logout
              </LoadingButtonHeader>
            )}
            {logged_in && (
              <LoadingButtonHeader
                sx={{ backgroundColor: '#eee', ml: 2 }}
                onClick={handleOpen}
              >
                Add Product
              </LoadingButtonHeader>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
