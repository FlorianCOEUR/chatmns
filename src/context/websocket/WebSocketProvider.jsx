import React, { useEffect, useRef, useState } from "react";
import { WebSocketContext } from "./WebSocketContext";
import useConv from "../conv/useConv";
import useListConv from "../listConv/useListConv";

export default function WebSocketProvider({ token, children }){
  const socketRef = useRef(null);
  const {mps, updateListConv,updateMpsStatus}=useListConv();
  const {messages, setMessages, conv, setConv} = useConv();
  const convRef=useRef(conv);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(()=>{
    convRef.current=conv;
  }, [conv]);
  useEffect(() => {
    if (!token) return;

    const socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "auth", token }));
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        switch (data.type) {
        case "auth_response":
            setIsAuthenticated(data.success);
            if (!data.success) socket.close();
            break;

        case "message":
            if(data.message){
              updateListConv(data.message);
              if(convRef.current.id==data.message.id_conv){
                setMessages((prev) => [...prev, data.message]);
              }
            }
            break;
        case "status_update" : 
            updateMpsStatus(data.id_user, data.status);
            break;
        default:
            console.warn("Type de message inconnu:", data);
        }
    };

    socket.onclose = () => {
      setIsAuthenticated(false);
      console.log("Socket fermé");
    };

    return () => {
      socket.close();
    };
  }, [token]);

  const sendMessage = (content) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: "message", content }));
    }
  };
  const sendStatus = (status)=>{
    if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: "status", name: status }));
    }
  }
  const value = {
    isAuthenticated,
    messages,
    sendMessage,
    sendStatus
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
