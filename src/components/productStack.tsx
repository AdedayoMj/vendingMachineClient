import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ProductContent from './productContent';
import { useGetProductsMutation } from '../redux/api/productApi';
import { Typography } from '@mui/material';
import { useAppSelector } from '../redux/store';

const ProductStack: React.FunctionComponent = (props) => {
  const [loading, setLoading ]= useState(true)
  const [get,{ data, isLoading, isError, isSuccess }] = useGetProductsMutation();



  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [isLoading, Error, isSuccess])

  let productData = useAppSelector((state: any) => state.productState);

  

  return (
    <Grid container spacing={3} style={{ padding: 25 }}>
      {isError && (
        <Typography style={{ fontSize: 20, margin: 'auto', marginTop: 20 }}>
          Vending machine products loading...
        </Typography>
      )}
      {productData.products? (
        productData.products?.map((product, index) => {
          return (
            <ProductContent key={index} product={product} loading={loading} />
          );
        })
      ) : (
        <Typography style={{ fontSize: 20, margin: 'auto', marginTop: 30, color:'white' }}>
         No products available
        </Typography>
      )}
    </Grid>
  );
};

export default ProductStack;
