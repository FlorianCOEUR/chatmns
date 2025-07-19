import Menu from "./Menu";
import classes from "./chat.module.css";
import { Navigate, Outlet, useNavigate } from "react-router";
import ConvProvider from './../context/conv/ConvProvider.jsx';
import useAuth from "../context/useAuth";
import WebSocketProvider from './../context/websocket/WebSocketProvider.jsx';
import { useState } from "react";
import ListConvProvider from "../context/listConv/ListConvProvider.jsx";
import { Helmet } from "react-helmet";


export default function Chat() {
  const context=useAuth();
  if(!context.isAuth){
    return (
      <Navigate to='/auth/' replace />
    )
  }

  return (
    <ListConvProvider>
      <ConvProvider >
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
