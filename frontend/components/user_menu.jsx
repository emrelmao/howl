import React from 'react';
import { Link } from 'react-router-dom';

const UserMenu = (props) => {
  if (props.openState) {
    return (
      <div id="user_menu">
        <div id="popover-arrow"></div>
        <a onClick={() => props.logout()}>Sign out</a>
      </div>
    );
  }
  return <div></div>;
};

export default UserMenu;