import { useState } from 'react';
import classes from './infouser.module.css';
import SharedChannel from './SharedChannel';


export default function SharedChannels({channels}){
    return(
        <fieldset className={classes.content}>
            <legend>Conversations en commun : </legend>
            {(!channels || channels.length===0) ? 
                (<p>Aucun Channel en commun ! </p>) : 
                <>
                    {channels.map(channel=>(
                        <SharedChannel key={channel.id} channel={channel} />
                    ))}
                </>
            }
        </fieldset>
    )
}