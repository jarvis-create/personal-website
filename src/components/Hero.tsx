import { motion } from "motion/react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#120912] to-[#070707]">
      <div className="absolute inset-0 opacity-30 mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIvPjwvc3ZnPg==')] animate-grain"></div>
      </div>

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#8B0000]/15 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff6b35]/15 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              className="text-[#ff6b35]/50"
            >
              <circle
                cx="22"
                cy="22"
                r="16"
                stroke="currentColor"
                strokeWidth="0.75"
                fill="none"
              />
              <path
                d="M22 6 L22 38 M6 22 L38 22"
                stroke="currentColor"
                strokeWidth="0.75"
              />
              <circle
                cx="22"
                cy="22"
                r="10"
                stroke="currentColor"
                strokeWidth="0.75"
                fill="none"
              />
            </svg>
            <span className="font-mono text-[#ff6b35]/80 tracking-[0.6em] uppercase text-xs md:text-sm">
              [ Hello World ]
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-condensed text-5xl md:text-6xl text-[#f5f5f5] tracking-[0.1em] uppercase"
          >
            Hi, I&apos;m{" "}
            <span className="text-[#ff6b35]">Oluwafemi Joshua</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="font-serif text-lg md:text-xl text-[#f5f5f5]/80 leading-relaxed"
          >
            A Technical Product Manager, who spent the last five years building & growing products in early-stage and growth environments
            <br />
            Changing the world I live in one product at a time. 
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4"
          >
            <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#ff6b35]/40 to-transparent" />
            <p className="font-mono text-xs md:text-sm tracking-[0.5em] text-[#b19cd9]/60 uppercase">
              Technical Product Manager ·  Part Time Writer
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="pt-4 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="bg-[#0c0c0c]/60 border border-[#ff6b35] text-[#f5f5f5] hover:bg-[#ff6b35]/10 px-8 py-6 relative overflow-hidden group rounded-md"
            onClick={() => {
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="relative z-10 font-mono tracking-[0.4em] uppercase text-xs md:text-sm transition-opacity duration-200 group-hover:opacity-0">
              Curious?
            </span>
            <span className="absolute inset-0 flex items-center justify-center font-mono tracking-[0.4em] uppercase text-xs md:text-sm text-[#ff6b35] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Let&apos;s go
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff6b35]/10 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
