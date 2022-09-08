import Authorisation from "./component/authorisation/Authorisation";
import { auth } from "./firebaseConfig";
import {useAuthState} from "react-firebase-hooks/auth";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MainPage from "./component/mainPage/MainPage";
import Registration from "./component/registration/Registration";

const App = () => {

    const [user] = useAuthState(auth);

    return (
        <Router>
            <Routes>
                <Route path="/" element={user ? <MainPage /> : <Authorisation />} />
                <Route path="/registration" element = {user ? <MainPage/> : <Registration/>} />
            </Routes>
     </Router>
    )
}

export default App;