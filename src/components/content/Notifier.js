import React,{ useState } from 'react';
import SockJsClient from 'react-stomp';
import {getContents} from '../../redux/actions/contentActions';
import { connect } from 'react-redux';
import { UPDATE_CONTENT } from "../../redux/actions/types";
import { useDispatch } from 'react-redux'

const SOCKET_URL = 'http://localhost:8086/notify/';

const Notifier = () => {
      const [messages, setMessages] = useState([]);
      const dispatch = useDispatch();

      let onConnected = () => {
        console.log("Connected!!")
      }
    
      let onMessageReceived = (msg) => {
        debugger;
        console.log('New Message Received!!', msg);
        setMessages(messages.concat(msg));
        dispatch({
            type: UPDATE_CONTENT,
            payload: msg
        });
      }

    return (
        <div className="App">
            <>
                <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/group']}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={true}
                />
            </>
        </div>
    )
}

export default connect(null,{getContents})(Notifier);
