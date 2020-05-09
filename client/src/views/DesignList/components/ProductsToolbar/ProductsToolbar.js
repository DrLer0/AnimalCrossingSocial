import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../../../actions/postActions'
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

const ProductsToolbar = ({ addPost }) => {
  // const { className, ...rest } = props;
  const [title, setText] = useState("");

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
      <form className={classes.form} onSubmit={e => {
        e.preventDefault();
        addPost({ title });
        setText("");
        handleClose();
      }}>
      <TextField
        className={classes.textField}
        // error={hasError('password')}
        fullWidth
        // helperText={
        //   hasError('password') ? formState.errors.password[0] : null
        // }
        label="Design Title"
        name="title"
        onChange={e => setText(e.target.value)}
        type="text"
        value={title}
        variant="outlined"
      />
        {/* <input></input>
        <input></input> */}
        <Button
          className={classes.addButton}
          color="primary"
          // disabled={!formState.isValid}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Add
        </Button>
      </form>
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
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(ProductsToolbar);