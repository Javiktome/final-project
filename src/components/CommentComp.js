/* eslint-disable react/prop-types */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'Poppins',
    '& .MuiTypography-body1': {
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: '14px',
    },
  },
  commentBox: {
    background: 'rgba(0,0,0,0.1)',
    borderRadius: '8px',
  },
  body: { fontFamily: 'Poppins', fontSize: '12px', fontWeight: '400' },
}));

export default function CommentComp({ comment }) {
  const classes = useStyles();
  return (
    <div>
      <List className={classes.root}>
        <ListItem alignItems="flex-start" className={classes.commentBox}>
          <ListItemAvatar>
            <Avatar
              alt={comment?.username}
              src="/static/images/avatar/1.jpg"
            />
          </ListItemAvatar>
          <ListItemText
            primary={comment?.username}
            secondary={(
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.body}
                  color="textPrimary"
                >
                  {comment.comment}
                </Typography>
              </>
            )}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </div>
  );
}
