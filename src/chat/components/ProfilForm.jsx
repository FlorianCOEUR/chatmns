import { use, useState } from "react";
import classes from "./../search.module.css";
import useAuth from "../../context/useAuth";
import AvatarInput from "./AvatarInput";
import Role from "./role/Role";
import toast from "react-hot-toast";
import { api } from "../../lib/api";


export default function ProfilForm(){
    //définition des infos utilisateur
    const {data} = useAuth();
    const [user, setUser]=useState(data.user);
    const avatar = data.user.avatar;
    const [avatarPreview, setAvatarPreview]=useState(null);
    const [isChanged, setIsChanged]=useState(false);
    const auth=useAuth();
    const handleSubmitForm=(e)=>{
        e.preventDefault();
        console.log(avatar);
        const formData = new FormData();
        formData.append("bio", user.bio);
        formData.append("away", user.away);
        if(avatarPreview){
            formData.append('avatar', avatarPreview);
            formData.append('avatar',avatar);
        }
        toast.promise(
            fetch(api+"user/update.php",{
                headers:{
                    "Authorization":`Bearer ${auth.data.jwt}`
                },
                method:'POST',
                body:formData
            })
            .then(async res=>{
                const data=await res.json();
                if(!res.ok){
                    throw new Error(data.message || "Une erreur est survenue");
                }
                return data;
            }),
        {
            loading:"mise à jour en cours...",
            success: (data) => {
                console.log(data);
                auth.setData({
                    user:{...user, bio:user.bio, away:user.away, avatar:data.avatar},
                    jwt:auth.data.jwt
                })
                setIsChanged(false);
                return "Mise à jour réussie";
            },
            error: (err) => {
                console.error(err);
                return "Une erreur est survenue lors de la mise à jour";
            }
        }
        )
        
    }
    return (
        <form className={classes.form} onSubmit={(e)=>{handleSubmitForm(e)}}>
            <AvatarInput avatar={avatar} avatarPreview={avatarPreview} setAvatar={(avatar)=>{
                setAvatarPreview(avatar);
                setIsChanged(true);
            }}
            name={`${user.name} ${user.firstname}`} />
            <Role nom={user.role} />
            <div>
                <label htmlFor="username">Nom d'utilisateur : </label>
                <input type="text" id="username" value={`${user.name} ${user.firstname}`} disabled />
            </div>
            <div>
                <label htmlFor="email">Email : </label>
                <input type="email" id="email" value={user.email} disabled />
            </div>
            <div>
                <label htmlFor="bio">Bio : </label>
                <textarea id="bio" value={user.bio} onChange={(e)=>{
                    setUser({...user, bio:e.target.value});
                    setIsChanged(true);
                }} />
            </div>
            <div>
                <label >Message d'absence</label>
                <textarea value={user.away} onChange={(e)=>{
                    setUser({...user, away:e.target.value});
                    setIsChanged(true);
                }} />
            </div>
            {isChanged && <button className="button" type='submit'>Mettre à jour</button>}
        </form>
    )
}