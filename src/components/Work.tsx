import { motion } from "motion/react";

const projects = [
  {
    title: "Recall",
    summary: "AI-enabled personal knowledge management app",
    tags: ["AI/ML", "RAG", "B2C"],
    year: "2025",
  },
  {
    title: "Student Helper",
    summary: "Personalized study assistant for early learners",
    tags: ["B2C", "SaaS", "Edtech"],
    year: "2025",
  },
  {
    title: "Death Note",
    summary: "Experimental heirloom system for digital legacies",
    tags: ["Research", ],
    year: "2025",
  },
];

export function Work() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#121212] to-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[#f5f5f5] mb-6">
            Side projects I'm working on
          </h2>
          <p className="font-mono text-[#ff6b35]/80 tracking-wider">
            [ Prototyping in public ]
          </p>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-[#121212]/30 border border-[#8B0000]/20 p-8 backdrop-blur-sm overflow-hidden hover:border-[#DC143C]/50 transition-all duration-500 cursor-default">
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#DC143C]/0 via-[#DC143C]/0 to-[#DC143C]/0 opacity-0 group-hover:opacity-100"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(220, 20, 60, 0.05), transparent)",
                  }}
                />

                <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-[#ff6b35]/60">
                        {project.year}
                      </span>
                      <div className="h-px flex-1 bg-[#ff6b35]/20 max-w-[50px]" />
                    </div>

                    <h3 className="text-[#f5f5f5] text-xl md:text-2xl mb-3 group-hover:text-[#ff6b35] transition-colors font-serif">
                      {project.title}
                    </h3>

                    <p className="text-[#f5f5f5]/70 mb-4">{project.summary}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[#2D1B3D]/30 border border-[#ff6b35]/30 text-[#ff6b35] font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    className="font-mono text-xs uppercase tracking-[0.35em] text-[#ff6b35] border border-[#ff6b35]/40 px-4 py-2 rounded-full bg-[#2D1B3D]/30 opacity-80 group-hover:opacity-100 transition-all"
                    whileHover={{ y: -2 }}
                  >
                    Coming Soon
                  </motion.div>
                </div>

                {/* Glowing line effect on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#DC143C] via-[#ff6b35] to-[#DC143C]"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
