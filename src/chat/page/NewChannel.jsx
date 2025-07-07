import ChannelForm from "../components/ChannelForm";
import HeaderPge from "../components/HeaderPge";


export default function NewChannel() {
    return (
        <div className="container">
            <HeaderPge title="Créer votre Groupe de discussion" />
            <ChannelForm />
        </div>
    );
}