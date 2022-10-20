import './mainPage.scss';
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

        </div>
    )
}

export default MainPage;