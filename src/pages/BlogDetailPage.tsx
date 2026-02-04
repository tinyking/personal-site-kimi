import React, { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Bookmark } from 'lucide-react';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/markdown';
import { toast } from 'sonner';

import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

gsap.registerPlugin(ScrollTrigger);

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const contentRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  const [htmlContent, setHtmlContent] = React.useState('');

  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      // 标题动画
      gsap.fromTo(
        '.blog-detail-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
        }
      );

      // 内容动画
      gsap.fromTo(
        '.blog-detail-content',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: 'expo.out',
        }
      );
    }, articleRef);

    // Process Markdown with GFM support for tables
    remark()
      .use(gfm)
      .use(html)
      .process(post.content)
      .then((file) => {
        setHtmlContent(String(file));
      })
      .catch((err) => {
        console.error('Markdown processing error:', err);
      });

    return () => ctx.revert();
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const allBlogPosts = getAllBlogPosts();
  const relatedPosts = post ? allBlogPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    )
    .slice(0, 2) : [];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('链接已复制到剪贴板');
    }
  };

  const handleBookmark = () => {
    toast.success('已添加到书签');
  };



  return (
    <main ref={articleRef} className="relative min-h-screen pt-24 pb-16">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-1/3 h-1/3 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-gold transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          返回博客列表
        </Link>

        {/* Article Header */}
        <header className="blog-detail-header mb-12">
          {/* Category */}
          <span className="category-tag mb-4 inline-block">{post.category}</span>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm text-slate-400 bg-white/5 px-3 py-1 rounded-full"
              >
                <Tag className="w-3 h-3 inline mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-slate-400 hover:text-gold transition-colors duration-300"
            >
              <Share2 className="w-4 h-4" />
              分享
            </button>
            <button
              onClick={handleBookmark}
              className="flex items-center gap-2 text-slate-400 hover:text-gold transition-colors duration-300"
            >
              <Bookmark className="w-4 h-4" />
              收藏
            </button>
          </div>
        </header>

        {/* Article Content */}
        <article
          ref={contentRef}
          className="blog-detail-content prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Divider */}
        <div className="border-t border-white/10 my-12" />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h3 className="text-2xl font-serif font-bold text-white mb-6">
              相关文章
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  className="group bg-dark-card rounded-xl p-6 border border-white/5 hover:border-gold/30 transition-all duration-300"
                >
                  <span className="category-tag mb-3 inline-block">
                    {relatedPost.category}
                  </span>
                  <h4 className="text-lg font-serif font-bold text-white group-hover:text-gold transition-colors duration-300 mb-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section className="bg-dark-card rounded-2xl p-8 border border-white/5">
          <h3 className="text-xl font-serif font-bold text-white mb-2">
            订阅更新
          </h3>
          <p className="text-slate-400 mb-4">
            喜欢这篇文章？订阅我的邮件列表，获取更多优质内容。
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success('订阅成功！');
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              placeholder="输入邮箱地址"
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary">
              订阅
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
