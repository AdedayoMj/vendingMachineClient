import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../../components/formInput';
import { useEffect } from 'react';
import { Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from '../../redux/api/authApi';
import { useCookies } from 'react-cookie';

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

const loginSchema = object({
  username: string().nonempty('Username address is required'),
  password: string()
    .nonempty('Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

const Login: React.FunctionComponent = () => {
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  //API Login Mutation
  const [loginUser, { isLoading, isError, error, isSuccess }] =
    useLoginUserMutation();

  const [cookies] = useCookies(['logged_in']);
  const logged_in = cookies.logged_in;
  const navigate = useNavigate();
  const location = useLocation();

  const from = ((location.state as any)?.from.pathname as string) || '/';

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {});

  useEffect(() => {
    if (isSuccess) {
      toast.success('You successfully logged in');
      navigate(from);
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

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    //  Executing the loginUser Mutation

    loginUser(values);
  };
  if (logged_in) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

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
        }}
      >
        <Typography
          textAlign="center"
          component="h1"
          sx={{
            color: 'white',
            fontWeight: 600,
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="body1"
          component="h2"
          sx={{ color: '#e5e7eb', mb: 2 }}
        >
          Login to have access!
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

            <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
              Need an account? <LinkItem to="/register">Sign Up Here</LinkItem>
            </Typography>

            <LoadingButton
              variant="contained"
              sx={{ mt: 1 }}
              fullWidth
              disableElevation
              type="submit"
              loading={isLoading}
            >
              Login
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default Login;
