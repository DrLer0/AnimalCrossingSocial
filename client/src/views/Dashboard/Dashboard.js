import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllProfiles, getCurrentProfile } from "../../actions/profileActions";
import { logoutUser } from "../../actions/authActions";
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Profile,
  LatestTurnipPrices,
  LatestMembers,
  Quicklinks
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Dashboard = ({getAllProfiles, profile: { profiles, loading }, getCurrentProfile, profile: {profile}, auth }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        
        {/* <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit />
        </Grid> */}
        <Grid
          item
          lg={4}
          md={12}
          xl={3}
          xs={12}
        >
          <Profile profile={profile} auth={auth} />
        </Grid>
        <Grid
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestTurnipPrices />
        </Grid>
        {/* <Grid
          item
          lg={4}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid> */}
        <Grid
          item
          lg={9}
          md={9}
          xl={10}
          xs={12}
        >
          <LatestMembers profiles={profiles} />
        </Grid>
        <Grid
          item
          lg={3}
          md={3}
          xl={2}
          xs={12}
        >
          <Quicklinks />
        </Grid>
      </Grid>
    </div>
  );
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getAllProfiles: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { logoutUser, getAllProfiles, getCurrentProfile }
)(Dashboard);