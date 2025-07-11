import Menu from "./Menu";
import classes from "./chat.module.css";
import { Navigate, Outlet, useNavigate } from "react-router";
import ConvProvider from './../context/conv/ConvProvider.jsx';
import useAuth from "../context/useAuth";
import WebSocketProvider from './../context/websocket/WebSocketProvider.jsx';
import { useState } from "react";
import ListConvProvider from "../context/listConv/ListConvProvider.jsx";

export default function Chat() {
  const context=useAuth();
  const [messages, setMessages]=useState([]);
  const [conv, setConv]=useState(null);
  if(!context.isAuth){
    return (
      <Navigate to='/login' replace />
    )
  }

  return (
    <ListConvProvider>
      <ConvProvider value={{messages:messages, setMessages:setMessages, conv:conv, setConv:setConv}} >
        <WebSocketProvider token={context.data.jwt}>
          <div className={classes.chat}>
              <Menu />
              <Outlet />
          </div>
        </WebSocketProvider>
      </ConvProvider>
    </ListConvProvider>
  );
}
