// import { Mail, Phone, Home } from "lucide-react";
// import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="flex-shrink-0 relative z-[5] text-white">
//       {/* Nền gradient + overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400" />
//       <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

//       {/* Nội dung chính */}
//       <div className="relative max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-12">
//         {/* Cột 1: Giới thiệu */}
//         <div>
//           <h2 className="text-3xl font-extrabold mb-4">UniTrade</h2>
//           <p className="text-sm leading-relaxed opacity-90">
//             Nền tảng trung gian giúp sinh viên dễ dàng mua bán đồ cũ, giáo trình, thiết bị học tập
//             và nhiều hơn nữa. An toàn – Tiện lợi – Tin cậy.
//           </p>

//           {/* Mạng xã hội */}
//           <div className="flex gap-4 mt-5">
//             <a
//               href="https://facebook.com"
//               className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-orange-600 transition"
//             >
//               <FaFacebookF size={16} />
//             </a>
//             <a
//               href="https://instagram.com"
//               className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-orange-600 transition"
//             >
//               <FaInstagram size={16} />
//             </a>
//             <a
//               href="https://github.com"
//               className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-orange-600 transition"
//             >
//               <FaGithub size={16} />
//             </a>
//           </div>
//         </div>

//         {/* Cột 2: Liên kết nhanh */}
//         <div className="border-l border-white/30 pl-8">
//           <h3 className="font-semibold mb-4 text-lg">Liên kết</h3>
//           <ul className="space-y-2 text-sm">
//             <li>
//               <a href="/" className="hover:text-yellow-200 transition font-medium">
//                 Trang chủ
//               </a>
//             </li>
//             <li>
//               <a href="/products" className="hover:text-yellow-200 transition font-medium">
//                 Tìm kiếm sản phẩm
//               </a>
//             </li>
//             <li>
//               <a href="/myposts" className="hover:text-yellow-200 transition font-medium">
//                 Tin đã đăng
//               </a>
//             </li>
//             <li>
//               <a href="/profile" className="hover:text-yellow-200 transition font-medium">
//                 Hồ sơ cá nhân
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Cột 3: Liên hệ */}
//         <div className="border-l border-white/30 pl-8">
//           <h3 className="font-semibold mb-4 text-lg">Liên hệ</h3>
//           <div className="flex items-center space-x-2 text-sm mb-2">
//             <Mail size={16} /> <span>support@unitrade.vn</span>
//           </div>
//           <div className="flex items-center space-x-2 text-sm mb-2">
//             <Phone size={16} /> <span>0123-456-789</span>
//           </div>
//           <div className="flex items-center space-x-2 text-sm mb-4">
//             <Home size={16} /> <span>Hà Nội, Việt Nam</span>
//           </div>
//           <p className="text-xs opacity-80 italic">
//             Hỗ trợ sinh viên 24/7 qua email và fanpage chính thức.
//           </p>
//         </div>
//       </div>

//       {/* Thanh dưới cùng */}
//       <div className="relative bg-orange-600/90 text-center py-4 text-sm font-medium">
//         © {new Date().getFullYear()} <b>UniTrade</b>. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// import { Mail, Phone, Home } from "lucide-react";
// import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="relative text-gray-100">
//       {/* ===== Layer nền gradient nhẹ + blur ===== */}
//       <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400" />
//       <div className="absolute inset-0 bg-black/10 backdrop-blur-[1.5px]" />

//       {/* ===== Nội dung chính ===== */}
//       <div className="relative max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
//         {/* === Cột 1: Thương hiệu === */}
//         <div>
//           <h2 className="text-3xl font-extrabold mb-4 tracking-tight drop-shadow-sm">
//             UniTrade
//           </h2>
//           <p className="text-sm leading-relaxed text-white/90">
//             Nền tảng giúp sinh viên trao đổi đồ cũ, giáo trình và thiết bị học tập
//             một cách <b>an toàn</b>, <b>tiện lợi</b> và <b>tin cậy</b>.
//           </p>

//           {/* Mạng xã hội */}
//           <div className="flex gap-3 mt-6">
//             {[
//               { icon: FaFacebookF, href: "https://facebook.com" },
//               { icon: FaInstagram, href: "https://instagram.com" },
//               { icon: FaGithub, href: "https://github.com" },
//             ].map(({ icon: Icon, href }, i) => (
//               <a
//                 key={i}
//                 href={href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center hover:bg-white hover:text-orange-600 transition-all duration-200"
//               >
//                 <Icon size={17} className="group-hover:scale-110 transition-transform" />
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* === Cột 2: Liên kết nhanh === */}
//         <div className="pl-0 md:pl-8">
//           <h3 className="font-semibold mb-4 text-lg">Liên kết nhanh</h3>
//           <ul className="space-y-2 text-sm">
//             {[
//               { label: "Trang chủ", href: "/" },
//               { label: "Tìm kiếm sản phẩm", href: "/products" },
//               { label: "Tin đã đăng", href: "/myposts" },
//               { label: "Hồ sơ cá nhân", href: "/profile" },
//             ].map((item) => (
//               <li key={item.href}>
//                 <a
//                   href={item.href}
//                   className="inline-flex items-center gap-2 hover:text-yellow-200 transition-colors group"
//                 >
//                   <span className="block w-1 h-1 rounded-full bg-white/60 group-hover:bg-yellow-300 transition-all"></span>
//                   <span className="font-medium">{item.label}</span>
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* === Cột 3: Liên hệ === */}
//         <div className="pl-0 md:pl-8">
//           <h3 className="font-semibold mb-4 text-lg">Liên hệ</h3>
//           <div className="space-y-2 text-sm">
//             <div className="flex items-center gap-2 opacity-90">
//               <Mail size={16} /> unitrade401@gmail.com
//             </div>
//             <div className="flex items-center gap-2 opacity-90">
//               <Phone size={16} /> 0834045971
//             </div>
//             <div className="flex items-center gap-2 opacity-90">
//               <Home size={16} /> 600 NVC nối dài, phường An Bình, thành phố Cần Thơ
//             </div>
//           </div>
//           <p className="mt-4 text-xs text-white/80 italic leading-relaxed">
//             Hỗ trợ sinh viên 24/7 qua email hoặc fanpage chính thức của UniTrade.
//           </p>
//         </div>
//       </div>

//       {/* ===== Dòng bản quyền cuối ===== */}
//       <div className="relative bg-white/10 backdrop-blur-sm text-center py-4 text-sm text-white/90 border-t border-white/20">
//         <span>
//           © {new Date().getFullYear()} <b>UniTrade</b> —{" "}
//           <span className="text-yellow-200">Kết nối sinh viên – Kết nối niềm tin.</span>
//         </span>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


// src/components/common/Footer.jsx
import { Mail, Phone, Home } from "lucide-react";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function Footer() {
  const { user } = useAuth();

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Email không hợp lệ!");
      return;
    }
    alert("✅ Đã đăng ký nhận ưu đãi UniTrade!");
    e.target.reset();
  };

  return (
    <footer className="relative text-gray-100 mt-10 overflow-hidden">
      {/* NỀN GRADIENT CAM–VÀNG */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400" />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[1.5px]" />

      {/* NỘI DUNG CHÍNH */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3"
      >
        {/* Cột 1 */}
        <motion.div variants={fade} custom={0}>
          <h2 className="text-3xl font-extrabold mb-4 tracking-tight drop-shadow-sm">
            UniTrade
          </h2>
          <p className="text-sm leading-relaxed text-white/90 max-w-md">
            Nền tảng giúp sinh viên trao đổi đồ cũ, giáo trình và thiết bị học tập
            một cách <b>an toàn</b>, <b>tiện lợi</b> và <b>tin cậy</b>.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/post/create"
              className="px-4 py-2 rounded-xl bg-white text-orange-600 font-semibold hover:brightness-95 shadow transition"
            >
              Đăng tin miễn phí
            </a>
            <form
              onSubmit={handleSubscribe}
              className="flex items-center gap-2 bg-white/15 backdrop-blur px-2 py-1 rounded-xl ring-1 ring-white/30"
              aria-label="Đăng ký nhận ưu đãi qua email"
            >
              <input
                name="email"
                type="email"
                required
                placeholder="Email của bạn"
                className="bg-transparent outline-none px-2 py-1 text-white placeholder:text-white/70"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-black/20 rounded-lg hover:bg-black/30 text-sm"
              >
                Đăng ký
              </button>
            </form>
          </div>

          <div className="flex gap-3 mt-6">
            {[
              { icon: FaFacebookF, href: "https://facebook.com" },
              { icon: FaInstagram, href: "https://instagram.com" },
              { icon: FaGithub, href: "https://github.com" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Liên kết mạng xã hội"
                className="group w-10 h-10 rounded-full border border-white/30 bg-white/10 flex items-center justify-center hover:bg-white hover:text-orange-600 transition-all duration-200"
              >
                <Icon size={17} className="group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Cột 2 */}
        <motion.div variants={fade} custom={1} className="pl-0 md:pl-8">
          <h3 className="font-semibold mb-4 text-lg">Liên kết nhanh</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/products" className="hover:text-yellow-200 transition-colors">
                Tìm kiếm sản phẩm
              </a>
            </li>
            {user ? (
              <>
                <li>
                  <a href="/myposts" className="hover:text-yellow-200 transition-colors">
                    Tin đã đăng
                  </a>
                </li>
                <li>
                  <a href="/profile" className="hover:text-yellow-200 transition-colors">
                    Hồ sơ cá nhân
                  </a>
                </li>
              </>
            ) : (
              <li>
                <a href="/login" className="hover:text-yellow-200 transition-colors">
                  Đăng nhập / Đăng ký
                </a>
              </li>
            )}
            <li>
              <a href="/about" className="hover:text-yellow-200 transition-colors">
                Về UniTrade
              </a>
            </li>
          </ul>
        </motion.div>

        {/* Cột 3 */}
        <motion.div variants={fade} custom={2} className="pl-0 md:pl-8">
          <h3 className="font-semibold mb-4 text-lg">Liên hệ</h3>
          <div className="space-y-2 text-sm opacity-95">
            <div className="flex items-center gap-2">
              <Mail size={16} /> support@unitrade.vn
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} /> 0123-456-789
            </div>
            <div className="flex items-center gap-2">
              <Home size={16} /> Hà Nội, Việt Nam
            </div>
          </div>
          <p className="mt-4 text-xs text-white/85 italic leading-relaxed">
            Hỗ trợ sinh viên 24/7 qua email hoặc fanpage chính thức của UniTrade.
          </p>
        </motion.div>
      </motion.div>

      {/* TRUST BADGES – reveal */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative border-t border-white/15"
      >
        <motion.div
          variants={fade}
          className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-white/90"
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-emerald-300 rounded-full" />
            Giao dịch an toàn
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-yellow-300 rounded-full" />
            Hoàn tiền khi có tranh chấp
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-sky-300 rounded-full" />
            Hỗ trợ 24/7
          </div>
        </motion.div>
      </motion.div>

      {/* COPYRIGHT BAR – reveal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="relative bg-white/10 backdrop-blur-sm text-center py-4 text-sm text-white/90 border-t border-white/20"
      >
        <span>
          © {new Date().getFullYear()} <b>UniTrade</b> •{" "}
          <span className="text-yellow-200">Kết nối sinh viên – Kết nối niềm tin.</span>
        </span>
        <div className="mt-1 space-x-2">
          <a href="/terms" className="underline hover:text-yellow-200">Điều khoản</a>
          <span>•</span>
          <a href="/privacy" className="underline hover:text-yellow-200">Bảo mật</a>
          <span>•</span>
          <a href="/cookies" className="underline hover:text-yellow-200">Cookie</a>
        </div>
      </motion.div>

      {/* BACK TO TOP */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Lên đầu trang"
        className="fixed bottom-6 right-6 z-40 rounded-full bg-orange-600 text-white w-10 h-10 shadow-lg hover:bg-orange-700 transition"
      >
        ↑
      </button>
    </footer>
  );
}
