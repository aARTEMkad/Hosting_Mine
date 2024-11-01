import { Link, useNavigate } from "react-router-dom";

// CSS
import '../styles/menu-navbar.css'

export default function MenuNavBar({state}) {
    const navigate = useNavigate();

    function exitClick() {
        navigate('..');
    }

    return (
        <div className="navbar" >
                <ul>
                    <li>
                        <Link to="/main-server" state={state}>Home</Link>
                    </li>
                    <li>
                        <Link to="/server-setting" state={state}>Setting</Link>
                    </li>
                    <li>
                        <Link to="/server-logs" state={state}>Logs</Link>
                    </li>
                    <li>
                        <Link to="/file-manager-server" state={state}>File manager</Link>
                    </li>
                </ul>
                <button className="exit-button" onClick={exitClick}>Exit</button>
        </div>
    );
};