import { useScrollAnimation } from './hooks/useScrollAnimation';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import ScrollyHero from './components/ScrollyHero';
import StorySection from './components/StorySection';
import ParallaxFeatures from './components/ParallaxFeatures';
import ParallaxSpecs from './components/ParallaxSpecs';
import ParallaxNewsletter from './components/ParallaxNewsletter';
import Footer from './components/Footer';

export default function App() {
  useScrollAnimation();

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <ScrollyHero />
        <StorySection />
        <ParallaxFeatures />
        <ParallaxSpecs />
        <ParallaxNewsletter />
      </main>
      <Footer />
    </>
  );
}
