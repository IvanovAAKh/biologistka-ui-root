import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from 'components/Typography';

const getClasses = makeStyles(theme => ({
  adornmentEnd: {
    padding: '0px 0px 8px 8px',
  },
  adornmentStart: {
    padding: '0px 8px 8px 0px',
  },
}));

const TextField = ({
  AdornmentStart = null,
  AdornmentEnd = null,
  autoFocus = false,
  helperText = '',
  inputType = 'text',
  isError = false,
  label,
  onChange,
  value,
}) => {
  const classes = getClasses();

  return (
    <FormControl
      fullWidth
    >
      <InputLabel>
        <Typography color="secondary">
          {label}
        </Typography>
      </InputLabel>
      <Input
        autoFocus={autoFocus}
        classes={{
          root: classes.input,
        }}
        endAdornment={AdornmentEnd && (
          <InputAdornment
            classes={{
              root: classes.adornmentEnd,
            }}
          >
            {AdornmentEnd}
          </InputAdornment>
        )}
        error={isError}
        fullWidth
        onChange={onChange}
        startAdornment={AdornmentStart && (
          <InputAdornment
            classes={{
              root: classes.adornmentStart,
            }}
          >
            {AdornmentEnd}
          </InputAdornment>
        )}
        type={inputType}
        value={value}
      />
      {helperText && (
        <FormHelperText>
          <Typography
            color={isError ? 'error' : 'primary'}
            variant="caption"
          >
            {helperText}
          </Typography>
        </FormHelperText>
      )}
    </FormControl>
  );
};


TextField.propTypes = {
  AdornmentEnd: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.object,
  ]),
  AdornmentStart: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.object,
  ]),
  autoFocus: PropTypes.bool,
  helperText: PropTypes.string,
  inputType: PropTypes.oneOf([
    'password',
    'phone',
    'text',
  ]),
  isError: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default TextField;