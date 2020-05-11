import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import WhatsHotIcon from '@material-ui/icons/Whatshot';
import MoneyIcon from '@material-ui/icons/Money';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import PetsIcon from '@material-ui/icons/Pets';
import { makeStyles } from '@material-ui/styles';
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

const UserDetails = ({ 
    profile: { 
        handleName, 
        islandName,
        localFruit,
        turnipPrice,
        hotItem,
        hotItemPrice,
        entryFee,
        celeste,
        sahara,
        user: { name, _id } = {} } }) => {
  // const { className, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    firstName: 'Jason',
    lastName: 'Smith',
    email: 'js@gmail.com',
    phone: '',
    state: 'California',
    country: 'USA'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const states = [
    {
      value: 'california',
      label: 'California'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

  return (
    <Card>
        <CardHeader
          title="What's happening on this island!" 
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="h3" gutterBottom>
              <MoneyIcon /> Turnip prices:
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>{turnipPrice}</b> bells (Prices change at noon)
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="h3" gutterBottom>
                <WhatsHotIcon /> Hot item:
              </Typography>
              <Typography variant="body1" gutterBottom>
                <b>{hotItem}: {hotItemPrice}</b> bells (Prices change at 5am local time)
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="h3" gutterBottom>
                <EmojiNatureIcon /> Celeste is visiting
              </Typography>
              <Typography variant="body1" gutterBottom>
                {celeste === true ? "Yes, there will be a visit" : "No, nothing scheduled"}  
              </Typography>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <Typography variant="h3" gutterBottom>
                <PetsIcon /> Sahara is visiting
              </Typography>
              <Typography variant="body1" gutterBottom>
                {sahara === true ? "Yes, there will be a visit" : "No, nothing scheduled"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
    </Card>
  );
};

UserDetails.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default UserDetails;
