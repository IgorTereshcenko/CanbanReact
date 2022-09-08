import './mainPage.scss';
import { auth } from '../../firebaseConfig';
import Header from '../header/Header';
import Columns from '../columns/Columns';

const MainPage = () => {

    return (
        <div className="mainPage">
            <div className="mainPage__header">
                <Header/>
            </div>
            <div className="mainPage__canvas">
                <Columns/>
            </div>
            {/* <button onClick={() => auth.signOut()} className="mainPage__signOut"></button>  */}
        </div>
    )
}

export default MainPage;