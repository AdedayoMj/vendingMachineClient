import {
  FormHelperText,
  Typography,
  FormControl,
  InputProps,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type IFormInputProps = {
  name: string;
  label: string;
  defaultValue?: string;
} & InputProps;

const FormSelect: FC<IFormInputProps> = ({ name, label, defaultValue, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue ? defaultValue : ''}
      rules={{required:true}}
      render={({ field }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{ color: '#073642', mb: 1, fontWeight: 500 }}
          >
            {label}
          </Typography>
          <RadioGroup
            aria-label={label}
            {...field}
            name={name}
          >
            <FormControlLabel
              value="seller"
              control={<Radio />}
              label="Seller"
            />
            <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
          </RadioGroup>          
          <FormHelperText id={name} error={!!errors[name]}>
            {errors[name] ? errors[name].message : ''}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormSelect;
