import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题动画
      gsap.fromTo(
        '.project-title-word',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // 卡片动画
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotateY: index % 2 === 0 ? 3 : -3 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.6,
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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-layout mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div ref={titleRef} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              {'精选项目'.split('').map((char, index) => (
                <span key={index} className="project-title-word inline-block">
                  {char}
                </span>
              ))}
            </h2>
            <p className="text-slate-400 text-lg">
              探索我最新的技术产品和创作
            </p>
          </div>
          <a
            href="/works"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors duration-300 group"
          >
            查看全部
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>

        {/* Projects Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {projects.slice(0, 4).map((project, index) => (
            <div
              key={project.id}
              className={`project-card group relative bg-dark-card rounded-2xl p-6 md:p-8 border border-white/5 card-hover ${
                index === 0 ? 'md:col-span-2' : ''
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* 卡片发光效果 */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* 技术栈标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.slice(0, 3).map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 3 && (
                  <span className="tech-tag">
                    +{project.techStack.length - 3}
                  </span>
                )}
              </div>

              {/* 项目标题 */}
              <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                {project.title}
              </h3>

              {/* 项目描述 */}
              <p className="text-slate-400 mb-6 line-clamp-2">
                {project.description}
              </p>

              {/* 链接 */}
              <div className="flex items-center gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold transition-colors duration-300 group/link"
                >
                  查看代码
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold transition-colors duration-300"
                  >
                    在线演示
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* 序号装饰 */}
              <span className="absolute top-4 right-4 text-6xl font-serif font-bold text-white/5 group-hover:text-gold/10 transition-colors duration-500">
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
