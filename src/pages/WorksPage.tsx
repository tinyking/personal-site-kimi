import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink, Github, Filter } from 'lucide-react';
import { projects } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const allTechStacks = Array.from(
  new Set(projects.flatMap((p) => p.techStack))
);

export default function WorksPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = selectedTech
    ? projects.filter((p) => p.techStack.includes(selectedTech))
    : projects;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 标题动画
      gsap.fromTo(
        '.works-title',
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

      // 卡片动画
      gsap.fromTo(
        '.works-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.works-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <main ref={sectionRef} className="relative min-h-screen pt-24 pb-16">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-1/3 h-1/3 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-layout mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Page Header */}
        <div ref={titleRef} className="mb-12">
          <h1 className="works-title text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">
            作品集
          </h1>
          <p className="works-title text-slate-400 text-lg max-w-2xl">
            这里展示了我近年来的技术项目和创作，涵盖AI应用、数据可视化、开源组件库等多个领域。
          </p>
        </div>

        {/* Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">按技术栈筛选</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTech(null)}
              className={`tech-tag ${!selectedTech ? 'bg-gold text-dark-bg' : ''}`}
            >
              全部
            </button>
            {allTechStacks.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`tech-tag ${selectedTech === tech ? 'bg-gold text-dark-bg' : ''}`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="works-grid grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="works-card group relative bg-dark-card rounded-2xl p-6 md:p-8 border border-white/5 card-hover"
            >
              {/* 卡片发光效果 */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* 序号 */}
              <span className="absolute top-4 right-4 text-5xl font-serif font-bold text-white/5 group-hover:text-gold/10 transition-colors duration-500">
                0{index + 1}
              </span>

              {/* 技术栈标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-tag text-xs">
                    {tech}
                  </span>
                ))}
              </div>

              {/* 项目标题 */}
              <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                {project.title}
              </h3>

              {/* 项目描述 */}
              <p className="text-slate-400 mb-6">{project.description}</p>

              {/* 日期 */}
              <p className="text-slate-500 text-sm mb-6">
                完成时间: {project.date}
              </p>

              {/* 链接 */}
              <div className="flex items-center gap-4">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-gold transition-colors duration-300 group/link"
                >
                  <Github className="w-4 h-4" />
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
                    <ExternalLink className="w-4 h-4" />
                    在线演示
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500">没有找到使用该技术的项目</p>
            <button
              onClick={() => setSelectedTech(null)}
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
