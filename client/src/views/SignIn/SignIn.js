import React, { useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = ({loginUser, auth, errors, history}) => {

  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errors: {}
  });

  const { email, password } = formData;

  if (auth.isAuthenticated) {
    history.push("/dashboard"); 
  }

  const componentWillReceiveProps = () => {
    // console.log(nextProps)
      if (auth.isAuthenticated) {
        history.push("/dashboard"); // push user to dashboard when they login
        // return <Redirect to="/dashboard" />;
      }
      if (errors) {
        setFormData({
          errors: errors
        });
      }
    }

    const onChange = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = e => {
      e.preventDefault();
      loginUser(formData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
      console.log(formData)
      componentWillReceiveProps();
    };

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Your destination for the Animal Crossing community. 
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Add friends, set prices, trade, and more!
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
            
            <form
                noValidate
                className={classes.form}
                onSubmit={onSubmit}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Sign in
                </Typography>
                <TextField
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  }, classes.textField)}
                  error={errors.email}
                  fullWidth
                  // helperText={
                  //   hasError('email') ? formState.errors.email[0] : null
                  // }
                  label="Email address"
                  name="email"
                  onChange={onChange}
                  type="email"
                  value={email}
                  variant="outlined"
                />
                  <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
                <TextField
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  }, classes.textField)}
                  error={errors.password}
                  fullWidth
                  // helperText={
                  //   hasError('password') ? formState.errors.password[0] : null
                  // }
                  label="Password"
                  name="password"
                  onChange={onChange}
                  type="password"
                  value={password}
                  variant="outlined"
                />
                  <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                <Button
                  className={classes.signInButton}
                  color="primary"
                  // disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign in now
                </Button>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don't have an account?{' '}
                  <Link to="/sign-up">
                    Sign up
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(SignIn));