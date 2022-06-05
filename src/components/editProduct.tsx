import * as React from 'react';

import Modal from '@mui/material/Modal';

import { Box, Typography } from '@mui/material';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './formInput';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useUpdateProductMutation } from '../redux/api/productApi';
import { useAppSelector } from '../redux/store';

import { LoadingButton } from './button';
import { IProduct } from '../redux/api/types';

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
  productName?: string;
  productId?: string;
  product: IProduct;
}

const addProductSchema = object({
  productName: string({ required_error: 'Product Name is required' }).min(
    6,
    'Name must be more than 6 characters'
  ),
  amountAvailable: string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number, received a string',
  }),
  cost: string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: 'Expected number, received a string',
  }),
  sellerId: string().optional(),
});

export type ProductInput = TypeOf<typeof addProductSchema>;

const EditProduct: React.FunctionComponent<IModal> = (props) => {
  const { open, handleClose, product } = props;

  const methods = useForm<ProductInput>({
    resolver: zodResolver(addProductSchema),
  });
  const closeModal = () => {
    handleClose();
    reset();
  };
  //API Login Mutation
  const [updateProduct, { isLoading, isError, error, isSuccess }] =
    useUpdateProductMutation();

  const userData = useAppSelector((state: any) => state.userState);

  // const dispatch = useDispatch()
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSuccess) {
      toast.success('Product added to vending machine ');
      closeModal();
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

  const onSubmitHandler: SubmitHandler<ProductInput> = (values) => {
    const sellerID =
      product.productName === userData.user._id
        ? product.sellerId
        : userData.user._id.toString();
    const dataSet = {
      sellerId: sellerID,
      product: values,
      productId: product._id,
    };
    updateProduct(dataSet);
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
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
            Edit Product
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
              <FormInput
                name="productName"
                label="Product Name"
                defaultValue={product.productName}
              />
              <FormInput
                name="amountAvailable"
                label="Quatity"
                type="number"
                defaultValue={product.amountAvailable}
              />
              <FormInput
                name="cost"
                label="Price"
                type="number"
                defaultValue={product.cost}
              />

              <LoadingButton
                variant="contained"
                sx={{ mt: 1 }}
                fullWidth
                disableElevation
                type="submit"
                loading={isLoading}
              >
                Edit Product
              </LoadingButton>
            </Box>
          </FormProvider>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditProduct;
