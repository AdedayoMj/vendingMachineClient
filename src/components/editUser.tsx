import * as React from 'react';

import Modal from '@mui/material/Modal';

import { Box, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {  object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './formInput';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector } from '../redux/store';
import { LoadingButton } from './button';
import FormSelect from './formSlect';
import { useEditUserMutation } from '../redux/api/userApi';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
  minHeight: 600,
  bgcolor: 'background.paper',
  borderRadis: 10,
  boxShadow: 24,
  p: 4,
};

export interface IModal {
  open: boolean;
  handleClose: () => void;
  handleOpen?: () => void;
  productName?:string;
  productId?:string;
}

const editUserSchema = object({
    username: string().nonempty('Username is required').max(100),
    role: string().nonempty('Role is required'),
});

export type EditUserAccount= TypeOf<typeof editUserSchema>;

const EditUser: React.FunctionComponent<IModal> = (props) => {
  const { open, handleClose } = props;

  const methods = useForm<EditUserAccount>({
    resolver: zodResolver(editUserSchema),
  });

  //API Login Mutation
  const [editUser, { isLoading, isError, error, isSuccess }] =
  useEditUserMutation();

  const userData = useAppSelector((state:any) => state.userState);  

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      toast.success('Your account has been modified ');
      
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

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<EditUserAccount> = (values) => {
    editUser(values);
  };


  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            textAlign="center"
            component="h1"
            sx={{
              color: '#073642',
              fontWeight: 600,
              fontSize: { xs: '1rem', md: '2rem' },
              mb: 2,
              letterSpacing: 1,
            }}
          >
            Modify Account
          </Typography>

          <FormProvider {...methods}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              autoComplete="off"
              maxWidth="27rem"
              width="100%"
              sx={{
                backgroundColor: '#e5e7eb',
                p: { xs: '1rem', sm: '2rem' },
                borderRadius: 2,
              }}
            >
              <FormInput name="username"  label="Username" defaultValue={userData.user.username} />
              <FormSelect name="role" label="Role" defaultValue={userData.user.role} />

              <LoadingButton
                variant="contained"
                sx={{ mt: 1 }}
                fullWidth
                disableElevation
                type="submit"
                loading={isLoading}
              >
                Update Account
              </LoadingButton>
            </Box>
          </FormProvider>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditUser;
