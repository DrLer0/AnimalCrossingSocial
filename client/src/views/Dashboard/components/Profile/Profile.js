import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  chartContainer: {
    position: 'relative',
    height: '300px'
  },
  stats: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'center',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  }
}));

const Profile = props => {
  const { className, profile, auth, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.error.main,
          theme.palette.warning.main
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Desktop', 'Tablet', 'Mobile']
  };

  const options = {
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Link to="/account">
            <IconButton size="small">
              <CreateIcon />
            </IconButton>
          </Link>
        }
        title="Profile at a glance"
      />

      <CardMedia
        className={classes.media}
        image="/images/dashboard-splash.png"
        title="Welcome!"
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Welcome back, {auth.user.name}!
        </Typography>
        <Typography variant="body1" gutterBottom>
          {/* {profile.turnipPrice > 0 ? (<div>Your current turnip price: {profile.turnipPrice} bells</div>) : null} */}
          {profile == null || profile == false || profile == {} ? "Get started by adding your profile" : (<div>Your current turnip price: {profile.turnipPrice} bells</div>)}
        </Typography>
      </CardContent>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object,
};

export default Profile;
