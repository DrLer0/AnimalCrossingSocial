import React from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';

import 'stream-chat-react/dist/css/index.css';

// ----------------------------------------------------------
// move to server.js later when we start registering users/logging in
const chatClient = new StreamChat('uzy7f9qpss8w', 'g3v4w9qwmxr9epxfv28dakb3ywck8jx3jj7s4evh5hxzfjyuwzm2gqztvnjnxpzj');

// for production use userToken
// devToken for development
// const userToken = chatClient.createToken('john');
chatClient.setUser(
  {
      id: 'Jon',
      name: 'Jon D',
      image: 'https://getstream.io/random_svg/?name=John',
  },
  // userToken
  chatClient.devToken('Jon')
);
// or pass in chatClient from server.js using modules/export
// ----------------------------------------------------------

// Uncomment to sign in as a different user and comment out the one above
// ----------------------------------------------------------
// move to server.js later when we start registering users/logging in

// const chatClient = new StreamChat('r8s5seqdx9c4', '2j47qttc3uxpatpfmcy857zrrgd43rjjw4sawabancvjms6jpgemk5tts82hk38r');

// // for production use userToken
// // devToken for development
// // const userToken = chatClient.createToken('Some1');
// chatClient.setUser(
//   {
//       id: 'Some1',
//       name: 'Any One',
//       image: 'https://getstream.io/random_svg/?name=John',
//   },
//   // userToken
//   chatClient.devToken('Some1')
// );
// // or pass in chatClient from server.js using modules/export
// // ----------------------------------------------------------

// custom channel preview component
class MyChannelPreview extends React.Component {
  render() {
      const {setActiveChannel, channel} = this.props;
      const unreadCount = channel.countUnread();

      return (
      <div className="channel_preview">
        <a href="#" onClick={(e) => setActiveChannel(channel, e)}>
          {channel.data.name}
        </a>

        <span>
          Unread messages: {unreadCount}
        </span>
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

const filters = { type: 'messaging', members: { $in: ['winter-block-0'] } };
const sort = { last_message_at: -1 };
const channels = chatClient.queryChannels(filters, sort);

const ChatApp = () => (
  <Chat client={chatClient} theme={'messaging light'}>
    <ChannelList
      filters={filters}
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
);

export default ChatApp;