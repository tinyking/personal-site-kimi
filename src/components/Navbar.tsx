import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Search, ArrowRight } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { blogPosts } from '@/data/content';

const navLinks = [
  { name: '首页', path: '/' },
  { name: '作品集', path: '/works' },
  { name: '博客', path: '/blog' },
  { name: '日记', path: '/journal' },
  { name: '关于我', path: '/about' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof blogPosts>([]);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 关闭移动端菜单当路由变化
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass border-b border-white/10'
            : 'bg-transparent'
        }`}
        style={{ height: isScrolled ? '64px' : '72px' }}
      >
        <div className="max-w-layout mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
            >
              <span className="text-xl font-serif font-bold text-white group-hover:text-gold transition-colors duration-300">
                爱语霖
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-colors duration-250 ${
                    isActive(link.path)
                      ? 'text-gold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${
                      isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-400 hover:text-white transition-colors duration-250"
                aria-label="搜索"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-400 hover:text-gold transition-colors duration-250"
                aria-label={theme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* CTA Button - Desktop */}
              <Link
                to="/about"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-gold text-dark-bg text-sm font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 hover:scale-102"
              >
                联系我
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-slate-400 hover:text-white transition-colors duration-250"
                aria-label="切换菜单"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 glass border-b border-white/10 transition-all duration-300 ${
            isMobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-lg font-medium transition-colors duration-250 ${
                  isActive(link.path)
                    ? 'text-gold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-dark-bg text-sm font-semibold rounded-lg mt-4"
            >
              联系我
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-lg bg-dark-card border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">搜索文章</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="输入关键词搜索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              autoFocus
            />
            <div className="max-h-80 overflow-y-auto space-y-2">
              {searchResults.length > 0 ? (
                searchResults.map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-250"
                  >
                    <h4 className="text-white font-medium mb-1">{post.title}</h4>
                    <p className="text-slate-400 text-sm line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="category-tag">{post.category}</span>
                      <span className="text-slate-500 text-xs">{post.date}</span>
                    </div>
                  </Link>
                ))
              ) : searchQuery.trim() ? (
                <p className="text-slate-500 text-center py-4">未找到相关文章</p>
              ) : (
                <p className="text-slate-500 text-center py-4">输入关键词开始搜索</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
