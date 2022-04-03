import React, { useContext, useState } from 'react'
import { UserContext } from './App';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useSnackbar } from 'notistack';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const { profile, setProfile } = useContext(UserContext)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const seenMessage = async (id) => {
    try {

      const res = await axios.post(`http://localhost:8000/user/seen_message/${id}`, {},
        { headers: { 'x-access-token': localStorage.getItem('token') } })
      // console.log(res.data.user)
      setProfile(res.data.user)

    } catch {
      enqueueSnackbar('Unexpected error occurred!', { variant: 'error' });
    }
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const getDate = (date) => {
    var moment = require('moment');

    var formattedDate = moment(date).format('YYYY-MM-DD HH:mm');
    return formattedDate
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const isMessage = () => profile.notifications?.some(item => item.seen === false)



  return (
    <div style={{ display: 'flex', backgroundColor: '#dddddd', justifyContent: 'end', alignItems: 'center' }}>
      {/* <Button style={{ margin: 10 }} onClick={() => setIsLogged(!isLogged)} variant="contained">{isLogged ? 'Logout' : 'Login'}</Button> */}
      <IconButton color="primary" aria-label={id} onClick={handleClick}>
        {isMessage() ? <NotificationsActiveIcon /> : <NotificationsNoneIcon />}
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
          profile.notifications?.slice(0).reverse().map(item =>
            <div onMouseEnter={item.seen ? undefined : () => seenMessage(item._id)} style={{ position: 'relative', backgroundColor: item.seen ? '#fff' : '#ddd' }} key={item._id}>

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
  )
}
export default Header;