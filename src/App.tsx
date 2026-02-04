import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import WorksPage from '@/pages/WorksPage';
import BlogPage from '@/pages/BlogPage';
import BlogDetailPage from '@/pages/BlogDetailPage';
import JournalPage from '@/pages/JournalPage';
import AboutPage from '@/pages/AboutPage';
import MarkdownDebugger from '@/debug/MarkdownDebugger';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-dark-bg text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/works" element={<WorksPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/debug" element={<MarkdownDebugger />} />
          </Routes>
          <Footer />
          <Toaster 
            position="top-center" 
            toastOptions={{
              style: {
                background: '#1e293b',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.1)',
              },
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
