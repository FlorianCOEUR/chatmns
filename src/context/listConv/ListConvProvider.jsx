import { useEffect, useState } from "react"
import useAuth from "../useAuth";
import { ListConvContext } from "./ListConvContext";
import { api } from "../../lib/api";



export default function ListConvProvider({children}){
    //récupération des channels
    const [channels, setChannels]=useState([]);
    const [reloadChannel, setReloadChannel]=useState(false);
    const auth=useAuth();
    useEffect(()=>{
        fetch(api + 'user/channels.php', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth.data.jwt}`
            },
        })
        .then(response=>response.json())
        .then((data)=>{
            setChannels(data);
        })
    },[reloadChannel])
    //Récupération de la liste des MP
    const [mps, setMps]=useState([]);
    const [reloadMps, setReloadMps]=useState(false)
    useEffect(()=>{
        fetch(api+'user/mps.php',{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${auth.data.jwt}`
            },
        })
        .then(response=>response.json())
        .then(data=>{
            setMps(data);
        });
    },[reloadMps]);


    function updateConversation(list, setList, newMessage, setReload){
        let newConv=false;
        setList((prevList)=>{
            const index=prevList
            .filter(conv=>conv)
            .findIndex(conv=> String(conv.id_conv) === String(newMessage.id_conv));
            let updatedConv;
            let newList=[...prevList];
            if(index!==-1){
                updatedConv={
                    ...newList[index],
                    message:newMessage.content,
                    heure:newMessage.hours,
                    m_date:newMessage.date,
                    nb_non_lus:newList[index].nb_non_lus+1
                }
                newList.splice(index, 1);
            }else{
                newConv=true;
            }
            return [updatedConv, ...newList];
        })
        if(newConv){
            setReload(prev=>{
                return !prev;
            });
        }
    }

    //MAJ des la liste des conversations
    const updateListConv=(newMessage)=>{
        switch(newMessage.type){
            case 1:
                updateConversation(mps, setMps, newMessage, setReloadMps);
                break;
            case 2:
                updateConversation(channels, setChannels, newMessage, setReloadChannel);
                break;

        }
    }
    //MAJ du status d'un mp
    function updateMpsStatus(id_user, statut){
        setMps(prev=>{
            const updateMps = prev.map(mp=>{
                if(!mp || !mp.id_user) return mp;
                return String(mp.id_user) === String(id_user) ? {...mp, id_statut:statut } : mp;
            })
            return updateMps;
        })
    }
    const readConv=(setList, id_conv)=>{
        setList((prevList)=>{
            const index=prevList
            .filter(conv=>conv)
            .findIndex(conv=>String(conv.id_conv)===String(id_conv));
            const newList=[...prevList];
            newList[index]={
                ...newList[index],
                nb_non_lus:0
            }
            return newList
        })
    }
    const readList=(id_conv, type)=>{
        switch(type){
            case 1:
                readConv(setMps, id_conv);
                break;
            case 2:
                readConv(setChannels, id_conv);
        }
    }
    const value={
        channels:channels,
        setChannels:setChannels,
        mps:mps,
        setMps:setMps,
        updateListConv:updateListConv,
        readList:readList,
        updateMpsStatus:updateMpsStatus
    }
    return(
        <ListConvContext.Provider value={value}>
            {children}
        </ListConvContext.Provider>
    )
}