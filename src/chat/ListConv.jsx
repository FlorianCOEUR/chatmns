import Channels from "./components/Channels";
import MessagesPrivees from "./components/MessagesPrives";

export default function ListConv(){
    return(
        <div className="list">
            <Channels/>
            <MessagesPrivees />
        </div>
    )
}