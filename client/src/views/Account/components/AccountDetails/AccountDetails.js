import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../../../actions/profileActions';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import isEmpty from '../../../../validations/is-empty'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = ({ profile: {profile}, createProfile, getCurrentProfile, history }) => {
  // const { className, ...rest } = props;

  // console.log(profile._id)

  const classes = useStyles();

  const [formData, setFormData] = useState({
    handleName: '',
    islandName: '',
    localFruit: '',
    turnipPrice: '',
    hotItem: '',
    hotItemPrice: '',
    celeste: '',
    sahara: '',
    entryFee: ''
  });

  const {
    handleName,
    islandName,
    localFruit,
    turnipPrice,
    hotItem,
    hotItemPrice,
    celeste,
    sahara,
    entryFee
  } = formData;

  
  const userId = profile._id;
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, userId);
    getCurrentProfile();
  }

  const yesno = [
    {
      value: true,
      label: 'Yes'
    },
    {
      value: false,
      label: 'No'
    }
  ];

  return (
    <Card
      // {...rest}
      // className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={e => onSubmit(e)}
      >
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Your in-game handle name"
                label="Handle name"
                margin="dense"
                name="handleName"
                onChange={e => onChange(e)}
                value={handleName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Your island name"
                label="Island name"
                margin="dense"
                name="islandName"
                onChange={e => onChange(e)}
                value={islandName}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Your current local island fruit"
                label="Local fruit"
                margin="dense"
                name="localFruit"
                onChange={e => onChange(e)}
                value={localFruit}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography gutterBottom variant="h4" display="block">
                Happenings on your island
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Set your current turnip prices (in Bells Currency)"
                label="Current turnip price"
                margin="dense"
                name="turnipPrice"
                onChange={e => onChange(e)}
                value={turnipPrice}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Set your island entry fee (in Bells Currency)"
                label="Island entry fee"
                margin="dense"
                name="entryFee"
                onChange={e => onChange(e)}
                value={entryFee}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Top item you are looking to sell"
                label="Hot item"
                margin="dense"
                name="hotItem"
                onChange={e => onChange(e)}
                value={hotItem}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Set your hot item price (in Bells Currency)"
                label="Hot item price"
                margin="dense"
                name="hotItemPrice"
                onChange={e => onChange(e)}
                value={hotItemPrice}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Will Celeste be visiting your island?"
                label="Celeste event"
                margin="dense"
                name="celeste"
                onChange={e => onChange(e)}
                value={celeste}
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {yesno.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Will Sahara be visiting your island?"
                label="Sahara event"
                margin="dense"
                name="sahara"
                onChange={e => onChange(e)}
                value={sahara}
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {yesno.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Save details
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapsStateToProps = (state) => ({ 
  profile: state.profile
})

export default connect(mapsStateToProps, { createProfile, getCurrentProfile })(withRouter(AccountDetails));
