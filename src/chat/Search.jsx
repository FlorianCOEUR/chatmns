import { use, useEffect, useState } from "react"
import { api } from "../lib/api";
import useAuth from "../context/useAuth";
import Loading from "./components/Loading";
import User from "./components/User";
import classes from './search.module.css'
import HeaderPge from "./components/HeaderPge";
import SearchUserForm from "./components/SearchUserForm";

export default function Search(){
    const [users, setUsers]=useState(null);
    const auth=useAuth();
    return(
        <div className="container">
            <HeaderPge title="Rechercher des utilisateurs" />
            <SearchUserForm setUsers={setUsers} isForm={true} />

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