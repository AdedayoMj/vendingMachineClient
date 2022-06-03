import { Box, Checkbox, Container, FormControlLabel, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../components/formInput';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../redux/api/authApi';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { Select } from '@material-ui/core';
import FormSelect from '../../components/formSlect';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #073642;
  color: white;
  font-weight: 500;
  &:hover {
    background-color: #05586e;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #073642;
  &:hover {
    text-decoration: underline;
  }
`;

const registerSchema = object({
  username: string().nonempty('Username is required').max(100),
  role: string().nonempty('Role is required'),
  password: string()
    .nonempty('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().nonempty('Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const SignUp: React.FunctionComponent = () => {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  // 👇 Calling the Register Mutation
  const [registerUser, { isLoading, isSuccess, error, isError }] =
    useRegisterUserMutation();

  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success('User registered successfully');
      navigate('/login');
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
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



  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    //  Executing the RegisterUser Mutation
    console.log(values);
    
    registerUser(values);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#073642',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop:-20
        }}
      >
        <Typography
          textAlign="center"
          component="h1"
          sx={{
            color: 'white',
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 600,
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Welcome!
        </Typography>
        <Typography component="h2" sx={{ color: '#e5e7eb', mb: 2 }}>
          Sign Up To Aceess the Vending Machine!
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
            <FormInput name="username" label="Username" />
            <FormInput name="password" label="Password" type="password" />
            <FormInput
              name="passwordConfirm"
              label="Confirm Password"
              type="password"
            />
            
            < FormSelect name="role" label="Role"/>
            <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
              Already have an account?{' '}
              <LinkItem to="/login">Login Here</LinkItem>
            </Typography>

            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type="submit"
              loading={isLoading}
            >
              Sign Up
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default SignUp;
