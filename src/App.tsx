import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Work } from "./components/Work";
import { Writing } from "./components/Writing";
import { Contact } from "./components/Contact";
import { RunicDivider } from "./components/RunicDivider";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] overflow-x-hidden">
      <Hero />
      <RunicDivider />
      <About />
      <RunicDivider />
      <Work />
      <RunicDivider />
      <Writing />
      <RunicDivider />
      <Contact />
    </div>
  );
}
