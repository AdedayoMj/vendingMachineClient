import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useLogoutUserMutation } from '../redux/api/authApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import FormModal from './formModal';
import { LoadingButtonHeader } from './button';
import { useAppSelector } from '../redux/store';

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { role, username } = useAppSelector(
    (state: any) => state.userState.user
  );
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseInfo = () => {
    setAnchorEl(null);
  };

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
            {logged_in && (
              <div>
                <IconButton
               
               style={{height:40, width:40, marginLeft:10}}
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle style={{height:40, width:40}} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseInfo}
                >
                  <MenuItem onClick={handleCloseInfo}>{`UserName: ${username}`}</MenuItem>
                  <MenuItem onClick={handleCloseInfo}>{`Role: ${role}`}</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
