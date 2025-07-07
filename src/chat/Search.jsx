import { use, useEffect, useState } from "react"
import { api } from "../lib/api";
import useAuth from "../context/useAuth";
import Loading from "./components/Loading";
import User from "./components/User";
import classes from './search.module.css'
import { useNavigate } from "react-router";
import HeaderPge from "./components/HeaderPge";

export default function Search(){
    const [roles, setRoles]=useState(null);
    const [users, setUsers]=useState(null);
    const [searchUser, setSearchUser]=useState(null);
    const [searchRole, setSearchRole]=useState(null);
    const navigate=useNavigate();
    const auth=useAuth();
    useEffect(()=>{
        fetch(api+'role/roles.php',{
            headers: {
                'Authorization': `Bearer ${auth.data.jwt}`
            },
        })
        .then(response=>response.json())
        .then(data=>{
            setRoles(data);
        });
    },[]);
    const handleSubmitFrom=(e)=>{
        const formData=new FormData();
        e.preventDefault();
        if(searchUser && searchUser.trim()!==""){
            const input=searchUser.split(' ');
            formData.append("inputs", JSON.stringify(input));
        }
        if(searchRole){
            formData.append("role", searchRole);
        }
        fetch(api+'user/users.php',{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${auth.data.jwt}`
            },
            body:formData
        })
        .then(response=>response.json())
        .then(data=>{
            setUsers(data);
        })
    }
    if(!roles){
        return <Loading />
    }
    return(
        <div className="container">
            <HeaderPge title="Rechercher des utilisateurs" />
            <form className={classes.form} onSubmit={(e)=>handleSubmitFrom(e)}>
                <label htmlFor="searchUser">Nom d'utilisateur : </label>
                <input type="text" id="searchUser" onChange={e=>setSearchUser(e.target.value)}/>
                <fieldset >
                    <legend>Rôles : </legend>
                    <div className={classes.roles}>
                        {roles.filter(role=>role)
                        .map(role=>(
                            <div key={role.id_role} >
                                <input type="radio"
                                value={String(role.id_role)}
                                checked={searchRole===String(role.id_role)}
                                onChange={e=>setSearchRole(e.target.value)} />
                                <label>{role.role_nom}</label>
                            </div>
                        ))}
                    </div>
                </fieldset>
                <button className="button" type="submit">Rechercher</button>
            </form>
            <ul className={classes.users}>
                {(!users)? <p>Faire votre recherche!</p> : (
                <>
                    {(users.length===0) && <p>Aucun utilisateur trouvé</p>}
                    {users.map(user=>(
                        <User key={user.id_users} user={user} />
                    ))}
                </>
                )}
            </ul>
        </div>
    )
}