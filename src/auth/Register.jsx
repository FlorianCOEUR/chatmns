import { useRef, useState } from 'react';
import classes from './auth.module.css'; 
import { api } from '../lib/api';
import FormError from './component/Error';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';


export default function Register(){
    const [email, setEmail]=useState("");
    const [name, setName]=useState('');
    const [firstName, setFirstName]=useState("");
    const [password, setPassword]=useState("");
    const [check, setCheck]=useState("");
    const [emailValid, setEmailValid]=useState(true);
    const [passwordErrors, setPasswordErrors]=useState([]);
    const [checked, setChecked]=useState(true);
    const [nameReq, setNameReq]=useState(true);
    const [firstNameReq, setFirstNameReq]=useState(true);
    const navigate=useNavigate();
    const arrayRegEx=[
        [new RegExp("^.{8,}$","i"), "Au moins 8 caractères"],
        [new RegExp("(?=.*[a-z])"), "1 minuscule"],
        [new RegExp("(?=.*[A-Z])"), "1 MAJUSCULE"],
        [new RegExp("(?=.*[0-9])","i"), "1 chiffre"],
        [new RegExp("(?=.*[#!@$!%^+-\.])","i"), "1 caractère spécial"]
    ];
    const regExEmail = new RegExp("^[a-zA-Z0-9.\-_\+]+@[a-zA-Z0-9.\-]+[.]{1}[a-zA-Z0-9]{2,}$","i")
    const formRef=useRef();


    const submit=(e)=>{
        e.preventDefault();
        setNameReq(name!=="");
        setFirstNameReq(firstName!=="")
        const valid=regExEmail.test(email);
        setEmailValid(valid);
        const newErrors=[]
        arrayRegEx.forEach((regEx)=>{
            if(!regEx[0].test(password)){
                newErrors.push(regEx[1]);
            }
        })
        setPasswordErrors(newErrors);
        if(password!==check){
            setChecked(false);
            return;
        }
        if(newErrors.length>0 || !valid || name==="" || firstName===""){
            return;
        }
        const formData=new FormData(formRef.current);
        console.log(formData.getAll('email'))
        toast.promise(
            fetch(api+"user/signin.php",{
                method:"POST",
                body:formData
            })
            .then(async response=>{
                const data=await response.json();
                console.log(data.message)
                if(!response.ok){
                    throw new Error(data.message || "Une erreur est survenue");
                }
                return data;
            }),
            {
                loading:"Enregistrement en cours",
                success:(res)=>{
                    console.log(res);
                    navigate('/auth/login');
                    return "Enregistrement réussi";
                },
                error: (err)=>{
                    console.log(err);
                    return err.message;
                }
            }
        )

    }
    return(
        <div className={classes.login}>
        <div>
          <h2>Inscription</h2>
        </div>
        <form ref={formRef} onSubmit={(e)=>submit(e)}>
            <label htmlFor="name">Nom : </label>
            <input
                type="text"
                value={name}
                name="name"
                id="name"
                placeholder='Votre nom'
                onChange={(e)=>setName(e.target.value)}
                required
            />
            {(!nameReq)&& <FormError name='Nom obligatoire' />}
            <label htmlFor="firstname">Prénom : </label>
            <input
                type="text"
                value={firstName}
                name="firstname"
                id="firstname"
                placeholder='Votre prénom'
                onChange={(e)=>setFirstName(e.target.value)}
                required
            />
            {(!firstNameReq) && <FormError name='Prénom requis' />}
          <label htmlFor="email">Entrez votre Email*</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          {(!emailValid)&& <FormError name="Entrer un email Valide!" />}
          <label htmlFor="password"> Mot de Passe*</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
          {(passwordErrors.length>0) &&
          <ul>
            <span>Le mot de passe doit contenir : </span>
            {passwordErrors.map((error, index)=>(
                <FormError name={error} key={index}/>
            ))}
          </ul>}
          <label htmlFor="check"> Vérification du mot de passe</label>
          <input
            id="check"
            name="check"
            type="password"
            value={check}
            onChange={(e) => setCheck(e.target.value)}
            placeholder="Mot de passe"
            required
          />
          {(!checked)&& <FormError name="Les mots de passes sont différents" />}
          <button className={classes.button} type="submit">inscription</button>
        </form>
      </div>
    )
}