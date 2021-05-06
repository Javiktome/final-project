/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from 'react-router-dom';
import { AccountBox, Publish } from '@material-ui/icons';
import { UserContext } from '../contexts/UserContext';
import { getCurrentUsersFiles } from '../hooks/generalHooks';

const useStyles = makeStyles(() => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  bottomNavigation: {
    width: '100%',
    background: 'transparent',
  },
}));

function CustomAppBar({ value, handleChange }) {
  const classes = useStyles();
  const router = useHistory();
  const [user, setUser] = useContext(UserContext);
  const urlMedia = 'http://media-new.mw.metropolia.fi/wbma/uploads/';
  const file = getCurrentUsersFiles();
  let lastFile;
  if (file) {
    lastFile = file[file.length - 1];
  }
  console.log('---user----state----', user, file);
  return (
    <AppBar position="fixed" color="primary" className={classes.appBar}>
      <Toolbar>
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className={classes.bottomNavigation}
        >
          <BottomNavigationAction
            onClick={() => router.push('/home')}
            value="home"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction value="favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction
            value="comment"
            onClick={() => router.push('/category/recommended')}
            icon={<QuestionAnswerIcon />}
          />
          {user && user.email && (user.user_id || user.id) ? (
            <div>
              <BottomNavigationAction
                value="uploadMedia"
                onClick={() => router.push('/upload-media')}
                icon={<Publish />}
              />
              <BottomNavigationAction
                value="profile"
                onClick={() => router.push('/profile')}
                icon={(
                  <Avatar
                    alt={user.username || user?.name?.firstName}
                    src={lastFile && urlMedia + lastFile.filename}
                  />
                )}
              />
              <BottomNavigationAction
                value="logout"
                onClick={() => {
                  localStorage.removeItem('userInfo');
                  localStorage.removeItem('token');
                  setUser(null);
                  router.push('/');
                }}
                icon={<ExitToAppIcon />}
              />
            </div>
          ) : (
            <BottomNavigationAction
              value="login"
              onClick={() => router.push('/login')}
              icon={<AccountBox />}
              // label="Login"
              // showLabel
            />
          )}
        </BottomNavigation>
      </Toolbar>
    </AppBar>
  );
}

export default CustomAppBar;
