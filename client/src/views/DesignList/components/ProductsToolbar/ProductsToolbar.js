import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost, addImage } from '../../../../actions/postActions'
import { getCurrentProfile } from "../../../../actions/profileActions";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Modal, TextField } from '@material-ui/core';

import { SearchInput } from 'components';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  textField: {
    marginTop: theme.spacing(2)
  },
  addButton: {
    margin: theme.spacing(2, 0)
  }
}));

const ProductsToolbar = ({ addPost, auth }) => {
  // const { className, ...rest } = props;
  // const [title, setText] = useState("");

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    twitterLink: '',
    image: ''
  });

  const {
    title,
    description,
    twitterLink,
    image
  } = formData;

  const extraParams = {
    name: auth.user.name,
    user: auth.user.id
  };

  // const { userData } = auth.user;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const classes = useStyles();

  //Modal
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>

      <form className="image-form" onSubmit={(e) => {
                    e.preventDefault();
                    addImage(e.target, extraParams);
                    handleClose();
                }}>
                    <div class="image-form__field">
                        <label>Design title:</label>
                        <input name="title" type="text" />
                    </div>
                    <div class="image-form__field">
                        <label>Description:</label>
                        <input name="description" type="text" />
                    </div>
                    <div class="image-form__field">
                        <label>Twitter link to code:</label>
                        <input name="twitterLink" type="text" />
                    </div>
                    <div class="image-form__field">
                        <label>Image:</label>
                        <input name="image" type="file" />
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="image-form__submit-button"
                    >
                        Upload
                    </Button>
                </form>

                {/* <p className={`image-form__message--${dashboard.state.message.type}`}>
                    {dashboard.state.message.body}
                </p> */}
    </div>
  );

  return (
    <div
      // {...rest}
      // className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button> */}
        <Button
          color="primary"
          variant="contained"
          onClick={handleOpen}
        >
          Add design
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search product"
        />
      </div>
    </div>
  );
};

ProductsToolbar.propTypes = {
  className: PropTypes.string,
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { addPost, getCurrentProfile })(ProductsToolbar);
