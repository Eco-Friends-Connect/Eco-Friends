import { Link } from 'react-router-dom';

export default function NavBar(){
    return (
        <nav>
           <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/volunteersearch">Volunteer Search</Link></li>
                <li><Link to="/orglogin">Organization Login</Link></li>
                <li><Link to="/leaderboard">Leader Board</Link></li>
                <li><Link to="/userpage">User Page</Link></li>
                <li><Link to="/ecochat">Eco Chat</Link></li>
                <li><Link to="/aboutthecreators">About The Creators</Link></li>
            </ul>
        </nav>
    )

}