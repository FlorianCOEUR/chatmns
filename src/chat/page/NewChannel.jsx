
import toast from "react-hot-toast";
import useAuth from "../../context/useAuth";
import { api } from "../../lib/api";
import ChannelForm from "../components/channel/ChannelForm";
import HeaderPge from "../components/HeaderPge";
import useSendMessage from "../../utils/sendMessage";
import { useNavigate } from "react-router";


export default function NewChannel() {
    const auth=useAuth();
    const sendMessage=useSendMessage();
    const navigate=useNavigate();
    const createChannel=(info)=>{
        if(info.participants.length===1){
            if(!confirm("Voulez vous créer un groupe sans participants ?")){
                return;
            }
        }
        const formData=new FormData();
        formData.append("name", info.name);
        formData.append("avatar", info.avatar);
        formData.append("participants", JSON.stringify(info.participants));
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
            sendMessage(data.id_conv, info.message, info.participants);
            navigate('/'+data.id_conv)
        })
        .catch(err=>{
            console.error(err);
            toast.error("Erreur lors de la création du groupe");
        });
    }
    return (
        <div className="container">
            <HeaderPge title="Créer votre Groupe de discussion" />
            <ChannelForm onSubmit={createChannel}/>
        </div>
    );
}