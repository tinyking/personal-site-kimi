import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

const quickLinks = [
  { name: '首页', path: '/' },
  { name: '作品集', path: '/works' },
  { name: '博客', path: '/blog' },
  { name: '日记', path: '/journal' },
  { name: '关于我', path: '/about' },
];

const socialLinks = [
  { name: 'GitHub', icon: Github, url: 'https://github.com' },
  { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com' },
  { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  { name: '微信公众号', icon: MessageCircle, url: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('请输入邮箱地址');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('请输入有效的邮箱地址');
      return;
    }
    
    setIsSubmitting(true);
    // 模拟订阅请求
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('订阅成功！感谢您的关注');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <footer className="relative bg-gradient-to-b from-dark-bg to-dark-card border-t border-white/5">
      {/* 装饰背景 */}
      <div className="absolute inset-0 bg-gradient-radial opacity-50 pointer-events-none" />
      
      <div className="relative max-w-layout mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
        {/* Quote Section */}
        <div className="text-center mb-16">
          <blockquote className="text-2xl md:text-3xl font-serif italic text-white">
            <span className="text-gold">"</span>
            代码即诗，产品即画
            <span className="text-gold">"</span>
          </blockquote>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">快速链接</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-250"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">社交媒体</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-400 hover:text-gold transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="text-sm">{social.name}</span>
                </a>
              ))}
            </div>
            <div className="mt-6">
              <a
                href="mailto:hello@yulin.dev"
                className="flex items-center gap-2 text-slate-400 hover:text-gold transition-colors duration-250"
              >
                <Mail className="w-5 h-5" />
                <span className="text-sm">hello [at] yulin.dev</span>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">订阅更新</h3>
            <p className="text-slate-400 text-sm mb-4">
              订阅我的邮件列表，获取最新文章和项目动态
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="输入邮箱地址"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field flex-1"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary px-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-slate-500 text-xs mt-2">
              不发送垃圾邮件，随时可取消订阅
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} 爱语霖. 保留所有权利.
            </p>
            <p className="text-slate-500 text-sm">
              用 <span className="text-gold">♥</span> 和代码构建
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
