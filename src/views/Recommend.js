/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory, useParams } from 'react-router-dom';
import CustomAppBar from '../components/CustomAppbar';
import RecommendCards from '../components/RecommendCards';
import getAllMedia from '../hooks/ApiHook';

const useStyles = makeStyles(() => ({
  root: {
    margin: '0',
    background: '#7479FA',
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
  appBar: {
    background: '#7479FA',
  },
}));

function Recommended() {
  const classes = useStyles();
  const [value, setValue] = React.useState('comment');
  const [data, setData] = useState([]);
  const { category } = useParams();
  const router = useHistory();
  console.log('category;', category);

  useEffect(() => {
    if (category === 'recommended') {
      getAllMedia(0, 10).then((res) => setData(res));
      // console.log('--------mmm', allMedia);
    } else if (category === 'pictures') {
      getAllMedia(20, 30).then((res) => setData(res));
    } else {
      getAllMedia(10, 20).then((res) => setData(res));
    }
    // console.log('--m--oo', allMedia);
    // setData(allMedia);
  }, []);
  console.log('---data---', data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={() => router.goBack()} edge="start" color="inherit" aria-label="menu">
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6">{category === 'recommended' ? 'Recommended' : (category === 'popular' ? 'Popular' : 'Pictures')}</Typography>
        </Toolbar>
      </AppBar>
      {data && data.map((d) => <RecommendCards key={d.id} data={d} />)}
      {/* <RecommendCards />
      <RecommendCards />
      <RecommendCards />
      <RecommendCards />
      <RecommendCards />
      <RecommendCards /> */}

      {/* <div>
        <RecommendCards />
        <RecommendCards />
      </div> */}

      <CustomAppBar value={value} handleChange={handleChange} />
    </div>
  );
}

export default Recommended;
