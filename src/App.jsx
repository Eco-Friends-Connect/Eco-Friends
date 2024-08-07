import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/navbar/Navbar';
import React from 'react';
import Home from './pages/home/Home';
import About from './pages/AboutTheSite';
import VolunteerSearch from './pages/VolunteerSearch';
import LeaderBoard from './pages/LeaderBoard';
import UserPage from './pages/UserPage';
import EcoChat from './pages/Eco-Chat';
import AboutTheCreators from './pages/AboutTheCreators';
import SignupFormPage from './pages/SignupForm'; 
import LoginPage from './pages/login-page/login-page.jsx';
import NotFound from './pages/NotFound'; 
import SiteSponsors from './pages/SiteSponsors.jsx';
import Footer from './component/footer/Footer';
import OrgDashboard from './pages/org-dashboard/org-dashboard.jsx';
import UserOrOrgSelect from './pages/userororgpage/UserOrOrgPage';
import BadgesPage from './pages/badges-page/badges-page.jsx';
import EventsPage from './pages/events-page/events-page.jsx';
import ProtectedRoute from './component/protected-route.jsx';
import { AuthProvider } from './component/auth-context.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/volunteersearch" element={<VolunteerSearch />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/userpage" element={<UserPage />} />
            <Route path="/ecochat" element={<EcoChat />} />
            <Route path="/aboutthecreators" element={<AboutTheCreators />} />
            <Route path="/signup" element={<SignupFormPage />} /> 
            <Route path="/login" element={<LoginPage />} />
            <Route path="/userororgselect" element={<UserOrOrgSelect />} /> 
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/sitesponsors" element={<SiteSponsors />} />
            <Route path="/org-dashboard" element={<OrgDashboard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
