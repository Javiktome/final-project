import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useLoginHook } from '../hooks/useLoginHook';
import { login } from '../hooks/generalHooks';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: '0 3px',
    background: '#fff',
    paddingBottom: '20px',
    borderBottomLeftRadius: '12px',
    borderBottomRightRadius: '12px',
  },
  tabs: {
    marginTop: '40px',
    minHeight: '0',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'space-between',
    },
    '& .MuiButtonBase-root': {
      padding: 0,
      textTransform: 'none',
    },
  },
  root2: {
    margin: '0 12px',
    '& h4': {
      fontWeight: '500',
      fontSize: '25px',
      lineHeight: '33px',
    },
  },
  form: {
    margin: '0 15px',
    marginTop: '21px',
    '& .MuiFormControl-root': {
      width: '100%',
      margin: '12px 0',
      '& > .MuiInputBase-root': {
        fontSize: '17px',
        lineHeight: '26px',
      },
    },
  },
  btnSubmit: {
    width: '100%',
    textAlign: 'right',
    margin: '20px 0',
    '& button': {
      width: '104px',
    },
  },
  fullScreen: {
    background: '#7479FA',
    height: '100vh',
  },
});

function Signin() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const router = useHistory();
  const {
    inputs, handleInputChange, handleSubmit, errors,
  } = useLoginHook(login);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.fullScreen}>
      <div className={classes.root}>
        <Tabs
          className={classes.tabs}
          value={value}
          onChange={handleChange}
          indicatorColor="white"
          textColor="primary"
        >
          <Tab label="Sign in" />
          <Tab label="Sign up" onClick={() => router.push('/signup')} />
        </Tabs>

        <div className={classes.root2}>
          <Typography variant="h4">
            Welcome to
            <br />
            {' '}
            MEDIA sharing app
          </Typography>
          <Typography color="primary" variant="body2" gutterBottom>
            Let&lsquo;s get started
          </Typography>
        </div>

        <ValidatorForm
          className={classes.form}
          onSubmit={handleSubmit}
          onError={(err) => console.log('error', errors, err)}
        >
          <TextValidator
            onChange={handleInputChange}
            placeholder="Username"
            name="username"
            value={inputs.username}
            validators={['required']}
            errorMessages={['Username is required']}
          />

          <TextValidator
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            value={inputs.password}
            type="password"
            validators={['required', 'matchRegexp:^[a-zA-Z0-9 ]{6,}$']}
            errorMessages={[
              'Password is required',
              'Password must be greater than 5 characters.',
            ]}
          />

          <div className={classes.btnSubmit}>
            <Button variant="contained" color="primary" type="submit">
              SIGN IN
            </Button>
          </div>
          {errors && errors.message ? (
            <p style={{ color: 'red' }}>{errors.message}</p>
          ) : null}
        </ValidatorForm>
      </div>
    </div>
  );
}

export default Signin;
