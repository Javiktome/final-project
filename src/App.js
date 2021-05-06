/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import { useContext, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route, useHistory,
  // useHistory,
} from 'react-router-dom';
import Comment from './views/Comment';
import Recommended from './views/Recommend';
import LandingPage from './views/LandingPage';
import Signup from './views/Signup';
import Signin from './views/Signin';
import Home from './views/Home';
import Profile from './views/Profile';
import { checkUserAvailable } from './hooks/generalHooks';
import { UserContext } from './contexts/UserContext';
import UploadMedia from './views/UploadMedia';

function App() {
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    checkUserAvailable().then((res) => {
      setUser(res);
    });
  }, []);
  console.log('--------app user---------', user);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/profile">
            <Layout>
              <Profile />
            </Layout>
          </Route>
          <Route path="/comment/:file_id">
            <Layout>
              <Comment />
            </Layout>
          </Route>
          <Route path="/upload-media">
            <Layout>
              <UploadMedia />
            </Layout>
          </Route>
          <Route path="/category/:category">
            <Recommended />
          </Route>
          <Route path="/signup">
            <Layout2>
              <Signup />
            </Layout2>
          </Route>
          <Route path="/login">
            <Layout2>
              <Signin />
            </Layout2>
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Layout2>
              <LandingPage />
            </Layout2>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const Layout = ({ children }) => {
  const [user] = useContext(UserContext);
  const router = useHistory();
  useEffect(() => {
    console.log(
      '----pathname---', user,
      router.location.pathname,
      user && user.email && router.location.pathname === '/',
    );
    if (user && user.email && router.location.pathname === '/') {
      router.push('/home');
    } else if ((user && user.message) || !user) {
      router.push('/');
    }
  }, [user]);
  return <>{children}</>;
};

const Layout2 = ({ children }) => {
  const [user] = useContext(UserContext);
  const router = useHistory();
  useEffect(() => {
    console.log(
      '----pathname---',
      user,
      router.location.pathname,
      user && user.email && router.location.pathname === '/',
    );
    if (user && user.email) {
      router.push('/home');
    }
  }, [user]);
  return <>{children}</>;
};

export default App;
