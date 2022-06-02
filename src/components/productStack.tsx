import Grid from '@mui/material/Grid';
import ProductContent from './productContent';
import { useGetProductsQuery } from '../redux/api/productApi';
import { Typography } from '@mui/material';

const ProductStack: React.FunctionComponent = (props) => {
  const { data, isLoading, isSuccess, isError } = useGetProductsQuery(null);
  const prodData = data?.filter((dat) => dat.amountAvailable > 0);

  return (
    <Grid container spacing={3} style={{ padding: 25 }}>
      {isError && (
        <Typography style={{ fontSize: 20, margin: 'auto', marginTop: 20 }}>
          Vending machine products loading...
        </Typography>
      )}
      {isSuccess &&
        data &&
        prodData.map((product, index) => {
          return (
            <ProductContent key={index} product={product} loading={isLoading} />
          );
        })}
    </Grid>
  );
};

export default ProductStack;
