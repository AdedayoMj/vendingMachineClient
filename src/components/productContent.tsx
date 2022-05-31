import Grid from '@mui/material/Grid';
import { CardHeader, Card, CardActions, CardMedia } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { IProduct } from '../redux/api/types';
import { styled } from '@mui/material/styles';

import { LoadingButton as _LoadingButton } from '@mui/lab';
import { useState } from 'react';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  background-color: #ff8f00;
  color: #2363eb;
  font-weight: 500;
  height: 40px;
  &:hover {
    background-color: #ffa940;
    transform: translateY(-2px);
  }
`;

const ProductContent: React.FunctionComponent<IProduct> = (props) => {
  const [loading, setLoading] = useState(false);
  const { productName, amountAvailable, cost, productImage, sellerId } = props;
  return (
    <Grid item sm={4} xs={6}>
      <Card style={{ width: '100%', minHeight: 150 }}>
        <CardHeader
          style={{
            backgroundColor: '#cccccc',
            color: '#073642',
            textAlign: 'center',
            height: 60,
          }}
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6, textAlign: 'center' }}
              />
            ) : (
              productName
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              `￠ ${cost}`
            )
          }
        />
        {loading ? (
          <Skeleton
            sx={{ height: 70 }}
            animation="wave"
            variant="rectangular"
          />
        ) : (
          <CardMedia
            component="img"
            height="70"
            image="/static/images/cards/paella.jpg"
            alt={productName}
          />
        )}

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
            <LoadingButton sx={{ p: 0 }} onClick={() => console.log('buy')}>
              Buy
            </LoadingButton>
          )}
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductContent;
