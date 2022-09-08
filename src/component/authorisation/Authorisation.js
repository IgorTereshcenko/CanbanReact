import './authorisation.scss';
import { GithubAuthProvider, signInWithRedirect, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import googleImg from '../../resurses/flat-color-icons_google.svg';
import gitHubImg from '../../resurses/github-icon.svg';

const Authorisation = () => {

    const gitHubprovider = new GithubAuthProvider();
    const googleProvider = new GoogleAuthProvider();

    const signGithub = () => {
        signInWithRedirect(auth, gitHubprovider)
            .then(result => {
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            })
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const emailPasswordSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setError(true);
            });
    }

    const googleSignIn = async () => {
        const {user} = await signInWithPopup(auth, googleProvider)
    }

    return (
        <div className="auth">
            <div className="auth__wrapper">
                <h1 className="auth__title">Авторизация</h1>
                
                <div className="auth__inputWrapper">
                    <label htmlFor="email">Адрес электронной почты</label>
                    <input 
                        type="email" 
                        className="auth__email"
                        id='email'
                        required
                        value={email}
                        onChange = {e => setEmail(e.target.value)} />
                    <label htmlFor="password">Пароль</label>
                    <input 
                        type="password"
                        className='auth__password'
                        id='password'
                        required
                        value={password}
                        onChange = {e => setPassword(e.target.value)} />
                        {error ? <h4 className='auth__error'>Логин или пароль введены не верно</h4> : null}
                    <button onClick={emailPasswordSignIn} className="auth__signIn">Войти</button>
                </div>

                <div className="auth__orReg">
                    <button onClick={signGithub} className="auth__github">
                        <img src={gitHubImg} alt="gitHub" />
                        Войти с помощью Github
                    </button>
                    <button onClick={googleSignIn} className="auth__google">
                        <img src={googleImg} alt="google" />
                        Войти с помощью Google
                    </button>
                </div>

                <Link to='/registration' className='auth__reg'>Не зарегистрированы? Регистрация</Link>
            </div>
        </div>
    )
}

export default Authorisation;