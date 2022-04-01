import React, { useContext, useState } from 'react'
import { UserContext } from './App';



const Home = () => {
  const { profile } = useContext(UserContext)


  return (
    <div style={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
     
      {/* {JSON.stringify(profile)} */}

      {/* {localStorage.getItem('token')[0]} */}
      {profile.username ?
        <>

          <h3>Hello {profile.username}!!</h3>
          <h3>Your current money {profile.cash}</h3>
          {profile.notifications.map(item => <div key={item._id}> <h3>message: {item.message}</h3><h3> time: {item.time}</h3></div>)}
        </>
        :
        'not logged in'
      }

    </div>
  )
}

export default Home;
