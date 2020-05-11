import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AccountProfile = props => {
  // const { className, handleName, ...rest } = props;

  // useEffect(() => {
  //   getCurrentProfile();
  // }, [getCurrentProfile]);

  // console.log(handleName);

  const classes = useStyles();

  // const user = {
  //   name: 'Jenny Doe',
  //   city: 'Los Angeles',
  //   country: 'USA',
  //   timezone: 'GTM-7',
  //   avatar: '/images/avatars/avatar_11.png'
  // };

  const { user } = props.auth;
  const { profile } = props.profile;
  // console.log(user)

  return (
    <Card
      // {...rest}
      // className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.name.split(" ")[0]}
            </Typography>
            {/* <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              Island Name: {profile.profile.islandName}
            </Typography> */}
            
          </div>
          <Avatar
            className={classes.avatar}
            // src={user.avatar}
          />
        </div>
        {/* <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div> */}
      </CardContent>
      <Divider />
      <CardActions>
        <Link to={`/profile/${profile._id}`}>
          <Button
            className={classes.uploadButton}
            color="primary"
            variant="text"
            // href="/profile"
          >
            View Profile
          </Button>
        </Link>
        {/* <Button variant="text">Remove picture</Button> */}
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps)(AccountProfile);
