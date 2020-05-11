import React from 'react';
import { Link, unstable_StrictModeFade } from '@material-ui/core';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { makeStyles } from '@material-ui/styles';

import PropTypes from 'prop-types';
import { connect } from "react-redux";
import clsx from 'clsx';


import 'stream-chat-react/dist/css/index.css';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

// custom channel preview component
class MyChannelPreview extends React.Component {
  render() {
      const {setActiveChannel, channel} = this.props;
      let unreadCount = channel.countUnread();
      let unreadDiv;

      if(unreadCount > 0){
        unreadDiv = <span className="red-text"> - Unread: {unreadCount}</span>
      } else {
        unreadDiv = <span className="red-text"></span>
      }

      return (
      <div className="channel_preview">
        <a href="#" onClick={(e) => setActiveChannel(channel, e)}>
          {channel.data.name}
        </a>
        {unreadDiv}
      </div>
    );
  }
}

// a very minimalistic message component
class MyMessageComponent extends React.Component {
  render() {
    return <div><b>{this.props.message.user.name}</b> {this.props.message.text}</div>;
  }
}

const ChatApp = (props) => {
  const { className, ...rest } = props;
  console.log("+++++++++++++");
  console.log(props);
  console.log("+++++++++++++");

  const classes = useStyles();

  const { user } = props.auth;
  
  const chatClient = new StreamChat('uzy7f9qpss8w', 'g3v4w9qwmxr9epxfv28dakb3ywck8jx3jj7s4evh5hxzfjyuwzm2gqztvnjnxpzj');
  chatClient.setUser(
    {
        id: user.id,
        name: user.name.split(" ")[0],
        image: 'https://getstream.io/random_svg/?name='+user.name.split(" ")[0],
    },
    // userToken
    chatClient.devToken(user.id)
  );
  const filters = { type: 'messaging', members: { $in: [user.id] } };
  const sort = { last_message_at: -1 };
  const channels = chatClient.queryChannels(filters, sort);
  // members: { $in: ['winter-block-0'] }
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
  <Chat client={chatClient} theme={'messaging light'}>
    <ChannelList
      // filters={filters}
      channels={channels}
      sort={sort}
      Preview={MyChannelPreview}
    />
    <Channel Message={MyMessageComponent}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
  </div>
  )
};

ChatApp.propTypes = {
  className: PropTypes.string,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  test: "testChat"
});

export default connect(
  mapStateToProps
)(ChatApp);