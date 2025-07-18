import { useNavigate, useParams } from 'react-router';
import classes from './window.module.css';
import useAuth from '../context/useAuth';
import { useEffect, useRef, useState } from 'react';
import { api } from '../lib/api';
import Loading from './components/Loading';
import ChatInput from './components/ChatInput';
import useConv from '../context/conv/useConv';
import useListConv from '../context/listConv/useListConv';
import ChatHeader from './components/ChatHeader';
import History from './components/History';

export default function Window(){
    const {id}= useParams();
    const context=useAuth();
    const {messages, setMessages, conv, setConv}=useConv();
    const {readList}=useListConv();
    useEffect(()=>{
        const formData=new FormData();
        formData.append('id', id);
        fetch(api+'conv/conv.php',{
            method:'POST',
            headers: {
                'Authorization': `Bearer ${context.data.jwt}`
            },
            body: formData
        })
        .then(async res=>{
            if(!res.ok){
                const errorData=await res.json();
                throw new Error(errorData.error || 'erreur Inconnue');
            }
            return res.json();
        })
        .then(data=>{
            const {messages, ...conv}=data;
            setConv(conv);
            setMessages(messages);
            readList(data.id, data.type);
        });
    },[id]);
    if(!conv || !messages) return <Loading/>
    return(
        <div className={classes.window} >
            <ChatHeader />
            <History />

            <ChatInput id={id}/>
        </div>
    )
}