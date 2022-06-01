import Grid from '@mui/material/Grid';
import ProductContent from './productContent';
import { useGetProductsQuery } from '../redux/api/productApi';


const ProductStack: React.FunctionComponent = (props) => {
  const { data, isLoading, isSuccess, error, isError } = useGetProductsQuery();
 
  return (
    <Grid container spacing={3} style={{padding:25}}  >
      {isError && ('No Product in the vending machine')}
      {isSuccess && data &&
      data.map((product, index) => {
        return <ProductContent
          key={index}
          product={product}
          loading={isLoading}
        />})}
    </Grid>
  );
};

export default ProductStack;
