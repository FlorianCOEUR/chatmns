import { Route, Routes } from "react-router";
import Login from "./auth/Login";
import Chat from "./chat/chat";
import Window from "./chat/window.jsx";
import NewConvPrivee from "./chat/NewConvPrivee.jsx";
import NewChannel from "./chat/page/NewChannel.jsx";
import Search from "./chat/Search.jsx";
import MyProfil from "./chat/MyProfil.jsx";
import Profil from "./chat/page/Profil.jsx";
import UpdateChannel from "./chat/page/UpdateChannel.jsx";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Chat />}>
        <Route path=":id" element={<Window />} />
        <Route path="profil" element={<MyProfil />} />
        <Route path="profil/:id" element={<Profil />} />
        <Route path="search" element={<Search />} />
        <Route path="newConvPrivee" element={<NewConvPrivee />} />
        <Route path="channels/new" element={<NewChannel />} />
        <Route path="channels/update/:id" element={<UpdateChannel />}/>
      </Route>
    </Routes>
  );
}