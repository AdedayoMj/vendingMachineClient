import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { IButton } from '../redux/api/types';
import { object, number, TypeOf } from 'zod';
import { useDepositUserAccountMutation, useGetChangeMutation } from '../redux/api/userApi';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { LoadingButton } from './button';


const CurrencyButton: React.FunctionComponent<IButton> = (props) => {
  const [depositUserAccount, { isLoading, isSuccess, error, isError }] =
    useDepositUserAccountMutation();
    const [getChange] = useGetChangeMutation();
  const { currency } = props;

  useEffect(() => {
    if (isSuccess) {
      getChange()
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
