import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import ChatApp from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  content: {
    marginTop: theme.spacing(1)
  }
}));

const Chat = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <ChatApp/>
      </div>
    </div>
  );
};

export default Chat;
