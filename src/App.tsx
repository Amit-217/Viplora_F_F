import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import VerifyOTP from './pages/Auth/VerifyOTP/VerifyOTP';
import AdminLogin from './pages/Admin/Login/AdminLogin';
import AllPrograms from './pages/Programs/All/AllPrograms';
import ProgramDetails from './pages/Programs/Details/ProgramDetails/ProgramDetails';
import Donate from './pages/Donate/Main/Donate';
import VolunteerApply from './pages/Volunteer/Apply/VolunteerApply/VolunteerApply';
import AdminDashboard from './pages/Admin/AdminDashboard';
import BlogList from './pages/Blog/List/BlogList';
import BlogSingle from './pages/Blog/Single/BlogSingle';
import ForgotPassword from './pages/Auth/Forget/ForgotPassword';
import GalleryGrid from './pages/Gallery/GalleryGrid';
import ManagePrograms from './pages/Admin/ManagePrograms';
import ManageVolunteers from './pages/Admin/ManageVolunteers';
import ManageMessages from './pages/Admin/ManageMessages';
import ManageBlog from './pages/Admin/ManageBlog';
import ManageGallery from './pages/Admin/ManageGallery';
import ManageDonations from './pages/Admin/ManageDonations';
import ManageAdmins from './pages/Admin/ManageAdmins';
import ManageActivities from './pages/Admin/ManageActivities';
import UserDashboard from './pages/Dashboard/UserDashboard';
import VolunteerDashboard from './pages/Volunteer/Dashboard/VolunteerDashboard';
import ManageVolunteerBlog from './pages/Volunteer/Dashboard/ManageVolunteerBlog';
import Vision from './pages/About/Vision/Vision';
import Story from './pages/About/Story/Story';
import Team from './pages/About/Team/Team';
import Transparency from './pages/About/Transparency/Transparency';
import Contact from './pages/Contact/Contact';
import Success from './pages/Donate/Success/Success';
import { useAuth } from './context/AuthContext';

import { Toaster } from 'react-hot-toast';
import SessionTimeoutModal from './components/common/SessionTimeoutModal';

// Auth Guard
const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return <>{children}</>;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <Toaster position="top-right" toastOptions={{ className: 'font-bold' }} />
      <SessionTimeoutModal />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* About Routes */}
          <Route path="/about" element={<Vision />} />
          <Route path="/about/vision" element={<Vision />} />
          <Route path="/about/story" element={<Story />} />
          <Route path="/about/team" element={<Team />} />
          <Route path="/about/transparency" element={<Transparency />} />

          {/* Programs Routes */}
          <Route path="/programs" element={<AllPrograms />} />
          <Route path="/programs/:id" element={<ProgramDetails />} />

          {/* Donate Routes */}
          <Route path="/donate" element={<Donate />} />
          <Route path="/donate/success" element={<Success />} />

          {/* Volunteer Routes */}
          <Route path="/volunteer/apply" element={<VolunteerApply />} />
          <Route path="/volunteer/dashboard" element={<ProtectedRoute role="volunteer"><VolunteerDashboard /></ProtectedRoute>} />
          <Route path="/volunteer/blogs" element={<ProtectedRoute role="volunteer"><ManageVolunteerBlog /></ProtectedRoute>} />

          {/* Blog Routes */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogSingle />} />

          {/* Other Core Pages */}
          <Route path="/gallery" element={<GalleryGrid />} />
          <Route path="/contact" element={<Contact />} />

          
          {/* Auth Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/verify-otp" element={<VerifyOTP />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Admin & Dashboards */}
          <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/programs" element={<ProtectedRoute role="admin"><ManagePrograms /></ProtectedRoute>} />
          <Route path="/admin/volunteers" element={<ProtectedRoute role="admin"><ManageVolunteers /></ProtectedRoute>} />
          <Route path="/admin/blog" element={<ProtectedRoute role="admin"><ManageBlog /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute role="admin"><ManageGallery /></ProtectedRoute>} />
          <Route path="/admin/donations" element={<ProtectedRoute role="admin"><ManageDonations /></ProtectedRoute>} />
          <Route path="/admin/manage-admins" element={<ProtectedRoute role="admin"><ManageAdmins /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute role="admin"><ManageMessages /></ProtectedRoute>} />
          <Route path="/admin/activities" element={<ProtectedRoute role="admin"><ManageActivities /></ProtectedRoute>} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
