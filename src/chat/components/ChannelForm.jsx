import { useState } from "react";
import verifAvatar from "../../utils/verifAvatar";
import SearchUserForm from "./SearchUserForm";
import classes from "./channelform.module.css";
import toast from "react-hot-toast";
import FaXMark from "./icon/FAxMark";
import FaPlus from "./icon/FaPlus";
import { api } from "../../lib/api";
import useAuth from "../../context/useAuth";
import sendMessage from "../../utils/sendMessage";
import useSendMessage from "../../utils/sendMessage";
import { useNavigate } from "react-router";


export default function ChannelForm() {
    const [name, setName]=useState("");
    const [avatar, setAvatar]=useState(null);
    const [message, setMessage]=useState("");
    const [searchUsers, setSearchUsers]=useState([]);
    const auth=useAuth();
    const [participants, setparticipants]=useState([{id_users:auth.data.user.id}]);
    const sendMessage= useSendMessage();
    const navigate=useNavigate();
    const handleSubmitForm= (e)=>{
        e.preventDefault();
        if(participants.length===1){
            if(!confirm("Voulez vous créer un groupe sans participants ?")){
                return;
            }
        }
        console.log("création d'un groupe")
        const formData=new FormData();
        formData.append("name", name);
        formData.append("avatar", avatar);
        formData.append("participants", JSON.stringify(participants));
        fetch(api+"conv/create.php",{
            method: "POST",
            headers:{
                Authorization: `Bearer ${auth.data.jwt}`,
            },
            body: formData
        })
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            toast.success("Groupe créé avec succès");
            sendMessage(data.id_conv, message, participants);
            navigate('/'+data.id_conv)
        })
        .catch(err=>{
            console.error(err);
            toast.error("Erreur lors de la création du groupe");
        });
    }
    const deleteParticipants=(id)=>{
        const index=participants.findIndex((user)=>String(user.id_users)===String(id));
        if(index!==-1){
            setSearchUsers([...searchUsers, participants[index]]);
            setparticipants(participants.filter((user)=>String(user.id_users)!==String(id)));
        }
    }
    const addParticipant=(id)=>{
        const index=searchUsers.findIndex((user)=>String(user.id_users)===String(id))
        if(index!==-1){
            setparticipants([...participants, searchUsers[index]]);
            setSearchUsers(searchUsers.filter((user)=>String(user.id_users)!==String(id)));
        }
    }
    console.log(participants);
    console.log(auth.data.user.id);
    return (
        <>
            <form className={classes.form} onSubmit={(e)=>{handleSubmitForm(e)}}>
                <div>
                    <label>Nom de votre conversation</label>
                    <input type="text" onChange={(e)=>setName(e.target.value)} id="name" required />
                </div>
                <div style={{margin:'auto'}}>
                    <label htmlFor="avatar">
                    <img
                        src={verifAvatar(avatar)}
                        alt={`Avatar de la conversation : ${name}`}
                        className="avatar"
                        style={{ cursor: 'pointer' }}
                    />
                    </label>

                    <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={(e) => setAvatar(e.target.files[0])}
                    style={{ display: 'none' }}
                    />
                </div>
                <div>
                    <label htmlFor="message">Message de bienvenue : </label>
                    <input type="text" onChange={(e)=>setMessage(e.target.value)} id="message" required />
                </div>
                <fieldset>
                    <legend>Ajout d'utilisateurs</legend>
                        {(participants.length>0) &&
                        <ul className={classes.ul}>
                            {participants.filter((user)=>String(user.id_users)!==String(auth.data.user.id))
                            .map((user)=>{
                                return(
                                    <li key={user.id}>
                                        <p>{user.user_nom+" "+user.user_prenom}</p>
                                        <FaXMark className="fa-orange" onClick={()=>{
                                            deleteParticipants(user.id_users);
                                        }} />
                                    </li>
                                )
                            })}
                        </ul>

                        }
                    <SearchUserForm setUsers={setSearchUsers} isForm={false} />
                    {(searchUsers.length>0) && (
                        <ul className={classes.ul}>
                            {searchUsers.map((user)=>(
                                <li key={user.id}>
                                    <p>{user.user_nom+" "+user.user_prenom}</p>
                                    <FaPlus className="fa-orange" onClick={()=>addParticipant(user.id_users)} />
                                </li>
                            ))}
                        </ul>
                    )}
                </fieldset>
                    <div><button className="button" type="submit">Créer un canal</button></div>
            </form>
        </>
    )

}