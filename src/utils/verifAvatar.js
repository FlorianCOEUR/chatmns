export default function verifAvatar(avatar){
    let img=import.meta.env.VITE_CHAT_MNS+'img/avatar/Avatar.png';
    if(avatar!=null){
        img='img/avatar/'+avatar;
    }
    return img;
}
