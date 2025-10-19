import { motion } from "motion/react";
import { FileText } from "lucide-react";

const articles = [
  {
    title: "Practical Notes on setting up AI Evals for your business",
    platform: "Medium",
    date: "Oct 2025",
    excerpt:
      "The best evals come from teams who have done the hard work of truly understanding their problem space",
    href: "https://medium.com",
  },
  {
    title: "Probing The Need for a Better Digital Life Archive",
    platform: "Medium",
    date: "Oct 2025",
    excerpt:
      "For some time now, I have been oddly fascinated with death and how it interacts with the lives we live",
    href: "https://medium.com",
  },
  {
    title: "Don't Drown",
    platform: "Substack",
    date: "June 2025",
    excerpt:
      "At first thought, it feels like it should be natural to self, and that we should, by Gaias default, want love for ourselves and seek that love like the blood-crazed sharks I'm starting to think we are.",
    href: "https://substack.com",
  },
];

export function Writing() {
  return (
    <section className="relative py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[#f5f5f5] mb-6">
            I write about tech, faith, and the human condition
          </h2>
          <p className="font-mono text-[#ff6b35]/80 tracking-wider">
            [ Thoughts made flesh ]
          </p>
        </motion.div>

        <div className="space-y-4">
          {articles.map((article, index) => (
            <motion.a
              key={article.title}
              href={article.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative block"
            >
              <div className="relative bg-[#121212]/20 border border-[#8B0000]/20 p-6 backdrop-blur-sm hover:bg-[#121212]/40 hover:border-[#DC143C]/40 transition-all duration-300 overflow-hidden">
                {/* Glowing ticker effect */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff6b35] to-transparent"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5,
                  }}
                />

                <div className="relative flex items-start gap-4">
                  <div className="p-2 bg-[#2D1B3D]/30 border border-[#ff6b35]/30 rounded group-hover:bg-[#2D1B3D]/50 transition-colors">
                    <FileText className="w-5 h-5 text-[#ff6b35]" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-[#f5f5f5] group-hover:text-[#ff6b35] transition-colors">
                        {article.title}
                      </h3>
                    </div>

                    <p className="text-[#f5f5f5]/60 mb-3">{article.excerpt}</p>

                    <div className="flex items-center gap-4 font-mono">
                      <span className="text-[#ff6b35]/60">
                        {article.platform}
                      </span>
                      <span className="text-[#DC143C]/40">·</span>
                      <span className="text-[#ff6b35]/60">{article.date}</span>
                    </div>
                  </div>

                  {/* Hover glow effect */}
                  <motion.div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#DC143C]/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Scrolling text ticker */}
        <div className="mt-12 overflow-hidden border-y border-[#8B0000]/20 py-4">
          <motion.div
            className="flex gap-12 font-mono text-[#ff6b35]/40 whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span>DIGITAL MANUSCRIPTS</span>
            <span>·</span>
            <span>THOUGHT FRAGMENTS</span>
            <span>·</span>
            <span>ENCODED WISDOM</span>
            <span>·</span>
            <span>DIGITAL MANUSCRIPTS</span>
            <span>·</span>
            <span>THOUGHT FRAGMENTS</span>
            <span>·</span>
            <span>ENCODED WISDOM</span>
            <span>·</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
