import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Team from './pages/Team';
import League from './pages/League';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import LogoGallery from './pages/LogoGallery';
import PinsPage from './pages/PinsPage';
import AdminPins from './pages/Admin/AdminPins';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-gray-100 font-sans flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team/:teamId" element={<Team />} />
            <Route path="/league/:leagueId" element={<League />} />
            <Route path="/logos" element={<LogoGallery />} />
            <Route path="/pins" element={<PinsPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/pins" element={<AdminPins />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
