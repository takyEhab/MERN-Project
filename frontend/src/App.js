import Avatar from '@mui/material/Avatar';
import { useState, createContext, useEffect, Fragment } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import SendMoney from './SendMoney';
import axios from 'axios';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const generateColor = (str) => {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
}
export const UserContext = createContext()
function App() {
  const [isLogged, setIsLogged] = useState(false)
  const [profile, setProfile] = useState({})
  const ProviderValue = { profile, setProfile };

  useEffect(() => {
    axios.get('http://localhost:8000/user/profile', {
      headers: { 'x-access-token': localStorage.getItem('token') }

    })
      .then(info => {
        // dispatch(logIn(info.data, CONFIG))
        console.log(info.data.me.notifications)
        setProfile(info.data.me)
      })
      .catch((err) => {
        console.error(err)
        // dispatch(logOut())
      })
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const getDate = (date) => {
    var moment = require('moment');

    var formattedDate = moment(date).format('YYYY-MM-DD HH:mm');
    return (<>{formattedDate}</>)
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <BrowserRouter>
      <UserContext.Provider value={ProviderValue} >

        <div style={{ display: 'flex', backgroundColor: '#dddddd', justifyContent: 'end', alignItems: 'center' }}>
          {/* <Button style={{ margin: 10 }} onClick={() => setIsLogged(!isLogged)} variant="contained">{isLogged ? 'Logout' : 'Login'}</Button> */}
          <IconButton color="primary" aria-label={id} onClick={handleClick}>
            <NotificationsNoneIcon />
          </IconButton>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >

            {
              profile.notifications?.map(item =>
                <div style={{ position: 'relative', backgroundColor: item.seen ? '#fff' : '#ddd' }} key={item._id}>

                  <Typography sx={{ p: 3 }}>
                    {item.message}
                  </Typography>
                  <Typography sx={{ bottom: 0, opacity: 0.5, position: 'absolute', right: 0 }}>
                    {getDate(item.time)}
                  </Typography>
                  {/* <hr /> */}
                </div>
              )
            }


          </Popover>

          <Link to='/home' style={{ margin: 10 }}  >Home</Link>
          <Link to='/send' style={{ margin: 10 }}  >Send mony</Link>

          <Link to='/login' style={{ margin: 10 }}  >Login</Link>
          <Link to='/register' style={{ margin: 10 }} >Register</Link>

          {/*       
          {
    isLogged ?
      <Avatar sx={{ bgcolor: generateColor("Taky"), margin: 1 }} aria-label="recipe">
        T
      </Avatar>
      :
      <Link to='/signin' style={{ margin: 10 }} onClick={() => setIsLogged(!isLogged)} >Register</Link>

  } */}
        </div >
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="send" element={<SendMoney />} />

          <Route path="login" element={<SignIn />} />
          <Route path="register" element={<SignUp />} />


          {/* 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
          {/* <SignIn /> */}
        </Routes >
      </UserContext.Provider>

    </BrowserRouter >

  );
}

export default App;
