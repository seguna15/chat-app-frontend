import './chat.css'
import  MessageReceived from './MessageReceived';
import SendMessage from './SendMessage';
import RoomAndUsers from './RoomAndUsers';
const Chat = ({socket, username, room}) => {
  return (
    <div className="chatContainer">
      <RoomAndUsers socket={socket} username={username} room={room}/>
      <div>
        <MessageReceived socket={socket} />
        <SendMessage socket={socket} username={username} room={room} />
      </div>
    </div>
  );
}

export default Chat;