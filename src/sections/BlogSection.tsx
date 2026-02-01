import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题动画
      gsap.fromTo(
        '.blog-title-char',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.03,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 卡片动画
      const cards = cardsRef.current?.querySelectorAll('.blog-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotate: index % 2 === 0 ? 2 : -2 },
          {
            y: 0,
            opacity: 1,
            rotate: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = '最新博客';

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-1/4 h-1/4 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-layout mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {titleText.split('').map((char, index) => (
                <span key={index} className="blog-title-char inline-block">
                  {char}
                </span>
              ))}
            </h2>
            <p className="text-slate-400 text-lg">
              分享技术实践、产品思考与读书笔记
            </p>
          </div>
          <Link
            to="/blog"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors duration-300 group"
          >
            查看全部
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {blogPosts.slice(0, 4).map((post, index) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className={`blog-card group relative bg-dark-card rounded-2xl overflow-hidden border border-white/5 card-hover ${
                index === 0 ? 'md:row-span-2' : ''
              }`}
            >
              {/* 封面图区域 */}
              <div className={`relative overflow-hidden ${index === 0 ? 'h-48 md:h-64' : 'h-40'}`}>
                {/* 渐变背景 */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800" />
                
                {/* 装饰图案 */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-20 h-20 border border-gold/30 rounded-full" />
                  <div className="absolute bottom-4 right-4 w-16 h-16 border border-gold/20 rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-gold/10 rounded-full" />
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
                <h3 className={`font-serif font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300 line-clamp-2 ${
                  index === 0 ? 'text-xl md:text-2xl' : 'text-lg'
                }`}>
                  {post.title}
                </h3>
                
                <p className={`text-slate-400 mb-4 line-clamp-2 ${index === 0 ? 'line-clamp-3' : ''}`}>
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
                  {post.tags.slice(0, 3).map((tag) => (
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
      </div>
    </section>
  );
}
