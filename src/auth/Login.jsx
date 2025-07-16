import { useState, useEffect } from 'react';
import classes from './auth.module.css'; 
import HeaderLogin from './HeaderLogin';
import toast from 'react-hot-toast';
import useAuth from '../context/useAuth';
import { Navigate, useNavigate } from 'react-router';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const context=useAuth();
  const navigate=useNavigate('/');
  const submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    console.log(formData.get('email'),formData.get('password'))
    const api=import.meta.env.VITE_API_URL;
    toast.promise(
      fetch(api+'user/login.php',{
        method:'POST',
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
        loading:"Connexion en cours",
        success:(res)=>{
          context.setData(res);
          navigate('/');
          return "Connexion réussie";
        },
        error: (err)=>{
            return err.message;
        }
      }
    )
  };
  if(context.isAuth){
    return(
      <Navigate to='/' replace />
    )
  }
  return (
    <>
      <div className={classes.login}>
        <div>
          <h2>Connexion</h2>
          <p>Veuillez entrer vos identifiants pour vous connecter.</p>
        </div>
        <form onSubmit={submit}>
          <label htmlFor="email">Entrez votre Email*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <label htmlFor="password"> Mot de Passe*</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            required
          />
          <button className={classes.button} type="submit">Connexion</button>
        </form>
      </div>
    </>
  );
}
