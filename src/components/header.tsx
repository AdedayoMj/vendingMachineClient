import {
    AppBar,
    Box,
    Container,
    Toolbar,
    Typography,
  } from '@mui/material';
  import { styled } from '@mui/material/styles';
  import { useNavigate } from 'react-router-dom';
  import { useCookies } from 'react-cookie';
  import { useAppSelector } from '../redux/store';
  import { useLogoutUserMutation } from '../redux/api/authApi';
  import { useEffect,useState } from 'react';
  import { toast } from 'react-toastify';
  import { LoadingButton as _LoadingButton } from '@mui/lab';
  import FormModal from './formModal'
  
  const LoadingButton = styled(_LoadingButton)`
    padding: 0.4rem;
    background-color: #ff8f00;
    color: #2363eb;
    font-weight: 500;
    &:hover {
      background-color: #ffa940;
      transform: translateY(-2px);
    }
  `;

  
  const Header = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [cookies] = useCookies(['logged_in']);
    const logged_in = cookies.logged_in;
  
  
    const navigate = useNavigate();
  
    const [logoutUser, { isLoading, isSuccess, error, isError }] =
      useLogoutUserMutation();
    const userData = useAppSelector((state:any) => state.userState);    
    const prodata = useAppSelector((state:any) => state.productState);
   
      
    
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
      <AppBar position='static' style={{ background: '#073642', boxShadow: 'none'}}>
        <FormModal open={open} handleClose={handleClose}/>
        <Container maxWidth='lg'>
          <Toolbar>
          <img style={{ height: 70, width: 70 }} alt="logo" src="/itest.png" />
            <Typography
              variant='h5'
              onClick={() => navigate('/')}
              sx={{ cursor: 'pointer' }}
            >
              iMak 
            </Typography>
            <Box display='flex' sx={{ ml: 'auto' }}>
              {!logged_in && (
                <>
                  <LoadingButton
                    sx={{ mr: 2 }}
                    onClick={() => navigate('/register')}
                  >
                    SignUp
                  </LoadingButton>
                  <LoadingButton onClick={() => navigate('/login')}>
                    Login
                  </LoadingButton>
                </>
              )}
              {logged_in && (
                <LoadingButton
                  sx={{ backgroundColor: '#eee' }}
                  onClick={onLogoutHandler}
                  loading={isLoading}
                >
                  Logout
                </LoadingButton>
              )}
              {logged_in && (
                <LoadingButton
                  sx={{ backgroundColor: '#eee', ml: 2 }}
                  onClick={handleOpen}
                >
                  Add Product
                </LoadingButton>
              )}
            
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  };
  
  export default Header;