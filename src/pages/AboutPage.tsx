import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Twitter, Mail, MessageCircle, Send } from 'lucide-react';
import { aboutData } from '@/data/content';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-avatar',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.about-header',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.about-content',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.about-body',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.skill-bar',
        { width: '0%' },
        {
          width: (_i, el) => el.dataset.width || '0%',
          duration: 1,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.skills-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.timeline-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.experience-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('请填写所有字段');
      return;
    }
    
    // 模拟发送
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('消息已发送，我会尽快回复！');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <main ref={sectionRef} className="relative min-h-screen pt-24 pb-16">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-1/3 h-1/3 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="about-header text-center mb-16">
          {/* Avatar */}
          <div className="about-avatar relative w-32 h-32 md:w-48 md:h-48 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold to-gold-light p-1">
              <div className="w-full h-full rounded-full bg-dark-card flex items-center justify-center">
                <span className="text-4xl md:text-6xl font-serif font-bold text-gold">
                  语
                </span>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gold/20 blur-xl -z-10" />
          </div>

          {/* Name & Title */}
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2">
            {aboutData.name}
          </h1>
          <p className="text-gold text-lg mb-4">{aboutData.title}</p>

          {/* Quote */}
          <blockquote className="text-xl md:text-2xl font-serif italic text-slate-300 mb-6">
            <span className="text-gold">"</span>
            {aboutData.quote}
            <span className="text-gold">"</span>
          </blockquote>

          {/* Bio */}
          <p className="text-slate-400 max-w-xl mx-auto">{aboutData.bio}</p>
        </div>

        {/* Body */}
        <div className="about-body space-y-16">
          {/* Skills Section */}
          <section className="skills-section about-content">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-8">
              技能图谱
            </h2>
            <div className="space-y-6">
              {aboutData.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{skill.name}</span>
                    <span className="text-slate-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="skill-bar h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
                      data-width={`${skill.level}%`}
                      style={{ width: '0%' }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section className="experience-section about-content">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-8">
              工作经历
            </h2>
            <div className="relative space-y-8">
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/50 to-transparent" />

              {aboutData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="timeline-item relative pl-8"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1 w-3 h-3 -translate-x-1/2 rounded-full bg-gold border-2 border-dark-bg" />

                  <div className="bg-dark-card rounded-xl p-6 border border-white/5">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-white">
                        {exp.company}
                      </h3>
                      <span className="text-slate-500 text-sm">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-gold text-sm mb-4">{exp.position}</p>
                    <ul className="space-y-2">
                      {exp.description.map((item, i) => (
                        <li
                          key={i}
                          className="text-slate-400 text-sm flex items-start gap-2"
                        >
                          <span className="text-gold mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className="about-content">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-8">
              教育背景
            </h2>
            {aboutData.education.map((edu, index) => (
              <div
                key={index}
                className="bg-dark-card rounded-xl p-6 border border-white/5"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="text-lg font-bold text-white">{edu.school}</h3>
                  <span className="text-slate-500 text-sm">{edu.period}</span>
                </div>
                <p className="text-gold text-sm">
                  {edu.major} · {edu.degree}
                </p>
              </div>
            ))}
          </section>

          {/* Contact Section */}
          <section className="about-content">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-8">
              联系我
            </h2>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href={aboutData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-dark-card rounded-lg border border-white/5 hover:border-gold/30 transition-all duration-300"
              >
                <Github className="w-5 h-5 text-slate-400" />
                <span className="text-slate-300">GitHub</span>
              </a>
              <a
                href={aboutData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-dark-card rounded-lg border border-white/5 hover:border-gold/30 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-slate-400" />
                <span className="text-slate-300">LinkedIn</span>
              </a>
              <a
                href={aboutData.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-dark-card rounded-lg border border-white/5 hover:border-gold/30 transition-all duration-300"
              >
                <Twitter className="w-5 h-5 text-slate-400" />
                <span className="text-slate-300">Twitter</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 bg-dark-card rounded-lg border border-white/5 hover:border-gold/30 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-slate-400" />
                <span className="text-slate-300">微信公众号</span>
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-dark-card rounded-xl p-6 md:p-8 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-2">发送消息</h3>
              <p className="text-slate-400 text-sm mb-6">
                有项目合作或技术交流？欢迎给我留言。
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      姓名
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="input-field"
                      placeholder="你的名字"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      邮箱
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-2">
                    消息
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    className="input-field resize-none"
                    placeholder="想对我说什么..."
                  />
                </div>
                <button type="submit" className="btn-primary gap-2">
                  <Send className="w-4 h-4" />
                  发送消息
                </button>
              </form>
            </div>

            {/* Email */}
            <div className="mt-6 text-center">
              <a
                href={`mailto:${aboutData.social.email}`}
                className="inline-flex items-center gap-2 text-slate-400 hover:text-gold transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                {aboutData.social.email.replace('@', ' [at] ')}
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
