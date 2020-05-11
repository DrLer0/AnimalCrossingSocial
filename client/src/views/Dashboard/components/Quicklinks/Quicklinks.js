import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Link, Typography, Avatar } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  h4: {
    display: 'block',
    marginBottom: theme.spacing(2)
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const Quicklinks = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body1"
            >
              QUICK LINKS
            </Typography>
            <Typography variant="h5" className={classes.h4}>
              <Link
                component="a"
                href="/"
              >
                Set current turnip price
              </Link>
            </Typography>
            <Typography variant="h5" className={classes.h4}>
              <Link
                component="a"
                href="/"
                target="_blank"
              >
                Turnip calculator
              </Link>
            </Typography>
            <Typography variant="h5" className={classes.h4}>
              <Link
                component="a"
                href="/designs"
              >
                Custom designs
              </Link>
            </Typography>
            <Typography variant="h5" className={classes.h4}>
              <Link
                component="a"
                href="/account"
              >
                List item for sale
              </Link>
            </Typography>
            <Typography variant="h5" className={classes.h4}>
              <Link
                component="a"
                href="/account"
              >
                Add an event
              </Link>
            </Typography>
            {/* <Typography variant="h5" className={classes.h4}>
              <Link
                component="a"
                href="/users"
              >
                View friends list
              </Link>
            </Typography> */}
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <LinkIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Quicklinks.propTypes = {
  className: PropTypes.string
};

export default Quicklinks;
