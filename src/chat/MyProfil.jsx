import { useState } from 'react';
import HeaderPge from './components/HeaderPge';
import classes from './window.module.css';
import ProfilForm from './components/ProfilForm';

export default function MyProfil(){
 
    return(
        <div className="container">
            <HeaderPge title="Profil" />
            <ProfilForm />

        </div>
    )
}