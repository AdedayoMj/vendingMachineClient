import {
  Typography,
  CircularProgress,
  Container,
  CardHeader,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '../redux/store';
import { useCookies } from 'react-cookie';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import {
  useResetAccountMutation,
  useGetUserMutation,
} from '../redux/api/userApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  background-color: #ff8f00;
  color: #2363eb;
  font-weight: 500;
  height: 40px;
  &:hover {
    background-color: #ffa940;
    transform: translateY(-2px);
  }
`;

const DepositView: React.FunctionComponent = () => {
  const [cookies] = useCookies(['logged_in']);
  const logged_in = cookies.logged_in;

  let userData = useAppSelector((state: any) => state.userState);
  // console.log(userData);
  const [getUser, {}] = useGetUserMutation();

  let balance = parseFloat(userData.user.deposit).toFixed(2);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged_in]);

  const [resetAccount, { isLoading, isError, error, isSuccess }] =
    useResetAccountMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Account balance withdrawn');
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

  
  const handleReset = () => {
    if (userData.user.deposit > 0) {
      resetAccount({
        deposit: 0,
      });
    } else {
      toast.warn('Insuficient funds!');
    }
  };
  return (
    <Card style={{ width: '100%', height: 170 }}>
      <CardHeader
        style={{
          backgroundColor: '#ff8f00',
          color: '#073642',
          textAlign: 'center',
        }}
        title="Deposit Balance"
      />
      <CardContent>
        <Typography
          sx={{
            alignContent: 'center',
            textAlign: 'center',
            fontSize: { sx: '1.2rem', md: '2rem' },
            height: 20,
            fontWeight: 600,
          }}
        >
          {logged_in && balance}
        </Typography>
      </CardContent>
      <CardActions>
        {logged_in && (
          <LoadingButton
            style={{
              marginLeft: 'auto',
              marginRight: 20,
            }}
            sx={{ p: 0 }}
            onClick={handleReset}
          >
            collect
          </LoadingButton>
        )}
      </CardActions>
    </Card>
  );
};

export default DepositView;
