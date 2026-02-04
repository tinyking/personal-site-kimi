import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // 标题动画
      tl.fromTo(
        '.hero-char',
        { y: 40, opacity: 0, rotateX: 10 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.05 },
        0.3
      )
        // 逗号动画
        .fromTo(
          '.hero-comma',
          { scale: 0, rotate: -20 },
          { scale: 1, rotate: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' },
          0.5
        )
        // 名字动画
        .fromTo(
          '.hero-name',
          { scale: 1.5, opacity: 0, letterSpacing: '20px' },
          { scale: 1, opacity: 1, letterSpacing: '0px', duration: 0.8, ease: 'expo.out' },
          0.7
        )
        // 下划线动画
        .fromTo(
          underlineRef.current,
          { width: '0%' },
          { width: '100%', duration: 0.6 },
          1.2
        )
        // 副标题动画
        .fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          1
        )
        // 描述动画
        .fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          1.2
        )
        // 滚动提示动画
        .fromTo(
          '.scroll-hint',
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5 },
          1.5
        );

      // 持续浮动动画
      gsap.to('.float-element', {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const titleChars = '你好，我是'.split('');

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1200px' }}
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        {/* 渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg to-dark-card" />

        {/* 径向渐变装饰 */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold/3 rounded-full blur-3xl" />

        {/* 浮动装饰元素 */}
        <div className="float-element absolute top-20 left-10 w-2 h-2 bg-gold/30 rounded-full" />
        <div className="float-element absolute top-40 right-20 w-3 h-3 bg-gold/20 rounded-full" />
        <div className="float-element absolute bottom-32 left-1/4 w-2 h-2 bg-gold/25 rounded-full" />
        <div className="float-element absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-gold/20 rounded-full" />
      </div>

      {/* 内容 */}
      <div className="relative z-10 max-w-layout mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="inline-block">
            {titleChars.map((char, index) => (
              <span
                key={index}
                className="hero-char inline-block"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {char}
              </span>
            ))}
          </span>
          <span className="hero-comma inline-block text-gold">，</span>
          <span className="hero-name inline-block text-gold ml-2">语霖</span>
          <span className="relative inline-block ml-2">
            <span
              ref={underlineRef}
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-gold to-gold-light rounded-full"
              style={{ width: '0%' }}
            />
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl md:text-3xl text-white/90 font-serif mb-4 opacity-0"
        >
          一名技术产品创作者
        </p>

        <p
          ref={descRef}
          className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto opacity-0"
        >
          融合极客技术感与国学人文气质
          <br />
          用代码构建产品，用文字记录思考
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up animation-delay-500">
          <Link
            to="/works"
            className="btn-primary gap-2"
          >
            查看作品
            <ArrowDown className="w-4 h-4" />
          </Link>
          <Link
            to="/blog"
            className="btn-secondary"
          >
            阅读博客
          </Link>
        </div>
      </div>

      {/* 滚动提示 */}
      <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
        <div className="flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs">向下滚动</span>
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
