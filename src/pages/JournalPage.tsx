import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getAllJournalEntries } from '@/lib/markdown';

gsap.registerPlugin(ScrollTrigger);

export default function JournalPage() {
  const journalEntries = getAllJournalEntries();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.journal-title',
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
        '.journal-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.journal-timeline',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 格式化日期
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[date.getDay()];
    return { year, month, day, weekday, full: `${year}.${month}.${day}` };
  };

  return (
    <main ref={sectionRef} className="relative min-h-screen pt-24 pb-16">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-1/3 h-1/3 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-1/4 h-1/4 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-layout mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Page Header */}
        <div ref={titleRef} className="mb-12">
          <h1 className="journal-title text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4">
            日记
          </h1>
          <p className="journal-title text-slate-400 text-lg max-w-2xl">
            马伯庸式流水账，记录日常思考与生活碎片。无主题、无结构，只有真实的当下。
          </p>
        </div>

        {/* Timeline */}
        <div className="journal-timeline relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-32 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/50 to-transparent" />

          {/* Entries */}
          <div className="space-y-8">
            {journalEntries.map((entry) => {
              const date = formatDate(entry.date);
              return (
                <div
                  key={entry.id}
                  className="journal-item relative pl-8 md:pl-44"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-32 top-2 w-2 h-2 -translate-x-1/2 rounded-full bg-gold border-2 border-dark-bg" />

                  {/* Date - Desktop */}
                  <div className="hidden md:block absolute left-0 top-0 w-28 text-right">
                    <span className="text-gold font-medium">{date.full}</span>
                    <span className="block text-slate-500 text-sm mt-1">
                      {date.weekday}
                    </span>
                  </div>

                  {/* Content Card */}
                  <div className="bg-dark-card rounded-xl p-6 border border-white/5 hover:border-gold/20 transition-all duration-300">
                    {/* Date - Mobile */}
                    <div className="md:hidden mb-4">
                      <span className="text-gold font-medium">{date.full}</span>
                      <span className="text-slate-500 text-sm ml-2">
                        {date.weekday}
                      </span>
                    </div>

                    {/* Title (if exists) */}
                    {entry.title && (
                      <h3 className="text-lg font-serif font-bold text-white mb-3">
                        {entry.title}
                      </h3>
                    )}

                    {/* Content */}
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {entry.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
