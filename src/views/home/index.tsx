import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';

import Card from '@mui/material/Card';
import ProductStack from '../../components/productStack';
import CurrencyStack from '../../components/currencyButtonStack';
import DepositView from '../../components/deposit';
import { AccesptableCurrency } from '../../utils/common';

const Home: React.FunctionComponent = () => {

  

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#073642',
      
      }}
    >
      <Container style={{paddingTop:70}}  >
        <Grid container spacing={3} >
          <Grid item md={8} sm={12} >
            <Card
              sx={{
                minHeight: 200,
                width: '100%',
                backgroundColor: '#0f85a3',
                marginBottom: 10,
              }}
            >
              <ProductStack />
            </Card>
        
          </Grid>
          <Grid item md={4} sm={12}>
          <DepositView />
            <Card
            style={{padding:25}}
              sx={{ minHeight: 200, width: '100%', backgroundColor: '#0f85a3', marginBottom:40 }}
            >
              <CurrencyStack currencies={AccesptableCurrency}/>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Home;
