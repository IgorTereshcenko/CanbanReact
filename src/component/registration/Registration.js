import { useState } from 'react';
import './registration.scss';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import arrowImg from '../../resurses/eva_arrow-ios-back-outline.svg';
import { Link } from 'react-router-dom';

const Registration = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState('');
    
    const emailPasswordReg = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;      
        })
            .catch((error) => {
                const errorMessage = error.message;
                setValidPassword(errorMessage);
        })
       
    }
    
    return (
        <div className="reg">
            <div className="reg__wrapper">
                    <div className="reg__title">Регистрация</div>
                    <Link to='/' className='reg__back'>
                        <img src={arrowImg} alt="arrow" />
                    </Link>
                    <div className="reg__inputWrapper">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            className="reg__email"
                            id='email'
                            required
                            value={email}
                            onChange = {e => setEmail(e.target.value)} />
                        <label htmlFor="password">Пароль</label>
                        <input 
                            type="password"
                            className='reg__password'
                            id='password'
                            required
                            value={password}
                            onChange = {e => setPassword(e.target.value)}
                            />
                            {validPassword ? <span>{validPassword.substring(9,50)}</span> : null}
                    </div>
                    <button 
                        onClick={emailPasswordReg} 
                        className="reg__signIn">
                            ЗАРЕГИСТРИРОВАТЬСЯ
                    </button>
            </div>
        </div>
    )
}

export default Registration;