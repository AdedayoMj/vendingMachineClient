
 import { LoadingButton as _LoadingButton } from '@mui/lab';
 import { styled } from '@mui/material/styles';

export const LoadingButton = styled(_LoadingButton)`
  padding: 0.4rem;
  background-color: #073642;
  color: white;
  font-weight: 500;
  height: 40px;
  &:hover {
    background-color: #05586e;
    transform: translateY(-2px);
  }
`;

export const LoadingButtonHeader = styled(_LoadingButton)`
padding: 0.4rem;
background-color: #073642;
color: #073642;
font-weight: 500;
&:hover {
  background-color: #05586e;
  transform: translateY(-2px);
  color: white
}
`;