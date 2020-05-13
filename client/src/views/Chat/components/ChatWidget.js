import React, { useEffect, useState } from 'react';
import { Link, unstable_StrictModeFade } from '@material-ui/core';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import clsx from 'clsx';
import axios from "axios";

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
    const { setActiveChannel, channel } = this.props;
    let unreadCount = channel.countUnread();
    let unreadDiv;

    if (unreadCount > 0) {
      unreadDiv = <span className="red-text"> - Unread: {unreadCount}</span>;
    } else {
      unreadDiv = <span className="red-text"></span>;
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

let chatClient;

const ChatApp = (props) => {
  const { className, ...rest } = props;
  console.log("+++++++++++++");
  console.log(props);
  console.log("+++++++++++++");

  const classes = useStyles();

  const { user } = props.auth;
  const [channel, setChannel] = useState(undefined);
  const [filter, setFilter] = useState(undefined);
  const [sort, setSort] = useState(undefined);

  const setUser = async (userData) => {

    const response = await axios.get(`api/chatToken/get/${userData.id}`);
    console.log("----------");
    console.log(user.id);
    console.log("----------");

    chatClient = new StreamChat('vvj83ka3szt4', 'qmy8ps7sdze6d8jwb2ugxufyzm8y22aufh9933mbjzjvufwnpa52qrtmcb5weh7k');

    const userToken = response.data.token;

    chatClient.setUser(
      {
        id: userData.id,
        name: userData.name.split(" ")[0],
        image: 'https://getstream.io/random_svg/?name=' + userData.name.split(" ")[0],
      },
      userToken
    );
    const filters = { type: 'messaging', members: { $in: [user.id] } };
    const sorts = { last_message_at: -1 };

    const channels = await chatClient.queryChannels(filter, sort, {
      watch: true,
      state: true,
    });
    console.log(filters);
    console.log(sorts);
    console.log(channels);

    setChannel(channels[0]);
    setFilter(filters);
    setSort(sorts);
  };

  useEffect(() => {
    console.log(user);
    if (user) {
      setUser(user);
    }
  }, [user]);
  return channel ? (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Chat client={chatClient} theme={'messaging light'}>
        <ChannelList
          filters={filter}
          channels={channel}
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
  ) : (
      <p>Loading...</p>
    );
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