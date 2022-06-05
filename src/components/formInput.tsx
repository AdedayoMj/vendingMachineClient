import {
  FormHelperText,
  Typography,
  FormControl,
  Input as _Input,
  InputProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;

type IFormInputProps = {
  name: string;
  label: string;
  defaultValue?: any;
} & InputProps;

const FormInput: FC<IFormInputProps> = ({
  name,
  label,
  defaultValue,
  ...otherProps
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
console.log(defaultValue);

  return (
    <Controller
      control={control}
      defaultValue={defaultValue ? defaultValue : ''}
      name={name}
      render={({ field }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: '#073642', mb: 1, fontWeight: 500 }}
          >
            {label}
          </Typography>
          <Input
            {...field}
            
            fullWidth
            disableUnderline
            sx={{ borderRadius: '1rem' }}
            error={!!errors[name]}
            {...otherProps}
          />
          <FormHelperText error={!!errors[name]}>
            {errors[name] ? errors[name].message : ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormInput;
