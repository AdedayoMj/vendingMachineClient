import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { IModal } from './formModal';
import { Typography } from '@mui/material';
import { useDeleteProductMutation } from '../redux/api/productApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteModal: React.FunctionComponent<IModal> = (props) => {
  const { open, handleClose, handleOpen, productName, productId } = props;
  const [deleteProduct, { isLoading, isError, error, isSuccess }] =
    useDeleteProductMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Product removed from vending machine! ');
      handleClose();
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

  const handleDelete = () => {
    if (productId) {
      deleteProduct({ id: productId });
    }
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Do you want to remove this prodoct?'}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            
          </DialogContentText> */}

          <Typography
            sx={{
              backgroundColor: '#cccccc',
              color: '#073642',
              textAlign: 'center',
              fontSize: 20,
              textTransform: 'capitalize',
            }}
          >
            {productName}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: 'yellow' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={{ color: 'red' }} onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
