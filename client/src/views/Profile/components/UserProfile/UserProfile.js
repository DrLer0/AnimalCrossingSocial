import React from 'react';
import PropTypes from 'prop-types';
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

const UserProfile = ({ 
  profile: { 
      handleName, 
      islandName,
      localFruit,
      turnipPrice,
      hotItem,
      hotItemPrice,
      entryFee,
      user: { name, _id } = {} } }) => {
  // const { className, ...rest } = props;

  // const { profile, user: { name }, ...rest } = props;

  // console.log(name);

  const classes = useStyles();

  // const user = {
  //   name: 'John Smith',
  //   city: 'San Francisco',
  //   country: 'USA',
  //   timezone: 'GTM-7',
  //   avatar: '/images/avatars/avatar_3.png'
  // };

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
              {name}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Handle name: <b>{!handleName ? "No name" : handleName}</b>
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Island name: <b>{islandName}</b>
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Local fruit: <b>{localFruit}</b>
            </Typography>
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
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Follow
        </Button>
      </CardActions>
    </Card>
  );
};

UserProfile.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default UserProfile;
