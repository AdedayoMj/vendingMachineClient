import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { IButton } from '../redux/api/types';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { object, number, TypeOf } from 'zod';
import { useDepositUserAccountMutation } from '../redux/api/userApi';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

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

const CurrencyButton: React.FunctionComponent<IButton> = (props) => {
  const [depositUserAccount, { isLoading, isSuccess, error, isError }] =
    useDepositUserAccountMutation();

  const { currency } = props;

  useEffect(() => {
    if (isSuccess) {
      toast.success('Coin added to account');
    }

    if (isError) {
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

  const handeleSubmit = () => {
    
    depositUserAccount({
      deposit: currency,
    });
  };
  return (
    <Grid item sm={4} xs={3}>
      <LoadingButton sx={{ p: 0 }} onClick={handeleSubmit}>
       {`${currency} ￠`}
      </LoadingButton>
    </Grid>
  );
};

export default CurrencyButton;
