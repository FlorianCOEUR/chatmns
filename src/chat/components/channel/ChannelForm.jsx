import { useEffect, useState } from "react";
import SearchUserForm from "./../SearchUserForm";
import classes from "./channelform.module.css";
import useAuth from "../../../context/useAuth";
import UserListItem from "./UserListItem";
import AvatarInput from "../AvatarInput";


export default function ChannelForm({channel = null, update=false, onSubmit}) {
    const [name, setName]=useState(channel?.name || "");
    const [avatar, setAvatar]=useState(channel?.avatar);
    const [avatarPreview, setAvatarPreview]=useState(null);
    const [isChanged, setIsChanged]=useState(false);
    const [message, setMessage]=useState("");
    const [searchUsers, setSearchUsers]=useState([]);
    const auth=useAuth();
    const [participants, setParticipants]=useState(channel?.participants || [{id_user:auth.data.user.id}]);
    useEffect(() => {
        if (channel) {
            setName(channel.name || "");
            setAvatar(channel.avatar || null);
            setParticipants(
            channel.participants?.length ? channel.participants : [{ id_user: auth.data.user.id }]
            );
        }
    }, [channel, auth.data.user.id]);
    useEffect(()=>{
        const initialName=channel?.name || "";
        // Trasnformation de participants en liste d'id
        const originalParticipants = (channel?.participants || [{ id_user: auth.data.user.id }])
            .map(u => String(u.id_user))
            .sort()
            .join(",");

        const currentParticipants = participants
            .map(u => String(u.id_user))
            .sort()
            .join(",");
        const nameChanged = name !== initialName;
        const avatarChanged = avatarPreview !== null;
        const participantsChanged = currentParticipants !== originalParticipants;

        const hasChanges = nameChanged || avatarChanged || participantsChanged;

        setIsChanged(hasChanges);
    },[name, avatarPreview, participants]);

    const deleteParticipant=(id)=>{
        const index=participants.findIndex((user)=>String(user.id_user)===String(id));
        if(index!==-1){
            setIsChanged(true);
            setParticipants(participants.filter((user)=>String(user.id_user)!==String(id)));
        }
    }
    const addParticipant = (id) => {
        //test si l'utilisateur est deja dans les participants
        if (participants.some(user => String(user.id_user) === String(id))) return;

        const userToAdd = searchUsers.find(user => String(user.id_user) === String(id));
        if (userToAdd) {
            setParticipants([...participants, userToAdd]);
        }
    };
    return (
        <>
            <form className={classes.form} onSubmit={(e)=>{
                e.preventDefault();
                onSubmit({
                    name,
                    avatar:avatarPreview,
                    message,
                    participants,
                    isChanged
                })
            }}>
                <div>
                    <label>Nom de votre conversation</label>
                    <input type="text"
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}
                    id="name"
                    required
                />
                </div>
                <AvatarInput
                    avatar={avatar}
                    avatarPreview={avatarPreview}
                    setAvatar={(avatar)=>{
                        setAvatarPreview(avatar);
                    }}
                    name={name}
                />  
                
                {(!update) && (
                    <div>
                        <label htmlFor="message">Message de bienvenue : </label>
                        <input
                        type="text"
                        onChange={(e)=>{
                            setMessage(e.target.value)
                        }}
                        id="message"
                        required
                    />
                    </div>
                )}
                
                <fieldset>
                    <legend>Ajout d'utilisateurs</legend>
                        {(participants.length>0) &&
                        <ul className={classes.ul}>
                            {participants.filter((user)=>(String(user.id_user)!==String(auth.data.user.id)))
                            .map((user)=>{
                                return(
                                    <UserListItem key={user.id_user} onClick={deleteParticipant} user={user} action="delete" />
                                )
                            })}
                        </ul>

                        }
                    <SearchUserForm setUsers={setSearchUsers} isForm={false} />
                    {(searchUsers.length>0) && (
                        <ul className={classes.ul}>
                            {searchUsers
                                .filter(user => !participants.some(p => p.id_user === user.id_user))
                                .map((user)=>(
                                    <UserListItem key={user.id_user} onClick={addParticipant} user={user} />
                            ))}
                        </ul>
                    )}
                </fieldset>
                    <div><button className={`button ${!isChanged ? classes.disabled : ''}`} type="submit" disabled={!isChanged} >{(update) ? 'Mettre à jour' : 'Créer un canal'}</button></div>
            </form>
        </>
    )

}