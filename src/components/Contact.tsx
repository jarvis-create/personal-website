import { motion } from "motion/react";
import { Mail, Linkedin, FileText, Newspaper } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "joshuaojo33@gmail.com",
    href: "mailto:joshuaojo33@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Connect",
    href: "https://linkedin.com/in/oluwafemijoshua",
  },
  {
    icon: FileText,
    label: "Medium",
    value: "Read",
    href: "https://medium.com/oluwafemi-joshua",
  },
  {
    icon: Newspaper,
    label: "Substack",
    value: "Subscribe",
    href: "https://oluwafemijoshua.substack.com",
  },
];

export function Contact() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#1a0a1f] to-[#0a0a0a] min-h-[80vh] flex items-center">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#DC143C]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid gap-16 md:grid-cols-[minmax(0,1fr),minmax(0,320px)] items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <motion.div
              className="flex justify-center md:justify-start"
              initial={{ opacity: 0, rotate: 0 }}
              whileInView={{ opacity: 1, rotate: 360 }}
              viewport={{ once: true }}
              transition={{ duration: 2 }}
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                className="text-[#ff6b35]/40"
              >
                <circle
                  cx="25"
                  cy="25"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle
                  cx="25"
                  cy="25"
                  r="12"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path d="M25 10 L25 40" stroke="currentColor" strokeWidth="0.5" />
                <path d="M10 25 L40 25" stroke="currentColor" strokeWidth="0.5" />
              </svg>
            </motion.div>

            <div className="text-center md:text-left space-y-6">
              <h2 className="font-serif text-4xl md:text-6xl text-[#f5f5f5]">
                Always open to yap about tech, design thinking, and new ideas.
              </h2>

              <p className="font-mono text-[#ff6b35]/80 tracking-wider">
                [ Let's connect ]
              </p>

              <p className="font-mono text-[#f5f5f5]/70 max-w-2xl md:max-w-none mx-auto md:mx-0">
                Whether you&apos;re building the future or looking for someone who
                can — this guy is always open for collaboration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {links.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full bg-[#121212]/50 border-[#8B0000]/30 hover:bg-[#2D1B3D]/50 hover:border-[#DC143C]/50 text-[#f5f5f5] hover:text-[#ff6b35] p-6 justify-start gap-4 group relative overflow-hidden"
                    asChild
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[#DC143C]/0 via-[#DC143C]/10 to-[#DC143C]/0"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />

                      <div className="relative flex items-center gap-4 w-full">
                        <div className="p-2 bg-[#2D1B3D]/30 border border-[#ff6b35]/30 rounded">
                          <link.icon className="w-5 h-5 text-[#ff6b35]" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="font-mono">{link.label}</div>
                          <div className="text-[#f5f5f5]/60">{link.value}</div>
                        </div>
                      </div>
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mx-auto md:mx-0"
          >
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#DC143C]"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 border-t-2 border-r-2 border-[#DC143C]"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b-2 border-l-2 border-[#DC143C]"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-[#DC143C]"></div>

            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/30 to-[#DC143C]/30 blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden border-2 border-[#8B0000]/50">
              <ImageWithFallback
                src="/oluwafemi-joshua.png"
                alt="Profile"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            <motion.div
              className="absolute -bottom-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                className="text-[#ff6b35]/60"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="15"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                />
                <path
                  d="M20 8 L20 32 M8 20 L32 20"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <circle
                  cx="20"
                  cy="20"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                />
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 pt-8 border-t border-[#8B0000]/20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-mono text-[#ff6b35]/40">
            © 2025 · Oluwafemi Joshua
          </p>
        </motion.div>
      </div>
    </section>
  );
}
