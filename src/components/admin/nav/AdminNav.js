import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

import { firebase } from '../../../firebase';

const AdminNav = props => {
  const links = [
    {
      title: 'Matches',
      linkTo: '/admin-matches',
    },
    {
      title: 'Add match',
      linkTo: '/admin-matches/edit',
    },
    {
      title: 'Players',
      linkTo: '/admin-players',
    },
    {
      title: 'Add player',
      linkTo: '/admin-players/edit',
    },
  ];

  const style = {
    color: '#fff',
    fontWeight: '300',
    borderBottom: '1px solid #353535',
  };

  const logoutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log('Log out successful');
        },
        error => {
          console.log('Log out error');
        }
      );
  };

  return (
    <div>
      {links.map(link => (
        <Link to={link.linkTo} key={link.title}>
          <ListItem button style={style}>
            {link.title}
          </ListItem>
        </Link>
      ))}
      <ListItem button style={style} onClick={() => logoutHandler()}>
        Log out
      </ListItem>
    </div>
  );
};

export default AdminNav;
