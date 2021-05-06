import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Rating from '@material-ui/lab/Rating';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
// import CameraImg from '../assets/camera.png';
import CustomAppBar from '../components/CustomAppbar';
import { UserContext } from '../contexts/UserContext';
import { getCurrentUsersFiles } from '../hooks/generalHooks';
import CommentComp from '../components/CommentComp';

const useStyles = makeStyles({
  root: {
    margin: '8px 19px',
    '& .MuiBottomNavigationAction-root.MuiBottomNavigationAction-iconOnly ': {
      paddingTop: '6px',
      color: '#fff',
      borderBottom: '1px solid transparent',
    },
    '& .MuiBottomNavigationAction-root.Mui-selected': {
      color: '#fff',
    },
    '& .Mui-selected .MuiBottomNavigationAction-wrapper': {
      borderBottom: '3px solid #fff',
    },
    '& .MuiBottomNavigationAction-wrapper > .MuiSvgIcon-root': {
      width: '1.5em',
      height: '1.5em',
      color: '#fff',
    },
    '& .MuiBottomNavigationAction-wrapper > .MuiBottomNavigationAction-label': {
      color: '#fff',
    },
  },
  heading: {
    fontWeight: '700',
    fontSize: '20px',
    textAlign: 'center',
  },
  placeName: {
    fontSize: '14px',
    color: '#C5C5C5',
    textAlign: 'center',
  },
  image: {
    margin: '20px 0',
    textAlign: 'center',
    '& > img': {
      width: '315px',
      height: '200px',
      borderRadius: '8px',
    },
  },
  phone: {
    display: 'flex',
    alignItems: 'center',
    '& > .MuiSvgIcon-root': {
      fontSize: '30px',
      marginRight: '12px',
    },
  },
  listItemAvatar: {
    minWidth: '30px',
    '& > .MuiSvgIcon-root': {
      fontSize: '0.7rem',
    },
  },
  listItemText: {
    '& > .MuiTypography-body1': {
      fontSize: '13px',
    },
  },
});

export default function Profile() {
  const classes = useStyles();
  const [value, setValue] = React.useState('profile');
  const [user] = useContext(UserContext);
  const urlMedia = 'http://media-new.mw.metropolia.fi/wbma/uploads/';
  const file = getCurrentUsersFiles();
  let lastFile;
  if (file) {
    lastFile = file[file.length - 1];
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <div className={classes.image}>
        <img
          src={lastFile && urlMedia + lastFile.filename}
          alt={lastFile && lastFile.title}
        />
      </div>
      <Typography className={classes.heading} variant="h4" gutterBottom>
        {user && user.username}
        <br />
        {user && user.full_name}
      </Typography>
      <Typography
        className={classes.placeName}
        variant="subtitle2"
        gutterBottom
      >
        {user && user.email}
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Rating name="size-medium" defaultValue={2} precision={0.5} />
      </div>

      <div>
        <Typography
          variant="body"
          // className={classes.placeName}
          gutterBottom
          style={{ textAlign: 'center', fontSize: '18px', marginTop: '20px' }}
        >
          Shopping in some second hand stores is not for everyone: musty smell,
          sweat marks on some items and used bikinis require a certain amount of
          bravery. You hardly ever find what you are looking for, and then
          always in the wrong size. Don’t be put off by that and just go ahead.
          Most of the times the items will have been laundered.
        </Typography>
      </div>

      <div className={classes.phone} style={{ marginTop: '15px' }}>
        <PersonIcon />
        {' '}
        <Typography variant="body1">4 Guests</Typography>
      </div>
      <div className={classes.phone}>
        <PhoneIcon />
        {' '}
        <Typography variant="body1">Phone Number</Typography>
      </div>
      <div style={{ marginBottom: '100px' }}>
        <Typography variant="h4" style={{ marginTop: '25px' }}>
          About Me
        </Typography>

        <div style={{ marginBottom: '70px' }}>
          <List>
            <ListItem>
              <ListItemAvatar className={classes.listItemAvatar}>
                <FiberManualRecordIcon />
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                secondary={null}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar className={classes.listItemAvatar}>
                <FiberManualRecordIcon />
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                secondary={null}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar className={classes.listItemAvatar}>
                <FiberManualRecordIcon />
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                secondary={null}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar className={classes.listItemAvatar}>
                <FiberManualRecordIcon />
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                secondary={null}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar className={classes.listItemAvatar}>
                <FiberManualRecordIcon />
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                secondary={null}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar className={classes.listItemAvatar}>
                <FiberManualRecordIcon />
              </ListItemAvatar>
              <ListItemText
                className={classes.listItemText}
                primary="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                secondary={null}
              />
            </ListItem>
          </List>
        </div>
        <CommentComp comment={{ username: 'Asady', comment: 'Nice Image' }} />
        <CommentComp comment={{ username: 'Aley', comment: 'Amazing Image' }} />
        <CommentComp
          comment={{ username: 'Zeny', comment: 'Cool! 100% Recommended' }}
        />
        <CommentComp comment={{ username: 'Tony', comment: 'Awesome Store' }} />
      </div>
      <CustomAppBar value={value} handleChange={handleChange} />
    </div>
  );
}
