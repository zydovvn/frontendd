import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Chèn ảnh tĩnh bằng prop bgImageUrl (tùy chọn):
 *   <HeaderHero bgImageUrl="/assets/hero/uni-hero.jpg" />
 *
 * Nếu không truyền bgImageUrl, component hoạt động y chang trước đây.
 *
 * Nếu bạn muốn import ảnh từ src/assets:
 *   import heroImg from "@/assets/hero/uni-hero.jpg";
 *   <HeaderHero bgImageUrl={heroImg} />
 */
export default function HeaderHero({ bgImageUrl = null }) {
  const { scrollY } = useScroll();
  const [bubbles, setBubbles] = useState([]);
  const [isNight, setIsNight] = useState(false);

  // Parallax theo chuột (desktop)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  // Ẩn khi cuộn (mượt bằng spring)
  const ySpring = useSpring(scrollY, { stiffness: 140, damping: 24, mass: 0.6 });
  const opacity = useTransform(ySpring, [0, 220], [1, 0]);
  const translateY = useTransform(ySpring, [0, 220], [0, -80]);
  const blurPx = useTransform(ySpring, [0, 220], [0, 8]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  // Tạo bubbles bay chậm
  useEffect(() => {
    const arr = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      size: 80 + Math.random() * 80,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 20 + Math.random() * 15,
    }));
    setBubbles(arr);
  }, []);

  // Parallax theo chuột (tắt trên mobile)
  useEffect(() => {
    const handleMouse = (e) => {
      if (window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      x.set((e.clientX - innerWidth / 2) / 20);
      y.set((e.clientY - innerHeight / 2) / 20);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [x, y]);

  return (
    <motion.section
      style={{ rotateX, rotateY, opacity, y: translateY, filter }}
      className={`relative overflow-hidden text-white py-20 transition-colors duration-700
        ${
          isNight
            ? "bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-500"
            : "bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300"
        }`}
    >
      {/* Ảnh nền tĩnh (tùy chọn) — luôn nằm dưới mọi layer khác */}
      {bgImageUrl && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={bgImageUrl}
            alt="UniTrade hero"
            className="w-full h-full object-cover"
            loading="eager"
            fetchpriority="high"
          />
          {/* Lớp overlay nhẹ để giữ đúng brand màu cam-vàng */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-500/50 via-amber-400/40 to-yellow-300/30" />
        </div>
      )}

      {/* Gradient động ngang (giữ nguyên) */}
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className={`absolute inset-0 z-10 bg-gradient-to-r ${
          isNight
            ? "from-indigo-700 via-purple-700 to-fuchsia-500"
            : "from-orange-500 via-yellow-400 to-amber-500"
        } bg-[length:200%_200%] opacity-35`}
      />

      {/* Bubbles (giữ nguyên) */}
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute z-20 rounded-full bg-white/30 blur-3xl"
          style={{
            width: b.size,
            height: b.size,
            left: `${b.x}%`,
            bottom: -b.size,
          }}
          animate={{ y: ["0%", "-120vh"], opacity: [0.5, 0, 0.5] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Nội dung (giữ nguyên) */}
      <div className="relative z-30 container mx-auto px-6 text-center select-none">
        <LogoDraw isNight={isNight} />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-2 md:mt-3 text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
        >
          Sàn thương mại điện tử dành cho sinh viên – Mua bán đồ cũ dễ dàng & uy tín.
        </motion.p>

        {/* Ô tìm kiếm (giữ nguyên) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="mt-6 md:mt-8 mx-auto max-w-2xl"
        >
          <div className="flex items-center rounded-full bg-white/95 shadow-lg overflow-hidden backdrop-blur ring-1 ring-white/40">
            <input
              type="text"
              placeholder="🔍 Tìm kiếm sản phẩm bạn cần..."
              className="flex-1 px-5 py-3 text-gray-700 bg-transparent outline-none"
            />
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 transition">
              Tìm
            </button>
          </div>
          <p className="text-sm text-white/80 mt-3">
            Gợi ý: laptop, giáo trình, xe đạp, quần áo, đồ gia dụng...
          </p>
        </motion.div>
      </div>

      {/* Mờ dần đáy (giữ nguyên) */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-20 z-40
        ${
          isNight
            ? "bg-gradient-to-t from-purple-800/80 to-transparent"
            : "bg-gradient-to-t from-orange-500/80 to-transparent"
        }
        pointer-events-none`}
      />
    </motion.section>
  );
}

/** Logo UniTrade: hiệu ứng “viết tay” (stroke) + fill dần (giữ nguyên) */
function LogoDraw({ isNight }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative inline-block">
        {/* Lớp fill xuất hiện sau stroke */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span
            className={`text-4xl md:text-6xl font-extrabold ${
              isNight ? "text-yellow-100" : "text-white"
            } drop-shadow-lg`}
            style={{ fontFamily: "'Poppins','Inter',system-ui,sans-serif" }}
          >
            UniTrade
          </span>
        </motion.div>

        {/* Stroke vẽ tay */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 900 160"
          className="w-[300px] md:w-[560px] h-auto"
        >
          {splitLetters("UniTrade").map((ch, idx) => (
            <motion.text
              key={idx}
              x={70 + idx * 95}
              y={110}
              fontSize="96"
              fontWeight="800"
              fontFamily="'Poppins','Inter',system-ui,sans-serif"
              fill="transparent"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                vectorEffect: "non-scaling-stroke",
                strokeDasharray: 400,
                strokeDashoffset: 400,
              }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.1, delay: 0.08 * idx, ease: "easeInOut" }}
            >
              {ch}
            </motion.text>
          ))}
        </svg>
      </div>

      {/* Slogan nhỏ */}
      <motion.span
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.45 }}
        className="mt-1 md:mt-2 text-[13px] md:text-sm tracking-wide text-yellow-100/90"
      >
        An Toàn – Tiện Lợi – Tin Cậy
      </motion.span>
    </div>
  );
}

function splitLetters(str) {
  return String(str).split("");
}
