import Grid from '@mui/material/Grid';
import ProductContent from './productContent';
import {IProductIndex} from '../redux/api/types'


const ProductStack: React.FunctionComponent<IProductIndex> = (props) => {
  const {product} = props
 
  return (
    <Grid container spacing={3} style={{padding:25}}>
      {product.map((product, index) => (
        <ProductContent
          key={index}
          _id= {product._id}
          productName={product.productImage}
          amountAvailable={product.amountAvailable}
          cost={product.cost}
          productImage={product.productImage}
          sellerId={product.sellerId}
        />
      ))}
    </Grid>
  );
};

export default ProductStack;
