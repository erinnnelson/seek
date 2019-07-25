import React from 'react';
import ModalClick from './ModalClick';

export default function NavBar(props) {
  return (
    <div className="navbar">
      <h5 className="logo">tackle;</h5>
      <nav id="side-links">
        {props.user ?
          (<div>
            <p>Hello {props.user.username}</p>
            <button onClick={props.handleLogOut}>Logout</button>
          </div>) :
          <ModalClick
            {...props}
          />
        }
      </nav>
    </div>
  )
}