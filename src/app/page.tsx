"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Flame, Lock, Timer, Share, Key } from "lucide-react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { motion } from "framer-motion";
import { REPO_LINK } from "@/lib/constants";
import { RiGithubLine } from "react-icons/ri";

const features = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: "End-to-End Encryption",
    description:
      "Messages are encrypted in your browser. Only the recipient can decrypt it with the password.",
    link: "#encryption",
  },
  {
    icon: <Timer className="w-6 h-6" />,
    title: "Self-Destruct Timer",
    description:
      "Set how long the message stays visible — from seconds to views. Once expired, it vanishes forever.",
    link: "#timer",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Zero-Knowledge Privacy",
    description:
      "We never see your message or password. All encryption and decryption happens in the browser.",
    link: "#privacy",
  },
  {
    icon: <Flame className="w-6 h-6" />,
    title: "Burn After Reading",
    description:
      "Limit the number of views. Messages are automatically deleted from the database after they're read.",
    link: "#burn",
  },
  {
    icon: <Share className="w-6 h-6" />,
    title: "Sharable Links & QR",
    description:
      "Generate sharable links or QR codes for quick delivery and easy access.",
    link: "#share",
  },
  {
    icon: <Key className="w-6 h-6" />,
    title: "Optional Password Layer",
    description:
      "Add a numeric or alphanumeric password before decryption. Only the one who knows it can unlock the secret.",
    link: "#password",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center bg-black/[0.96] antialiased px-4 py-12 overflow-hidden">
      <section className="text-center max-w-4xl space-y-8 z-10 relative">
        <div className="relative">
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Himitsu
          </h1>
        </motion.div>

        <TextGenerateEffect
          words="Send encrypted, n-times messages that self-destruct after viewing. No accounts. No tracking. Just secrets."
          className="text-neutral-300 text-xl max-w-2xl mx-auto leading-relaxed"
        />

        <motion.div
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link href="/send">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Send a Secret
            </Button>
          </Link>
          <Link href={REPO_LINK} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="lg"
              className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 flex items-center gap-2"
            >
              <RiGithubLine className="w-5 h-5" />
              View on GitHub
            </Button>
          </Link>
        </motion.div>
      </section>

      <section className="mt-24 w-full max-w-6xl z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12 bg-clip-text bg-gradient-to-b from-neutral-50 to-neutral-400">
            Privacy-First Features
          </h2>
          <HoverEffect items={features} />
        </motion.div>
      </section>

      <motion.footer
        className="mt-24 text-sm text-neutral-400 text-center space-y-2 z-10 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <p>Made with 🕊️ in privacy. No logs. No metadata.</p>
        <p>
          <Link
            href={REPO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200 inline-flex items-center gap-1"
          >
            <RiGithubLine className="w-4 h-4" />
            Open Source on GitHub
          </Link>
        </p>
      </motion.footer>
    </main>
  );
}

// function FeatureCard({
//   title,
//   description,
//   icon,
// }: {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
// }) {
//   return (
//     <Card className="border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-neutral-700">
//       <CardContent className="p-6 space-y-4">
//         <div className="flex items-center gap-3 text-white">
//           <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
//             {icon}
//           </div>
//           <h3 className="text-lg font-semibold">{title}</h3>
//         </div>
//         <p className="text-sm text-neutral-400">{description}</p>
//       </CardContent>
//     </Card>
//   );
// }
