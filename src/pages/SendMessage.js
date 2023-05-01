import "./chat.css";
import { useState } from "react";

const SendMessage = ({socket, username, room}) => {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if(message !== ''){
            const __createdtime__ = Date.now();
            //Send message to server. We can't specify who we send the message to the server from the frontend. Our server can then send the message to the rest of the users.
            socket.emit('send_message', {username, room, message, __createdtime__});
            setMessage('');
        }
    }
    
    return(
        <div className="sendMessageContainer">
            <input 
                className="messageInput"
                placeholder="Message..."
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            <button className="btn btn-primary" onClick={sendMessage}>
                Send Message
            </button>
        </div>
    )

};

export default SendMessage;
