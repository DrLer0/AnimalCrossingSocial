import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, Link } from '@material-ui/core';

import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { user } = props.auth;

  const userExtra = {
    // name: user.name.split(" ")[0],
    avatar: '/images/avatars/avatar_11.png',
    bio: 'Peach Farmer'
  };

  const clickEvent = e => {
    console.log(props);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={userExtra.avatar}
        to="/account"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        <Link onClick={clickEvent}>test</Link>{user.name.split(" ")[0]}
      </Typography>
      <Typography variant="body2">{userExtra.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(Profile);

// export default Profile;
