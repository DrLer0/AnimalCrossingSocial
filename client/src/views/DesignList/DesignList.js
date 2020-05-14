import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/postActions'

import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { ProductsToolbar, ProductCard } from './components';
// import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
}));

const Posts = ({ getPosts, post: { posts } }) => {
  // const Posts = ({ getPosts, post: { posts: {images}, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // const [ data ] = posts.images;

  console.log(posts.images)
  
  const classes = useStyles();

  // const [products] = useState(mockData);

  return (
    <div className={classes.root}>
      <ProductsToolbar />
      <div className={classes.content}>
        <Grid
          container
          spacing={3}
        >
          {posts.images &&  
            posts.images.map(image => (
              <Grid
                item
                // key={image._id}
                lg={4}
                md={6}
                xs={12}
              >
                <ProductCard image={image} />
              </Grid>
            ))}
        </Grid>
      </div>
      {/* <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div> */}
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  post: state.post
})

export default connect(mapStateToProps, { getPosts })(Posts);