/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Rating from '@material-ui/lab/Rating';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Snackbar from '@material-ui/core/Snackbar';
// import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ReplyIcon from '@material-ui/icons/Reply';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
// import GirlCamera from '../assets/cameragirl.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '1px',
    cursor: 'pointer',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 120,
    height: 86,
    margin: '11% 0',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  cardSubCard: {
    marginLeft: '15px',
    display: 'flex',
    alignItems: 'center',
    '& > .MuiGrid-container': {
      flexWrap: 'unset',
    },
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '7px',
    marginTop: '3px',
    '& > .MuiSvgIcon-root': {
      width: '17px',
      height: '17px',
      color: '#C5C5C5',
    },
    '& > .MuiTypography-caption': {
      fontSize: '12px',
      color: '#C5C5C5',
      marginLeft: '2px',
    },
  },
  placeName: {
    fontSize: '11px',
    color: '#C5C5C5',
  },
  userName: {
    fontSize: '14px',
    fontFamily: 'Poppins',
    fontWeight: '600',
  },
}));

function RecommendCards({ data }) {
  const classes = useStyles();
  const router = useHistory();
  const [like, dislike] = React.useState(false);
  const [love, setLove] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const urlMedia = 'http://media-new.mw.metropolia.fi/wbma/uploads/';
  const [user] = React.useContext(UserContext);
  console.log('----rc cards---', user);

  return (
    <div
      className={classes.root}
      onClick={() => {
        if (user && Object.keys(user).length > 0) {
          router.push(`/comment/${data.file_id}`);
        } else {
          console.log('-----user first----');
          setOpen(true);
        }
      }}
    >
      <Paper className={classes.paper}>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Login First"
        />
        <Grid container>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                alt={data.title}
                src={urlMedia + data.filename}
              />
            </ButtonBase>
          </Grid>
          <Grid item className={classes.cardSubCard} spacing={2}>
            <Grid item container direction="column">
              <Grid item>
                <Typography className={classes.userName} variant="h6">
                  {data.title}
                </Typography>
                <Typography
                  className={classes.placeName}
                  variant="caption"
                  gutterBottom
                >
                  {data.description
                    ? JSON.parse(data.description)?.description
                    : null}
                  ,
                  {data.description
                    ? JSON.parse(data.description)?.genres
                    : null}
                  ,
                  {data.description
                    ? JSON.parse(data.description)?.skills
                    : null}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  style={{ display: 'block' }}
                >
                  <Rating
                    name="size-small"
                    defaultValue={2}
                    size="small"
                    precision={0.5}
                    readOnly
                  />
                  {' '}
                  {/* (120) */}
                </Typography>
              </Grid>
              <Grid item>
                <div style={{ display: 'flex', marginTop: '6px' }}>
                  <span className={classes.options}>
                    <ThumbUpAltIcon
                      onClick={() => dislike(!like)}
                      style={{ color: !like ? 'lightgrey' : '#2e8ef1' }}
                    />
                    <Typography variant="caption"> 990</Typography>
                  </span>
                  <span className={classes.options}>
                    <ThumbDownIcon />
                    <Typography variant="caption"> 990</Typography>
                  </span>
                  <span className={classes.options}>
                    <ChatBubbleIcon />
                    <Typography variant="caption"> 990</Typography>
                  </span>
                  <span className={classes.options}>
                    <FavoriteIcon
                      style={{ color: !love ? 'lightgrey' : 'red' }}
                      onClick={() => setLove(!love)}
                    />
                    <Typography variant="caption"> 8k</Typography>
                  </span>
                  <span className={classes.options}>
                    <ReplyIcon style={{ transform: 'rotateY(180deg)' }} />
                  </span>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default RecommendCards;
