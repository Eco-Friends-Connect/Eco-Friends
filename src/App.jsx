import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar/Navbar';
import Home from './pages/Home';
import About from './pages/AboutTheSite';
import VolunteerSearch from './pages/VolunteerSearch';
import OrganizationLogin from './pages/OrgLogin';
import LeaderBoard from './pages/LeaderBoard';
import UserPage from './pages/UserPage';
import EcoChat from './pages/Eco-Chat';
import AboutTheCreators from './pages/AboutTheCreators';
import SignupFormPage from './pages/SignupForm'; 
import NotFound from './pages/NotFound'; 
import SiteSponsors from './pages/SiteSponsors.jsx';
import Footer from './component/footer/Footer';
import UserOrOrgSelect from './pages/UserOrOrgPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/volunteersearch" element={<VolunteerSearch />} />
          <Route path="/orglogin" element={<OrganizationLogin />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/ecochat" element={<EcoChat />} />
          <Route path="/aboutthecreators" element={<AboutTheCreators />} />
          <Route path="/signup" element={<SignupFormPage />} /> 
          <Route path="/userororgselect" element={<UserOrOrgSelect />} /> 
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/sitesponsors" element={<SiteSponsors />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
