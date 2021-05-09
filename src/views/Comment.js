/* eslint-disable max-len */
/* eslint-disable camelcase */
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ReplyIcon from '@material-ui/icons/Reply';
import Button from '@material-ui/core/Button';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { Send } from '@material-ui/icons';
import CustomAppBar from '../components/CustomAppbar';
import CommentComp from '../components/CommentComp';
import { postComment, useSingleUserByFile } from '../hooks/generalHooks';

const useStyles = makeStyles({
  root: {
    margin: '8px 19px',
    marginBottom: '100px',
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
    fontFamily: 'Poppins',
    fontWeight: '700',
    fontSize: '20px',
  },
  placeName: {
    fontFamily: 'Poppins',
    fontSize: '14px',
    color: '#C5C5C5',
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
  optionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '7px',
    marginTop: '3px',
    '& > .MuiSvgIcon-root': {
      width: '25px',
      height: '25px',
      color: '#C5C5C5',
    },
    '& > .MuiTypography-caption': {
      fontSize: '16px',
      color: '#C5C5C5',
      marginLeft: '2px',
    },
  },
});

export default function Comment() {
  const classes = useStyles();
  const { file_id } = useParams();
  const urlMedia = 'http://media-new.mw.metropolia.fi/wbma/uploads/';
  const [value, setValue] = useState('comment');
  const [comment, setComment] = useState(null);
  const [commentRes, setCommentRes] = useState(null);
  const [like, dislike] = useState(false);
  const [love, setLove] = useState(false);
  const file = useSingleUserByFile(file_id, commentRes);
  console.log('file', file_id, file, comment, commentRes);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleSubmit = () => {
    if (file_id && file) {
      // console.log('----comment-------', comment);
      postComment({ file_id, comment }).then((res) => { setCommentRes(res); setComment(''); console.log(res); });
    }
  };
  return (
    <div className={classes.root}>
      <Typography className={classes.heading} variant="h4" gutterBottom>
        {file && file?.userofFile?.username}
      </Typography>
      <Typography
        className={classes.placeName}
        variant="subtitle2"
        gutterBottom
      >
        {file && file?.file?.title}
        <br />
        {file && file?.file && JSON.parse(file.file.description).skills}
        ,
        {file && file?.file && JSON.parse(file.file.description).genres}
        ,
        {file && file?.file && JSON.parse(file.file.description).description}
      </Typography>
      <div className={classes.image}>
        {file && file?.file && (
          <img src={urlMedia + file.file.filename} alt="" />
        )}
      </div>
      <div className={classes.optionContainer}>
        <span className={classes.options}>
          <ThumbUpAltIcon
            onClick={() => dislike(!like)}
            style={{ color: !like ? 'lightgrey' : '#2e8ef1' }}
          />
          <Typography variant="caption">
            {' '}
            {file && file?.ratings?.length}
          </Typography>
        </span>
        <span className={classes.options}>
          <ThumbDownIcon />
          <Typography variant="caption">
            {' '}
            {file && file?.ratings?.length}
          </Typography>
        </span>
        <span className={classes.options}>
          <ChatBubbleIcon />
          <Typography variant="caption">
            {' '}
            {file && file?.comments?.length}
          </Typography>
        </span>
        <span className={classes.options}>
          <FavoriteIcon
            onClick={() => setLove(!love)}
            style={{ color: !love ? 'lightgrey' : 'red' }}
          />
          <Typography variant="caption">
            {' '}
            {file && file?.favourites?.length}
            k
          </Typography>
        </span>
        <span className={classes.options}>
          <ReplyIcon style={{ transform: 'rotateY(180deg)' }} />
        </span>
      </div>

      <div style={{ marginBottom: '70px', marginTop: '20px' }}>
        <CommentComp
          comment={{
            username: 'Dummy Person',
            comment:
              'Very Cool Image... This is a dummy comment as the file has no comments yet.',
          }}
        />
        {file
          && file.comments?.map((com) => (
            <CommentComp key={com.comment_id} comment={com} />
          ))}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          value={comment}
          id="outlined-basic"
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment"
          label="+ Add Comment"
          variant="outlined"
          style={{ width: '85%' }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<Send />}
          onClick={handleSubmit}
          style={{ marginLeft: '50px' }}
        >
          Save
        </Button>
      </div>
      <CustomAppBar value={value} handleChange={handleChange} />
    </div>
  );
}
