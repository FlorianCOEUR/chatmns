import { useState } from "react";
import { ConvContext } from "./ConvContext";



export default function ConvProvider({children}){

  const [messages, setMessages]=useState([]);
  const [conv, setConv]=useState(null);

    const value={
        messages:messages,
        setMessages:setMessages,
        conv:conv,
        setConv:setConv
    }

    return (
        <ConvContext.Provider value={value}>
            {children}
        </ConvContext.Provider>
    )
}
// export default ConvContext.Provider;