import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  ShoppingBag as ShoppingBagIcon,
  Users as UsersIcon
} from 'react-feather';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ChatIcon from '@material-ui/icons/Chat';
import NavItem from './NavItem';

const items = [
  {
    href: '/teacher/home',
    icon: ShoppingBagIcon,
    title: 'Questions'
  },
  {
    href: '/teacher/collections',
    icon: LibraryBooksIcon,
    title: 'Collections'
  },
  {
    href: '/teacher/class',
    icon: UsersIcon,
    title: 'Classes'
  },
  {
    href: '/teacher/chat',
    icon: ChatIcon,
    title: 'Chat Room'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
    marginBottom: 50
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const currentUser = localStorage.getItem('brainaly_user');
    const userObject = JSON.parse(currentUser);
    setAvatarUrl(userObject?.userAvatar);
    setUserName(userObject?.userName);
  });
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={avatarUrl ? `http://localhost:3001/upload/${avatarUrl}` : null}
          to="/teacher/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {userName}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
