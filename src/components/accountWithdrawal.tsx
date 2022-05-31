import { Box, CircularProgress, Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import CurrencyButton from './currencyButton';
import {IButtonIndex} from '../redux/api/types'
import Card from '@mui/material/Card';



const AccountWithdrawal: React.FunctionComponent<IButtonIndex> = (props) => {
  const {currencies} = props
 
  return (
    <Card style={{width:'100%', minHeight: 100}}>
    <Grid container spacing={2} justifyContent='left' alignItems='left' style={{padding:20}}>
      {currencies.map((currency, index) => (
        <CurrencyButton
          key={index}
          currency={currency}
        />
      ))}
   
    </Grid>
    </Card>
  );
};

export default AccountWithdrawal;