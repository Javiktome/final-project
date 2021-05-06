/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
// import List from '@material-ui/core/List';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import MenuIcon from '@material-ui/icons/Men
import Avatar from '@material-ui/core/Avatar';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
// import SearchIcon from '@material-ui/icons/Search';
// import MoreIcon from '@material-ui/icons/MoreVert';
//-----------------------------------------
import CameraImg from '../assets/camera.png';
// import GirlCamera from '../assets/cameragirl.png';
import CustomAppBar from '../components/CustomAppbar';
import getAllMedia from '../hooks/ApiHook';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    paritialVisibilityGutter: 30,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
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
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  bluePaper: {
    height: '252px',
    background: '#7479FA',
    padding: '80px 0',
    paddingLeft: '19px',
    paddingRight: '36px',
  },
  imageText: {
    // background: 'lightgrey',
    width: '55px',
    margin: '0 auto',
    '& > .MuiAvatar-root': {
      width: '55px',
      height: '55px',
    },
  },
  gridPadding: {
    padding: '5px !important',
  },
  link: {
    fontSize: '12px',
    color: '#95969B',
    fontFamily: 'Poppins',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '19px',
    marginRight: '36px',
    alignItems: 'center',
  },
  box2: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '19px',
    marginRight: '36px',
    alignItems: 'center',
    marginTop: '25px',
    marginBottom: '6px',
  },
  box3: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '19px',
    marginRight: '36px',
    alignItems: 'center',
    marginTop: '25px',
    marginBottom: '6px',
  },
  imagesBox: {
    marginLeft: '19px',
  },
  imgRecommend: {
    width: '350px',
    height: '200px',
    borderRadius: '8px',
    overflow: 'hidden',
    '& > img': {
      width: '350px',
      height: '200px',
      background: 'lightgrey',
    },
  },
  imgRecommend2: {
    width: '350px',
    height: '200px',
    overflow: 'hidden',
    '& > img': {
      width: '300px',
      height: '200px',
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const [value, setValue] = React.useState('home');
  const [allMedia, setAllMedia] = React.useState(null);
  const router = useHistory();
  const [allMediaCopy, setAllMediaCopy] = useState([]);
  const [inputVal, setInputVal] = useState(null);
  const urlMedia = 'http://media-new.mw.metropolia.fi/wbma/uploads/';
  React.useEffect(() => {
    getAllMedia(0, 30).then((res) => { console.log('------get media------', res); setAllMedia(res); });
  }, []);
  console.log('------get all media------', allMedia);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (e) => {
    setInputVal(e.target.value);
    if (e.target.value === '') {
      setAllMediaCopy(allMedia);
    } else {
      const filterData = allMedia.filter((am) => am.title.includes(e.target.value));
      setAllMediaCopy(filterData);
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Paper className={classes.bluePaper} elevation={3}>
          <Typography
            style={{
              fontSize: '21px',
              fontFamily: 'Poppins',
              lineHeight: '29px',
              fontWeight: 'bold',
              color: '#fff',
            }}
            variant="h4"
            gutterBottom
          >
            Find Videos and pictures
          </Typography>
          <Paper component="form" elevation={0}>
            <IconButton aria-label="menu">
              <SearchIcon />
            </IconButton>
            <InputBase
              value={inputVal}
              style={{ fontSize: '17px' }}
              placeholder="Search By Title"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearchChange}
            />
          </Paper>
        </Paper>
        <Paper
          elevation={3}
          style={{
            marginLeft: '19px',
            marginRight: '36px',
            marginBottom: '19px',
            padding: '16px 26px',
            marginTop: '14px',
          }}
        >
          <Grid container style={{ justifyContent: 'center' }} spacing={3}>
            <Grid item xs={3} className={classes.gridPadding}>
              <Paper className={classes.imageText} elevation={0}>
                <Avatar src={CameraImg} variant="square" />
                <Typography
                  style={{
                    fontSize: '13px',
                    textAlign: 'center',
                    marginTop: '9px',
                  }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  Like
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={3} className={classes.gridPadding}>
              <Paper className={classes.imageText} elevation={0}>
                <Avatar src={CameraImg} variant="square" />
                <Typography
                  style={{
                    fontSize: '13px',
                    textAlign: 'center',
                    marginTop: '9px',
                  }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  Love
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={3} className={classes.gridPadding}>
              <Paper className={classes.imageText} elevation={0}>
                <Avatar src={CameraImg} variant="square" />
                <Typography
                  style={{
                    fontSize: '13px',
                    textAlign: 'center',
                    marginTop: '9px',
                  }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  Save
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={3} className={classes.gridPadding}>
              <Paper className={classes.imageText} elevation={0}>
                <Avatar src={CameraImg} variant="square" />
                <Typography
                  style={{
                    fontSize: '13px',
                    textAlign: 'center',
                    marginTop: '9px',
                  }}
                  variant="caption"
                  display="block"
                  gutterBottom
                >
                  Create
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
        {inputVal ? (
          <div className="remomended-carousel">
            <div className={classes.box}>
              <Typography variant="h5" gutterBottom>
                Search Results
              </Typography>
            </div>
            <div className={classes.imagesBox}>
              <Carousel
                draggable={false}
                responsive={responsive}
                ssr // means to render carousel on server-side.
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={['tablet', 'mobile']}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                partialVisbile
              >
                {allMediaCopy
                  && allMediaCopy.map((am, ind) => (
                    <div key={ind} className={classes.imgRecommend}>
                      <img src={urlMedia + am.filename} alt={am.title} />
                    </div>
                  ))}
              </Carousel>
            </div>
          </div>
        ) : null}
        {!inputVal || inputVal === '' ? (
          <>
            {' '}
            <div className="remomended-carousel">
              <div className={classes.box}>
                <Typography variant="h5" gutterBottom>
                  Recommended
                </Typography>
                <a
                  className={classes.link}
                  onClick={() => router.push('/category/recommended')}
                >
                  See all
                </a>
              </div>
              <Typography
                variant="body2"
                style={{
                  maxWidth: '75%',
                  marginTop: '10px',
                  marginBottom: '30px',
                }}
                className={classes.box}
              >
                The most sustainable option is wearing what you already own.
                What do you have that you can make feel new again? Can you style
                an item differently to create an unexpected combination? Look
                through your closet before heading to the store.
              </Typography>
              <div className={classes.imagesBox}>
                {allMedia && (
                  <Carousel
                    draggable={false}
                    responsive={responsive}
                    ssr // means to render carousel on server-side.
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={['tablet', 'mobile']}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    partialVisbile
                  >
                    {allMedia
                      && [...allMedia.slice(0, 10)].map((am, ind) => (
                        <div key={ind} className={classes.imgRecommend}>
                          <img src={urlMedia + am.filename} alt={am.title} />
                        </div>
                      ))}
                  </Carousel>
                )}
              </div>
            </div>
            <div className="remomended-carousel">
              <div className={classes.box2}>
                <Typography variant="h5" gutterBottom>
                  Popular
                </Typography>
                <a
                  onClick={() => router.push('/category/popular')}
                  className={classes.link}
                >
                  See all
                </a>
              </div>
              <Typography
                variant="body2"
                style={{
                  maxWidth: '75%',
                  marginTop: '10px',
                  marginBottom: '30px',
                }}
                className={classes.box}
              >
                This is a great way to support local while adding “new” items to
                your closet. I also love thrifting while ON vacation, just make
                sure to leave some room in your suitcase. Both my skirt and
                dress pictured below were from thrift stores and under
              </Typography>
              <div className={classes.imagesBox}>
                {allMedia && (
                  <Carousel
                    draggable={false}
                    responsive={responsive}
                    ssr // means to render carousel on server-side.
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={['tablet', 'mobile']}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    partialVisbile
                  >
                    {/* <div className={classes.imgRecommend}>
                <video
                  style={{ width: 'inherit', height: 'inherit' }}
                  controls
                  src="https://www.youtube.com/watch?v=w7ejDZ8SWv8"
                />
              </div> */}
                    {allMedia
                      && [...allMedia.slice(10, 20)].map((am, ind) => (
                        <div key={ind} className={classes.imgRecommend}>
                          <img src={urlMedia + am.filename} alt={am.title} />
                        </div>
                      ))}
                  </Carousel>
                )}
              </div>
              <div className="remomended-carousel">
                <div className={classes.box3}>
                  <Typography variant="h5" gutterBottom>
                    Pictures
                  </Typography>
                  <a
                    onClick={() => router.push('/category/pictures')}
                    className={classes.link}
                  >
                    See all
                  </a>
                </div>
                <Typography
                  variant="body2"
                  style={{
                    maxWidth: '75%',
                    marginTop: '10px',
                    marginBottom: '30px',
                  }}
                  className={classes.box}
                >
                  This is one of my favorite options. Not excited about what’s
                  in your closet? Bring out your clothes that are in great
                  condition, but just don’t excite you anymore and exchange with
                  a friend. The crochet dress pictured below is from a recent
                  clothing swap and the bathing suit was a friend-me-down.
                </Typography>
                <div className={classes.imagesBox}>
                  {allMedia && (
                    <Carousel
                      draggable={false}
                      responsive={responsive}
                      ssr // means to render carousel on server-side.
                      customTransition="all .5"
                      transitionDuration={500}
                      containerClass="carousel-container"
                      removeArrowOnDeviceType={['tablet', 'mobile']}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item-padding-40-px"
                      partialVisbile
                    >
                      {/* <div className={classes.imgRecommend2}>
                  <img src={CameraImg} alt="girl camera" />
                </div> */}
                      {allMedia
                        && [...allMedia.slice(20, 30)].map((am, ind) => (
                          <div key={ind} className={classes.imgRecommend2}>
                            <img src={urlMedia + am.filename} alt={am.title} />
                          </div>
                        ))}
                    </Carousel>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </Paper>
      <CustomAppBar value={value} handleChange={handleChange} />
    </div>
  );
}
