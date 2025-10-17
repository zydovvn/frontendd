import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Smartphone, Laptop, Home, Shirt, Bike, PackageSearch,
  Book, GraduationCap, Camera, Headphones, Music2, MoreHorizontal,
} from "lucide-react";
import { useCategoryFilter } from "@/context/CategoryFilterContext";

/** Danh mục dùng SLUG làm key để đồng bộ API */
const DEFAULT_CATS = [
  { key: "dien-thoai",  label: "Điện thoại",       icon: Smartphone,   color: "text-orange-600"  },
  { key: "laptop",      label: "Laptop",           icon: Laptop,       color: "text-amber-600"   },
  { key: "may-anh",     label: "Máy ảnh",          icon: Camera,       color: "text-violet-600"  },
  { key: "tai-nghe",    label: "Tai nghe",         icon: Headphones,   color: "text-sky-600"     },
  { key: "phu-kien",    label: "Phụ kiện",         icon: PackageSearch,color: "text-teal-600"    },
  { key: "sach",        label: "Sách/Giáo trình",  icon: Book,         color: "text-emerald-600" },
  { key: "hoc-tap",     label: "Đồ học tập",       icon: GraduationCap,color: "text-green-600"   },
  { key: "phong-tro",   label: "Đồ KTX/Phòng trọ", icon: Home,         color: "text-blue-600"    },
  { key: "gia-dung",    label: "Gia dụng",         icon: Home,         color: "text-cyan-600"    },
  { key: "thoi-trang",  label: "Thời trang",       icon: Shirt,        color: "text-pink-600"    },
  { key: "xe",          label: "Xe cộ",            icon: Bike,         color: "text-rose-600"    },
  { key: "nhac-cu",     label: "Nhạc cụ",          icon: Music2,       color: "text-indigo-600"  },
  { key: "khac",        label: "Khác",             icon: MoreHorizontal,color: "text-gray-600"   },
];

export default function CategoryBar({
  countsByKey,
  categories,
  allowedKeys,
  className = "",
}) {
  const { value, multiple, setCategory, toggleCategory } = useCategoryFilter();

  const cats = useMemo(() => {
    const base = categories?.length ? categories : DEFAULT_CATS;
    if (Array.isArray(allowedKeys) && allowedKeys.length) {
      const allow = new Set(allowedKeys);
      return base.filter((c) => allow.has(c.key));
    }
    return base;
  }, [categories, allowedKeys]);

  const selected = Array.isArray(value) ? value : value ? [value] : [];
  const listRef = useRef(null);
  const isActive = (key) => selected.includes(key);

  const onSelect = (key) =>
    multiple ? toggleCategory(key) : setCategory(selected[0] === key ? null : key);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 px-3 py-2 overflow-x-auto ${className}`}
      role="tablist"
      aria-label="Danh mục sản phẩm"
      ref={listRef}
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-max">
        {cats.map((c) => {
          const Icon = c.icon;
          const active = isActive(c.key);
          return (
            <motion.button
              key={c.key}
              role="tab"
              aria-selected={active}
              title={c.label}
              whileTap={{ scale: 0.92 }}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 320, damping: 16 }}
              onClick={() => onSelect(c.key)}
              className={`relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl
                ring-1 ring-gray-100 bg-gray-50 hover:bg-orange-50 text-xs sm:text-sm font-medium
                focus:outline-none focus:ring-2 focus:ring-orange-300
                ${active ? "bg-orange-100 ring-orange-200" : ""}
              `}
            >
              <span className="absolute inset-0 rounded-xl bg-orange-200/0 hover:bg-orange-200/20 transition-colors" />
              <Icon className={`w-5 h-5 ${c.color}`} />
              <span className={`whitespace-nowrap ${active ? "text-orange-700" : "text-gray-700"}`}>
                {c.label}
              </span>

              {countsByKey?.[c.key] > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center">
                  {countsByKey[c.key] > 99 ? "99+" : countsByKey[c.key]}
                </span>
              )}

              {active && (
                <motion.span
                  layoutId="cat-indicator"
                  className="absolute -bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-orange-400"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
