import { motion } from "motion/react";
import { Code2, Sparkles, Users, Rocket } from "lucide-react";

const values = [
  {
    icon: Code2,
    title: "0→1 Product Building",
    description:
      "Transforming messy thoughts and noise to real products that solve important human problems"
  },
  {
    icon: Sparkles,
    title: "Human + Machine Systems",
    description: "Building safe practices and ux for the age of AI",
  },
  {
    icon: Users,
    title: "Communities",
    description: "Creating spaces where people don't have to rely on AI for connection",
  },
  {
    icon: Rocket,
    title: "Growth Experiements",
    description: "Taking lessons on human psychology to drive product adoption",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-[#f5f5f5] mb-6">
            What I'm obsessed with
          </h2>
          <p className="font-mono text-[#ff6b35]/80 tracking-wider">
            [ Mentem occupavit ]
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="relative bg-[#121212]/50 border border-[#8B0000]/30 p-8 backdrop-blur-sm overflow-hidden">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#DC143C]/0 to-[#DC143C]/0 group-hover:from-[#DC143C]/5 group-hover:to-[#ff6b35]/5 transition-all duration-500" />

                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#ff6b35]/50" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#ff6b35]/50" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#ff6b35]/50" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#ff6b35]/50" />

                <div className="relative flex items-start gap-4">
                  <div className="p-3 bg-[#2D1B3D]/50 border border-[#ff6b35]/30 rounded">
                    <value.icon className="w-6 h-6 text-[#ff6b35]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#f5f5f5] mb-2">{value.title}</h3>
                    <p className="text-[#f5f5f5]/70">{value.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
