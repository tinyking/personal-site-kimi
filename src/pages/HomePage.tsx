import HeroSection from '@/sections/HeroSection';
import ProjectsSection from '@/sections/ProjectsSection';
import BlogSection from '@/sections/BlogSection';

export default function HomePage() {
  return (
    <main className="relative">
      <HeroSection />
      <ProjectsSection />
      <BlogSection />
    </main>
  );
}
