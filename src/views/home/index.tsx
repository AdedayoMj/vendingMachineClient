import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useEffect } from 'react';

import Card from '@mui/material/Card';
import ProductStack from '../../components/productStack';
import CurrencyStack from '../../components/currencyButtonStack';
import DepositView from '../../components/deposit';
import { AccesptableCurrency } from '../../utils/common';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Home: React.FunctionComponent = () => {
  const [cookies] = useCookies(['logged_in']);
  const logged_in = cookies.logged_in;
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged_in) return navigate('/login');
  }, [logged_in]);

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
      <Container style={{ paddingTop: 70 }}>
        <Grid container spacing={3}>
          <Grid item md={8} sm={12}>
            <Card
              sx={{
                minHeight: 200,
                width: '100%',
                backgroundColor: '#05586e',
                marginBottom: 10,
              }}
            >
              <ProductStack />
            </Card>
          </Grid>
          <Grid item md={4} sm={12}>
            <DepositView />
            <Card
              style={{ padding: 25 }}
              sx={{
                minHeight: 200,
                width: '100%',
                backgroundColor: '#05586e',
                marginBottom: 40,
              }}
            >
              <CurrencyStack currencies={AccesptableCurrency} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

export default Home;
