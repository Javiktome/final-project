import React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Logo from '../assets/logo2.jpg';

const useStyles = makeStyles(() => ({
  containerBlue: {
    background: '#7479FA',
    flex: 1,
    padding: '40px 0',
  },
  logoPosition: {
    textAlign: 'center',
  },
  logoImage: {
    width: '170px',
    borderRadius: '50%',
    margin: '20px auto',
  },
  headingPosition: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '32px',
    lineHeight: '38px',
    maxWidth: '405px',
    color: '#fff',
    margin: '0 auto',
  },
  article: {
    textAlign: 'center',
    fontSize: '17px',
    lineHeight: '23px',
    maxWidth: '80%',
    color: '#fff',
    margin: '30px auto',
  },
  buttonsPosition: {
    margin: '135px auto',
    textAlign: 'center',
  },
  buttons: {
    display: 'block',
    margin: '14px auto',
    width: '136px',
  },
  signInBtnColor: {
    color: '#4E55F2',
    background: '#fff',
  },
  signUpBtnColor: {
    color: '#fff',
  },
}));

function LandingPage() {
  const classes = useStyles();
  const router = useHistory();
  return (
    <div className={classes.containerBlue}>
      <div className={classes.logoPosition}>
        <img className={classes.logoImage} src={Logo} alt="Logo" />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Typography
          className={classes.headingPosition}
          variant="h3"
          gutterBottom
        >
          Welcome to the Second Hand Forum
        </Typography>
        <Typography
          className={classes.article}
          variant="h6"
          gutterBottom
        >
          Shopping in some second hand stores is not for everyone: musty smell,
          sweat marks on some items and used bikinis require a certain amount of
          bravery
        </Typography>
      </div>
      <div style={{ margin: '20px auto', textAlign: 'center' }}>
        <iframe
          style={{ margin: '30px auto' }}
          width="60%"
          height="350"
          src="https://www.youtube.com/embed/dqyalFb0PRA"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className={classes.buttonsPosition}>
        <Button
          onClick={() => router.push('/login')}
          className={[classes.buttons, classes.signInBtnColor]}
          variant="contained"
        >
          SIGN IN
        </Button>
        <Button
          onClick={() => router.push('/signup')}
          className={[classes.buttons, classes.signUpBtnColor]}
        >
          SIGN UP
        </Button>
        <Button
          onClick={() => router.push('/home')}
          className={[classes.buttons, classes.signInBtnColor]}
          variant="contained"
        >
          GO TO HOME
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
