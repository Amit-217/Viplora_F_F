import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login/Login';
import Register from './pages/Auth/Register/Register';
import VerifyOTP from './pages/Auth/VerifyOTP/VerifyOTP';
import AllPrograms from './pages/Programs/All/AllPrograms';
import ProgramDetails from './pages/Programs/Details/ProgramDetails/ProgramDetails';
import Donate from './pages/Donate/Main/Donate';
import VolunteerApply from './pages/Volunteer/Apply/VolunteerApply/VolunteerApply';
import AdminDashboard from './pages/Admin/AdminDashboard';
import BlogList from './pages/Blog/List/BlogList';
import BlogSingle from './pages/Blog/Single/BlogSingle';
import GalleryGrid from './pages/Gallery/GalleryGrid';
import ManagePrograms from './pages/Admin/ManagePrograms';
import ManageVolunteers from './pages/Admin/ManageVolunteers';
import ManageBlog from './pages/Admin/ManageBlog';
import ManageGallery from './pages/Admin/ManageGallery';
import UserDashboard from './pages/Dashboard/UserDashboard';
import VolunteerDashboard from './pages/Volunteer/Dashboard/VolunteerDashboard';
import Vision from './pages/About/Vision/Vision';
import Contact from './pages/Contact/Contact';
import Success from './pages/Donate/Success/Success';
import { useAuth } from './context/AuthContext';

// Auth Guard
const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/auth/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return <>{children}</>;
};

// Placeholder generic component for pages in development
const Placeholder = ({ title }: { title: string }) => (
  <div className="pt-32 pb-20 text-center min-h-screen">
    <h1 className="text-4xl font-bold text-primary mb-4">{title}</h1>
    <p className="text-gray-600">This section is coming soon. We are building something impactful.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* About Routes */}
            <Route path="/about/vision" element={<Vision />} />
            <Route path="/about/story" element={<Placeholder title="Our Story" />} />
            <Route path="/about/team" element={<Placeholder title="Our Team" />} />
            <Route path="/about/transparency" element={<Placeholder title="Transparency" />} />

            {/* Programs Routes */}
            <Route path="/programs" element={<AllPrograms />} />
            <Route path="/programs/:id" element={<ProgramDetails />} />

            {/* Donate Routes */}
            <Route path="/donate" element={<Donate />} />
            <Route path="/donate/success" element={<Success />} />

            {/* Volunteer Routes */}
            <Route path="/volunteer/apply" element={<ProtectedRoute><VolunteerApply /></ProtectedRoute>} />
            <Route path="/volunteer/dashboard" element={<ProtectedRoute role="volunteer"><VolunteerDashboard /></ProtectedRoute>} />

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
            
            {/* Admin & Dashboards */}
            <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/programs" element={<ProtectedRoute role="admin"><ManagePrograms /></ProtectedRoute>} />
            <Route path="/admin/volunteers" element={<ProtectedRoute role="admin"><ManageVolunteers /></ProtectedRoute>} />
            <Route path="/admin/blog" element={<ProtectedRoute role="admin"><ManageBlog /></ProtectedRoute>} />
            <Route path="/admin/gallery" element={<ProtectedRoute role="admin"><ManageGallery /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
