
import { Typography, CircularProgress, Container, CardHeader, Card } from '@mui/material';
import { styled } from '@mui/material/styles';

import { LoadingButton as _LoadingButton } from '@mui/lab'
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



const DepositView:React.FunctionComponent = () => {
 
  return (

        <Card style={{width:'100%', height: 150}}>
          <CardHeader style={{backgroundColor:'#ff8f00', color:'#073642', textAlign: 'center', }} title= 'Account Deposit'/>
          <LoadingButton     style={{
              marginTop:20,
            display: 'flex',
            flexDirection: 'column',
            marginLeft: "auto" , marginRight:20
           
          }} sx={{ p: 0 }} onClick={() => console.log('currency')}>
        collect
      </LoadingButton>
        </Card>
        

  );
};

export default DepositView;