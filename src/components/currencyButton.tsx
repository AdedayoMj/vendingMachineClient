import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { IButton } from '../redux/api/types';
import { LoadingButton as _LoadingButton } from '@mui/lab';

const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  background-color: #ff8f00;
  color: #2363eb;
  font-weight: 500;
  height:40px;
  &:hover {
    background-color: #ffa940;
    transform: translateY(-2px);
  }
`;

const CurrencyButton: React.FunctionComponent<IButton> = (props) => {
  const { currency } = props;
  return (
    
    <Grid item sm={4} xs={6}>
      <LoadingButton sx={{ p: 0 }} onClick={() => console.log(currency)}>
        {currency}
      </LoadingButton>
    </Grid>
  );
};

export default CurrencyButton;
