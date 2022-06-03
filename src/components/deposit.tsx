import {
  Typography,
  CardHeader,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useAppSelector } from '../redux/store';
import { useCookies } from 'react-cookie';
import {
  useResetAccountMutation,
  useGetUserMutation,
  useGetChangeMutation,
} from '../redux/api/userApi';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { LoadingButton } from './button';

const DepositView: React.FunctionComponent = () => {
  const [cookies] = useCookies(['logged_in']);
  const logged_in = cookies.logged_in;

  let userData = useAppSelector((state: any) => state.userState);

  const [getUser] = useGetUserMutation();
  const [getChange] = useGetChangeMutation();


  // let balance = userData.user
  //   ? parseFloat(userData.user.deposit).toFixed(2)
  //   : '';

  useEffect(() => {
     // eslint-disable-next-line react-hooks/exhaustive-deps
    Promise.all([getUser(), getChange()])
  }, [logged_in]);
  
  const [resetAccount, { isLoading, isError, error, isSuccess }] =
    useResetAccountMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Account balance withdrawn');
      getChange()
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
    <Card style={{ width: '100%', minHeight: 200 }}>
      <CardHeader
        style={{
          backgroundColor: '#cccccc',
          color: '#073642',
          textAlign: 'center',
        }}
        title="Account Balance"
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
          {logged_in && `￠ ${userData.user.deposit}`}
        </Typography>
        <Typography
          sx={{
            alignContent: 'center',
            textAlign: 'center',
            fontSize: { sx: '1.3rem', md: '1.3rem' },
            height: 20,
            fontWeight: 400,
            marginTop: 3,
          }}
        >
          {(logged_in && userData.coinChanges.length>0)? <Typography>{`Coins: ${userData.coinChanges}`}</Typography>:<Typography>{`Coins: 0`}</Typography> }
        </Typography>
        
      </CardContent>
      <CardActions>
        
        {logged_in && (
          // <Box>
            
    
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

