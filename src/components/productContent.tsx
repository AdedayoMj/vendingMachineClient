import Grid from '@mui/material/Grid';
import {
  CardHeader,
  Card,
  CardActions,
  Modal,
  Box,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  CardContent,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { IProduct } from '../redux/api/types';
import { toast } from 'react-toastify';
import { useCookies } from 'react-cookie';
import {
  useBuyProductMutation,
  useGetProductsMutation,
} from '../redux/api/productApi';
import React, { useEffect, useState } from 'react';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './formInput';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useGetUserMutation, useGetChangeMutation } from '../redux/api/userApi';
import DeleteModal from './deleteModal';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { LoadingButton } from './button';
import { useAppSelector } from '../redux/store';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormModal from './formModal';
import EditProduct from './editProduct';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 100,
  bgcolor: 'background.paper',
  borderRadis: 10,
  boxShadow: 24,
  p: 4,
};

interface ProductContentI {
  product: IProduct;
  loading: boolean;
}

const buyProductSchema = object({
  quantity: string()
    .min(1, 'Quantity is required')
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: 'Expected number, received a string',
    }),
});

export type BuyProductInput = TypeOf<typeof buyProductSchema>;

const ProductContent: React.FunctionComponent<ProductContentI> = (props) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { role } = useAppSelector((state: any) => state.userState.user);
  const handleDialogOpen = () => {
    reset();
    handleCloseInfo();
    setOpenDeleteDialog(true);
  };
  const handleDialogClose = () => setOpenDeleteDialog(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const methods = useForm<BuyProductInput>({
    resolver: zodResolver(buyProductSchema),
  });

  const handleMenuMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseInfo = () => {
    setAnchorEl(null);
  };

  const handleOpenEdit = () => {
    reset();
    handleCloseInfo();
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const [cookies] = useCookies(['logged_in']);
  const logged_in = cookies.logged_in;

  const { product, loading } = props;

  const [buyProduct, { isLoading, isError, error, isSuccess }] =
    useBuyProductMutation();

  const [getUser] = useGetUserMutation();
  const [getChange] = useGetChangeMutation();
  const [getProducts] = useGetProductsMutation();

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const handleModelClose = () => {
    reset();
    handleClose();
  };

  useEffect(() => {
    if (isSuccess) {
      Promise.all([getProducts(), getUser(), getChange()]);

      toast.success('Thanks for your patronize');
      handleModelClose();
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
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);
  const onSubmitHandler: SubmitHandler<BuyProductInput> = (values) => {
    // const { quantity } = values;
    buyProduct({
      product: product,
      quantity: values,
    });
  };

  let price = parseFloat(String(product.cost)).toFixed(2);

  return (
    <Grid item md={4 } sm={4} xs={6}>
      <EditProduct open={openEdit} handleClose={handleCloseEdit} product={product} />
      {product.amountAvailable > 0 && (
        <Card style={{ width: '100%', minHeight: 150 }}>
          <CardHeader
            style={{
              backgroundColor: '#cccccc',
              color: '#073642',
              textAlign: 'center',
              fontSize: 20,
              textTransform: 'capitalize',
              minHeight: 40,
            }}
            action={
              <IconButton aria-label="settings" onClick={handleMenuMore}>
                <MoreVertIcon />
              </IconButton>
            }
            titleTypographyProps={{ variant: 'h6' }}
            title={
              loading ? (
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6, textAlign: 'center' }}
                />
              ) : (
                product.productName
              )
            }
            subheader={
              loading ? (
                <Skeleton animation="wave" height={10} width="40%" />
              ) : (
                `??? ${price}`
              )
            }
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseInfo}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleOpenEdit}>
              <IconButton aria-label="settings">
                <EditIcon style={{ color: '#073642' }} />
              </IconButton>{' '}
              Edit
            </MenuItem>
            <MenuItem onClick={handleDialogOpen}>
              <IconButton aria-label="settings">
                <DeleteOutlinedIcon style={{ color: 'red' }} />
              </IconButton>{' '}
              Delete
            </MenuItem>
          </Menu>
          <CardContent>
            {loading ? (
              <Skeleton
                sx={{ height: 70 }}
                animation="wave"
                variant="rectangular"
              />
            ) : (
              <Typography
                sx={{
                  fontWeight: 400,
                  alignContent: 'center',
                  textAlign: 'center',
                  fontSize: { xs: '1rem', md: '1.2rem' },
                  mb: 2,
                  letterSpacing: 1,
                }}
              >{`Qty: ${product.amountAvailable}`}</Typography>
            )}
          </CardContent>
          <CardActions
            style={{
              marginTop: 20,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#cccccc',
            }}
          >
            {loading ? (
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />
            ) : (
              logged_in && (
                <LoadingButton sx={{ p: 0 }} onClick={handleOpen}>
                  Buy
                </LoadingButton>
              )
            )}
          </CardActions>
        </Card>
      )}
      <DeleteModal
        open={openDeleteDialog}
        handleClose={handleDialogClose}
        handleOpen={handleDialogOpen}
        productName={product.productName}
        productId={product._id}
      />
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
                fontWeight: 400,
                fontSize: '1rem',
                mb: 2,
                letterSpacing: 1,
              }}
            >
              How many {`${product.productName}`} do you want to by?
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
                  p: { xs: '1rem', sm: '1rem' },
                  borderRadius: 2,
                }}
              >
                <FormInput name="quantity" label="Quantity" type="number" />
                <LoadingButton
                  variant="contained"
                  sx={{ mt: 1 }}
                  fullWidth
                  disableElevation
                  type="submit"
                  loading={isLoading}
                >
                  Buy Product
                </LoadingButton>
              </Box>
            </FormProvider>
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default ProductContent;
