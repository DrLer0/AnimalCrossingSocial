import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link as RouterLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

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
  // useEffect(() => {
  //   getCurrentProfile();
  // }, []);

  // console.log('auth', auth.user)
  // console.log('profile', profile.user)
  // console.log(props)

  const { className, ...rest } = props;
  
  const classes = useStyles();
  
  const { user } = props.auth;
  const { profile } = props.profile;
  
  return (
    <div
      // {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        // src={userExtra.avatar}
        // to={`/profile/${profile._id}`}
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name.split(" ")[0]}
        {/* {profile.user.name} */}
      </Typography>
      {/* <Typography variant="body2">{profile.islandName}</Typography> */}
      {/* <Typography variant="body2"><Link to={`/profile/${profile._id}`}>See profile</Link></Typography> */}
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps)(Profile);

// export default Profile;
