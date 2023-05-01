import "./chat.css";
import { useState, useEffect, useRef } from "react";

const Messages = ({socket}) => {
    const [messageReceived, setMessagesReceived] = useState([]);

    const messageColumnRef = useRef(null);

    //Runs whenever a socket even is received from the server
    useEffect(() => {
      socket.on("receive_message", (data) => {
        console.log(data);
        setMessagesReceived((state) => [
          ...state,
          {
            message: data.message,
            username: data.username,
            __createdtime__: data.__createdtime__,
          },
        ]);
      });

      //unsubscribe from event listener when component unmounted
      return () => socket.off("receive_message");
    },[socket]);

    useEffect(() => {
        //Last 100 messages sent in the chat room fetched from the DB in the backend
        socket.on('last_100_messages', (last100messages) => {
            console.log("Last 100 messages", JSON.parse(last100messages));
            last100messages = JSON.parse(last100messages);
            setMessagesReceived((state) => [...last100messages, ...state]);
        });

        return () => socket.off('last_100_messages');
        
    }, [socket]);

    //Scroll to the most recent message
    useEffect(() => {
        messageColumnRef.current.scrollTop = messageColumnRef.current.scrollHeight;
    },[messageReceived]);
    
    //sort messages based on date
    function sortMessagesByDate(messages){
        return messages.sort(
            (a,b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
        );
    }

    // dd/mm/yyyy, hh:mm:ss
    function formatDateFromTImeStamp(timestamp){
        const date = new Date(timestamp);
        return date.toLocaleString();
    }


    return (
        <div className="messagesColumn" ref={messageColumnRef}>
            {messageReceived.map((msg, i) => (
                <div className="message" key={i}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <span className="msgMeta">{msg.username}</span>
                        <span className="msgMeta">{formatDateFromTImeStamp(msg.__createdtime__)}</span>
                    </div>
                    <p className="msgText">{msg.message}</p>
                    <br />
                </div>
            ))}
        </div>
    )
        
};

export default Messages;
