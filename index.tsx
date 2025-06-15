import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const fullMessage = `Shruu...
Main jaanta hoon maine galti ki hai,
par meri feelings kabhi jhooti nahi thi.
Main har pal sirf tumhara sochta hoon,
tumhari hansi, tumhari baatein, sab kuch.
Mujhe pata hai main perfect nahi hoon,
lekin main tumse sachcha pyaar karta hoon...
Dil se. Hamesha.

Please mujhe maaf kar do ek baar...
Main sirf tumhara hoon. Aur hamesha rahunga 💖
Tumhari khushi meri zindagi hai.
I miss you, Shruu... 🥺`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        fullMessage.charAt(i) === "\n"
          ? prev + "<br/>"
          : prev + fullMessage.charAt(i)
      );
      i++;
      if (i >= fullMessage.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    const playMusic = () => {
      if (audio && audio.paused) {
        audio.play().catch(() => {});
      }
    };
    document.addEventListener("click", playMusic);
    return () => document.removeEventListener("click", playMusic);
  }, []);

  return (
    <>
      <Head>
        <title>Sorry Shruu 💖</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-5xl font-cursive text-pink-700 mb-6"
        >
          Sorry Shruu 💖
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="text-lg font-light max-w-xl text-gray-700"
          dangerouslySetInnerHTML={{ __html: displayText }}
        ></motion.p>

        <audio id="bg-music" autoPlay loop>
          <source src="/your-audio-file.mp3" type="audio/mpeg" />
        </audio>

        <Hearts />
      </div>
    </>
  );
}

function Hearts() {
  const [hearts, setHearts] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev,
        {
          id: Math.random(),
          left: Math.random() * 100,
          duration: Math.random() * 3 + 4,
        },
      ]);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="fixed text-2xl text-pink-500"
          style={{ left: `${heart.left}vw`, top: "-2rem" }}
          initial={{ y: 0, opacity: 1, rotate: 0 }}
          animate={{ y: "120vh", opacity: 0, rotate: 360 }}
          transition={{ duration: heart.duration }}
        >
          ❤️
        </motion.div>
      ))}
    </>
  );
}