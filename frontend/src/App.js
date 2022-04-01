import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

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

function App() {
  const [isLogged, setIsLogged] = useState(false)
  return (
    <BrowserRouter>

      <div style={{ display: 'flex', backgroundColor: '#dddddd', justifyContent: 'end' }}>
        {/* <Button style={{ margin: 10 }} onClick={() => setIsLogged(!isLogged)} variant="contained">{isLogged ? 'Logout' : 'Login'}</Button> */}

        <Link to='/home' style={{ margin: 10 }}  >home</Link>

        <Link to='/login' style={{ margin: 10 }}  >login</Link>
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
        <Route path="home" element={<div style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>{localStorage.getItem('token')[0]}</div>} />

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

    </BrowserRouter >

  );
}

export default App;
