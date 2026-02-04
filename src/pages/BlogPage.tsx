import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Search, Tag } from 'lucide-react';
import { getAllBlogPosts } from '@/lib/markdown';

gsap.registerPlugin(ScrollTrigger);

const allBlogPosts = getAllBlogPosts().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const categories = Array.from(new Set(allBlogPosts.map((p) => p.category)));

export default function BlogPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = allBlogPosts.filter((post) => {
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-list-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.blog-list-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.blog-list-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredPosts]);

  return (
    <main ref={sectionRef} className="relative min-h-screen pt-24 pb-16">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-1/3 h-1/3 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-layout mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Page Header */}
        <div ref={titleRef} className="mb-12">
          <h1 className="blog-list-title text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">
            博客
          </h1>
          <p className="blog-list-title text-slate-400 text-lg max-w-2xl">
            分享技术实践、产品思考与读书笔记。每一篇文章都是深度思考的结晶。
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="搜索文章标题、内容或标签..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-12 w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            <button
              onClick={() => setSelectedCategory(null)}
              className={`category-tag ${!selectedCategory ? 'text-gold' : ''}`}
            >
              全部
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-tag ${
                  selectedCategory === category ? 'text-gold' : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Grid */}
        <div className="blog-list-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="blog-list-card group relative bg-dark-card rounded-2xl overflow-hidden border border-white/5 card-hover"
            >
              {/* 封面图区域 */}
              <div className="relative h-48 overflow-hidden">
                {/* 背景图片 */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('https://plus.unsplash.com/premium_photo-1755534835660-d1a16e62c6f6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
                  }}
                />
                
                {/* 渐变遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* 装饰图案 */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-20 h-20 border border-gold/30 rounded-full" />
                  <div className="absolute bottom-4 right-4 w-16 h-16 border border-gold/20 rounded-full" />
                </div>

                {/* 分类标签 */}
                <div className="absolute top-4 left-4">
                  <span className="category-tag group-hover:text-gold transition-colors duration-300">
                    {post.category}
                  </span>
                </div>

                {/* 悬停遮罩 */}
                <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* 内容区域 */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-slate-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* 元信息 */}
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                </div>

                {/* 标签 */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 底部装饰线 */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-gold-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">没有找到匹配的文章</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
              }}
              className="mt-4 text-gold hover:text-gold-light transition-colors duration-300"
            >
              清除筛选
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
