// import React, { useState, useEffect } from 'react';
// import { Link as RouterLink, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import validate from 'validate.js';
// import { makeStyles } from '@material-ui/styles';
// import {
//   Grid,
//   Button,
//   IconButton,
//   TextField,
//   Link,
//   Typography
// } from '@material-ui/core';
// import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';

// const schema = {
//   email: {
//     presence: { allowEmpty: false, message: 'is required' },
//     email: true,
//     length: {
//       maximum: 64
//     }
//   },
//   password: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       maximum: 128
//     }
//   }
// };

// const useStyles = makeStyles(theme => ({
//   root: {
//     backgroundColor: theme.palette.background.default,
//     height: '100%'
//   },
//   grid: {
//     height: '100%'
//   },
//   quoteContainer: {
//     [theme.breakpoints.down('md')]: {
//       display: 'none'
//     }
//   },
//   quote: {
//     backgroundColor: theme.palette.neutral,
//     height: '100%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundImage: 'url(/images/auth.png)',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     backgroundPosition: 'center'
//   },
//   quoteInner: {
//     textAlign: 'center',
//     flexBasis: '600px'
//   },
//   quoteText: {
//     color: theme.palette.white,
//     fontWeight: 300
//   },
//   name: {
//     marginTop: theme.spacing(3),
//     color: theme.palette.white
//   },
//   bio: {
//     color: theme.palette.white
//   },
//   contentContainer: {},
//   content: {
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column'
//   },
//   contentHeader: {
//     display: 'flex',
//     alignItems: 'center',
//     paddingTop: theme.spacing(5),
//     paddingBototm: theme.spacing(2),
//     paddingLeft: theme.spacing(2),
//     paddingRight: theme.spacing(2)
//   },
//   logoImage: {
//     marginLeft: theme.spacing(4)
//   },
//   contentBody: {
//     flexGrow: 1,
//     display: 'flex',
//     alignItems: 'center',
//     [theme.breakpoints.down('md')]: {
//       justifyContent: 'center'
//     }
//   },
//   form: {
//     paddingLeft: 100,
//     paddingRight: 100,
//     paddingBottom: 125,
//     flexBasis: 700,
//     [theme.breakpoints.down('sm')]: {
//       paddingLeft: theme.spacing(2),
//       paddingRight: theme.spacing(2)
//     }
//   },
//   title: {
//     marginTop: theme.spacing(3)
//   },
//   socialButtons: {
//     marginTop: theme.spacing(3)
//   },
//   socialIcon: {
//     marginRight: theme.spacing(1)
//   },
//   sugestion: {
//     marginTop: theme.spacing(2)
//   },
//   textField: {
//     marginTop: theme.spacing(2)
//   },
//   signInButton: {
//     margin: theme.spacing(2, 0)
//   }
// }));

// const SignIn = props => {
//   const { history } = props;

//   const classes = useStyles();

//   const [formState, setFormState] = useState({
//     isValid: false,
//     values: {},
//     touched: {},
//     errors: {}
//   });

//   useEffect(() => {
//     const errors = validate(formState.values, schema);

//     setFormState(formState => ({
//       ...formState,
//       isValid: errors ? false : true,
//       errors: errors || {}
//     }));
//   }, [formState.values]);

//   const handleBack = () => {
//     history.goBack();
//   };

//   const handleChange = event => {
//     event.persist();

//     setFormState(formState => ({
//       ...formState,
//       values: {
//         ...formState.values,
//         [event.target.name]:
//           event.target.type === 'checkbox'
//             ? event.target.checked
//             : event.target.value
//       },
//       touched: {
//         ...formState.touched,
//         [event.target.name]: true
//       }
//     }));
//   };

//   const handleSignIn = event => {
//     event.preventDefault();
//     history.push('/');
//   };

//   const hasError = field =>
//     formState.touched[field] && formState.errors[field] ? true : false;

//   return (
//     <div className={classes.root}>
//       <Grid
//         className={classes.grid}
//         container
//       >
//         <Grid
//           className={classes.quoteContainer}
//           item
//           lg={5}
//         >
//           <div className={classes.quote}>
//             <div className={classes.quoteInner}>
//               <Typography
//                 className={classes.quoteText}
//                 variant="h1"
//               >
//                 Your destination for the Animal Crossing community. 
//               </Typography>
//               <div className={classes.person}>
//                 <Typography
//                   className={classes.name}
//                   variant="body1"
//                 >
//                   Add friends, set prices, trade, and more!
//                 </Typography>
//               </div>
//             </div>
//           </div>
//         </Grid>
//         <Grid
//           className={classes.content}
//           item
//           lg={7}
//           xs={12}
//         >
//           <div className={classes.content}>
//             <div className={classes.contentHeader}>
//               <IconButton onClick={handleBack}>
//                 <ArrowBackIcon />
//               </IconButton>
//             </div>
//             <div className={classes.contentBody}>
//               <form
//                 className={classes.form}
//                 onSubmit={handleSignIn}
//               >
//                 <Typography
//                   className={classes.title}
//                   variant="h2"
//                 >
//                   Sign in
//                 </Typography>
//                 <Typography
//                   color="textSecondary"
//                   gutterBottom
//                 >
//                   Sign in with social media
//                 </Typography>
//                 <Grid
//                   className={classes.socialButtons}
//                   container
//                   spacing={2}
//                 >
//                   <Grid item>
//                     <Button
//                       color="primary"
//                       onClick={handleSignIn}
//                       size="large"
//                       variant="contained"
//                     >
//                       <FacebookIcon className={classes.socialIcon} />
//                       Login with Facebook
//                     </Button>
//                   </Grid>
//                   <Grid item>
//                     <Button
//                       onClick={handleSignIn}
//                       size="large"
//                       variant="contained"
//                     >
//                       <GoogleIcon className={classes.socialIcon} />
//                       Login with Google
//                     </Button>
//                   </Grid>
//                 </Grid>
//                 <Typography
//                   align="center"
//                   className={classes.sugestion}
//                   color="textSecondary"
//                   variant="body1"
//                 >
//                   or login with email address
//                 </Typography>
//                 <TextField
//                   className={classes.textField}
//                   error={hasError('email')}
//                   fullWidth
//                   helperText={
//                     hasError('email') ? formState.errors.email[0] : null
//                   }
//                   label="Email address"
//                   name="email"
//                   onChange={handleChange}
//                   type="text"
//                   value={formState.values.email || ''}
//                   variant="outlined"
//                 />
//                 <TextField
//                   className={classes.textField}
//                   error={hasError('password')}
//                   fullWidth
//                   helperText={
//                     hasError('password') ? formState.errors.password[0] : null
//                   }
//                   label="Password"
//                   name="password"
//                   onChange={handleChange}
//                   type="password"
//                   value={formState.values.password || ''}
//                   variant="outlined"
//                 />
//                 <Button
//                   className={classes.signInButton}
//                   color="primary"
//                   disabled={!formState.isValid}
//                   fullWidth
//                   size="large"
//                   type="submit"
//                   variant="contained"
//                 >
//                   Sign in now
//                 </Button>
//                 <Typography
//                   color="textSecondary"
//                   variant="body1"
//                 >
//                   Don't have an account?{' '}
//                   <Link
//                     component={RouterLink}
//                     to="/sign-up"
//                     variant="h6"
//                   >
//                     Sign up
//                   </Link>
//                 </Typography>
//               </form>
//             </div>
//           </div>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// SignIn.propTypes = {
//   history: PropTypes.object
// };

// export default withRouter(SignIn);

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard"); // push user to dashboard when they login
    }
if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
onSubmit = e => {
    e.preventDefault();
const userData = {
      email: this.state.email,
      password: this.state.password
    };
this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };
render() {
    const { errors } = this.state;
return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/sign-up">Register</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                />
                <label htmlFor="email">Email</label>
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />
                <label htmlFor="password">Password</label>
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
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
)(Login);