import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardActions,
  Link,
  Typography,
  Grid,
  Divider
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = ({ auth, post: { _id, title, description, twitterLink, user, name, likes, date } }) => {
  // const { className, product, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      // {...rest}
      className={clsx(classes.root)}
    >
      <CardContent>
        <div className={classes.imageContainer}>
          <img
            alt="Product"
            className={classes.image}
            src="/images/products/product_leaf.jpg"
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {title}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {description}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          <Link href={twitterLink} target="_blank" rel="noopener">{twitterLink}</Link>
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              Added: <Moment format="YYYY/MM/DD">{date}</Moment>
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <PersonIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {name}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  // product: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(ProductCard);
