import React, { useEffect, useMemo, useRef, useState, useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Image as ImageIcon,
  Smile,
  Search,
  Ellipsis,
  Filter,
  CircleAlert,
  CheckCheck,
  Check,
  Lock,
} from "lucide-react";
import { io } from "socket.io-client";

import { Button } from "../components/button";
import { Input } from "../components/input";
import { Badge } from "../components/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/dropdown-menu";
import { ScrollArea } from "../components/scroll-area";
import { Separator } from "../components/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/tooltip";
import { Skeleton } from "../components/skeleton";


import { AuthContext } from "../context/AuthContext";
import { buildImg } from "../utils/img";

 const SOCKET_URL = import.meta.env.VITE_API_URL; // ví dụ https://backend-xxxx.up.railway.app
 // Nếu chat chạy namespace "/chat" trên server:
 const socket = io(`${SOCKET_URL}/chat`, {
   path: "/socket.io",
   transports: ["websocket"],        // hoặc ["websocket","polling"]
   withCredentials: true,
   // (tuỳ chọn) gửi auth khi đã có user:
    auth: { userId: user?.id },
 });

/* ===================== Helpers ===================== */

const formatTime = (iso) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const formatRelativeDay = (iso) => {
  const d = new Date(iso);
  const today = new Date();
  const y = new Date();
  y.setDate(today.getDate() - 1);
  const isSame = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  if (isSame(d, today)) return "Hôm nay";
  if (isSame(d, y)) return "Hôm qua";
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "short" });
};

const initials = (name) =>
  (name || "?")
    .split(" ")
    .map((x) => x[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const groupByDay = (msgs) => {
  const g = {};
  msgs.forEach((m) => {
    const k = new Date(m.created_at).toDateString();
    (g[k] ||= []).push(m);
  });
  return Object.entries(g).map(([key, items]) => ({ key, items }));
};

/* ===================== Skeleton ===================== */

const SidebarSkeleton = () => (
  <div className="p-3 space-y-3">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
        </div>
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    ))}
  </div>
);

/* ===================== Tiny UI pieces ===================== */

const Tick = ({ status, mine }) => {
  if (!mine) return null;
  if (status === "error")
    return <CircleAlert className="h-3.5 w-3.5 text-red-500" aria-label="Lỗi gửi" />;
  if (status === "read") return <CheckCheck className="h-3.5 w-3.5 text-slate-400" />;
  if (status === "received") return <CheckCheck className="h-3.5 w-3.5 text-slate-300" />;
  if (status === "sent") return <Check className="h-3.5 w-3.5 text-slate-300" />;
  if (status === "sending") return <Lock className="h-3.5 w-3.5 text-slate-300" />;
  return null;
};

/* ===================== Message bubble ===================== */

const MessageBubble = ({ m, mine, avatarUrl }) => {
  const imgSrc = m.image_url ? buildImg(m.image_url) : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={`flex ${mine ? "justify-end" : "justify-start"} items-end w-full`}
    >
      {!mine && (
        <div className="mr-2 flex-shrink-0">
          <Avatar className="h-8 w-8">
            {avatarUrl ? (
              <AvatarImage src={buildImg(avatarUrl)} alt="avatar" />
            ) : (
              <AvatarFallback className="text-[10px]">?</AvatarFallback>
            )}
          </Avatar>
        </div>
      )}

      <div
        className={`flex flex-col max-w-[75%] sm:max-w-[70%] md:max-w-[60%] ${
          mine ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`bubble rounded-2xl px-3.5 py-2 shadow-sm ring-1 whitespace-pre-wrap break-words
          ${
            mine
              ? "bg-orange-500 text-white rounded-br-md ring-orange-400/20"
              : "bg-white text-slate-800 rounded-bl-md ring-slate-200"
          }`}
          style={{ wordBreak: "break-word" }}
        >
          {imgSrc && (
            <img
              src={imgSrc}
              alt="attachment"
              className="rounded-xl max-w-full mb-2 object-cover"
            />
          )}
          {m.content && <p className="text-[15px] leading-6">{m.content}</p>}
          <div
            className={`mt-1 flex items-center gap-1 text-[11px] ${
              mine ? "justify-end" : "justify-start"
            }`}
          >
            <span className={mine ? "text-orange-50/90" : "text-slate-400"}>
              {formatTime(m.created_at)}
            </span>
            <Tick status={m.status} mine={mine} />
          </div>
        </div>
      </div>

      {mine && (
        <div className="ml-2 flex-shrink-0">
          <Avatar className="h-8 w-8">
            {avatarUrl ? (
              <AvatarImage src={buildImg(avatarUrl)} alt="me" />
            ) : (
              <AvatarFallback className="text-[10px]">ME</AvatarFallback>
            )}
          </Avatar>
        </div>
      )}
    </motion.div>
  );
};

/* ===================== Conversation item ===================== */

const ConversationItem = ({ c, active, onClick }) => {
  const av = c.other_user_avatar ? buildImg(c.other_user_avatar) : null;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-xl p-3 text-left transition-colors
      ${active ? "bg-orange-50" : "hover:bg-slate-100/60"}`}
    >
      <Avatar className="h-10 w-10 shrink-0">
        {av ? (
          <AvatarImage src={av} alt={c.other_user_name} />
        ) : (
          <AvatarFallback>{initials(c.other_user_name)}</AvatarFallback>
        )}
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate font-medium text-slate-800">
            {c.other_user_name || "Người dùng"}
          </p>
          {!!c.unread_count && (
            <Badge className="bg-orange-500 hover:bg-orange-600 text-white rounded-full leading-none">
              {c.unread_count}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="truncate">
            {c.last_message?.content ||
              (c.last_message?.image_url ? "🖼 Hình ảnh" : "—")}
          </span>
          {c.last_message?.created_at && (
            <span className="shrink-0">• {formatTime(c.last_message.created_at)}</span>
          )}
        </div>
      </div>
    </button>
  );
};

/* ===================== Page ===================== */

export default function Messages() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, token } = useContext(AuthContext) || {};

  const sellerId = location.state?.sellerId;
  const sellerName = location.state?.sellerName;
  const urlConversationId = searchParams.get("c");

  const socketRef = useRef(null);
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);

  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [query, setQuery] = useState("");
  const [loadingList, setLoadingList] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [nearBottom, setNearBottom] = useState(true);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const myAvatar = user?.avatar || user?.avatar_url || user?.photo || null;
  const otherAvatar = activeChat?.other_user_avatar || null;

  /* socket */
  useEffect(() => {
    if (!user) return;
    const sock = io(`${API}/chat`, {
      auth: { userId: user.id },
      transports: ["websocket"],
    });
    socketRef.current = sock;

    sock.on("typing", ({ isTyping }) => setIsTyping(!!isTyping));
    sock.on("message:new", ({ message }) => {
      if (message.conversation_id === activeChat?.conversation_id) {
        setMessages((prev) => [...prev, message]);
      } else {
        setConversations((prev) =>
          prev.map((c) =>
            c.conversation_id === message.conversation_id
              ? {
                  ...c,
                  unread_count: (c.unread_count || 0) + 1,
                  last_message: message,
                }
              : c
          )
        );
      }
    });

    return () => sock.disconnect();
  }, [user, activeChat?.conversation_id]);

  /* conversations */
  useEffect(() => {
    const load = async () => {
      setLoadingList(true);
      const { data } = await api.get("/api/messages/conversations");
      setConversations(data);
      setLoadingList(false);

      if (urlConversationId) {
        const found = data.find(
          (c) => String(c.conversation_id) === String(urlConversationId)
        );
        if (found) return setActiveChat(found);
      }
      if (sellerId && sellerName) {
        const ensure = await api.post("/api/messages/ensure", {
          other_user_id: sellerId,
        });
        const cid = ensure.data.conversation_id;
        const exist = data.find((c) => c.conversation_id === cid);
        setActiveChat(
          exist || {
            conversation_id: cid,
            other_user_id: sellerId,
            other_user_name: sellerName,
            unread_count: 0,
            last_message: null,
          }
        );
        return;
      }
      if (data.length) setActiveChat(data[0]);
    };
    if (token) load();
  }, [token]);

  /* messages for active chat */
  useEffect(() => {
    const load = async () => {
      if (!activeChat) return;
      socketRef.current?.emit("join", {
        conversationId: activeChat.conversation_id,
      });
      const { data } = await api.get(
        `/api/messages/conversations/${activeChat.conversation_id}/messages?limit=200`
      );
      setMessages(data);

      if (data.length) {
        const lastId = data[data.length - 1].id;
        await api.post(
          `/api/messages/conversations/${activeChat.conversation_id}/read`,
          { last_message_id: lastId }
        );
        socketRef.current?.emit("read", {
          conversationId: activeChat.conversation_id,
          lastMessageId: lastId,
        });
      }
    };
    load();
  }, [activeChat]);

  /* scroll behavior */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 150;
      setNearBottom(atBottom);
      setShowScrollBtn(!atBottom);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (nearBottom && bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, nearBottom]);

  /* derived */
  const filteredConversations = useMemo(() => {
    let list = conversations;
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          (c.other_user_name || "").toLowerCase().includes(q) ||
          (c.last_message?.content || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [conversations, query]);

  if (!token)
    return (
      <div className="flex h-[80vh] items-center justify-center text-slate-500">
        Bạn cần đăng nhập để xem tin nhắn.
      </div>
    );

  /* actions */
  const handleSend = async () => {
    const text = newMessage.trim();
    if (!text || !activeChat) return;
    setNewMessage("");

    const temp = {
      id: `temp-${Date.now()}`,
      sender_id: user.id,
      content: text,
      created_at: new Date().toISOString(),
      status: "sending",
    };
    setMessages((prev) => [...prev, temp]);

    try {
      const { data: saved } = await api.post(
        `/api/messages/conversations/${activeChat.conversation_id}/messages`,
        { content: text }
      );
      socketRef.current?.emit("message:send", {
        conversationId: activeChat.conversation_id,
        message: saved,
      });
      setMessages((prev) =>
        prev.map((m) => (m.id === temp.id ? { ...saved, status: "sent" } : m))
      );
      setConversations((prev) =>
        prev.map((c) =>
          c.conversation_id === activeChat.conversation_id
            ? { ...c, last_message: saved, unread_count: 0 }
            : c
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) => (m.id === temp.id ? { ...m, status: "error" } : m))
      );
    }
  };

  /* render */
  return (
    <div className="h-[80vh] w-full rounded-2xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
      <div className="grid h-full grid-cols-12">
        {/* Sidebar 35% */}
        <aside className="col-span-4 border-r bg-slate-50/60 flex flex-col min-w-0">
          <div className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
            <div className="flex items-center gap-2 p-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm theo tên, nội dung…"
                  className="pl-9"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Lọc
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Bộ lọc</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => {}}>Tất cả</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>Chưa đọc</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {}}>Có media</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <ScrollArea className="flex-1">
            {loadingList ? (
              <SidebarSkeleton />
            ) : filteredConversations.length ? (
              <div className="p-2 space-y-1">
                {filteredConversations.map((c) => (
                  <ConversationItem
                    key={c.conversation_id}
                    c={c}
                    active={activeChat?.conversation_id === c.conversation_id}
                    onClick={() => setActiveChat(c)}
                  />
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm p-6">
                Chưa có cuộc trò chuyện
              </div>
            )}
          </ScrollArea>
        </aside>

        {/* Chat 65% */}
        <section className="col-span-8 flex flex-col min-w-0 bg-slate-50 relative">
          {activeChat ? (
            <>
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/90 px-4 py-3 backdrop-blur">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="h-10 w-10">
                    {otherAvatar ? (
                      <AvatarImage src={buildImg(otherAvatar)} alt={activeChat.other_user_name} />
                    ) : (
                      <AvatarFallback>{initials(activeChat.other_user_name)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">
                        {activeChat.other_user_name || "—"}
                      </h3>
                      <Badge variant="secondary" className="rounded-full text-[11px]">
                        Người bán
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {isTyping ? "đang nhập..." : activeChat.other_is_online ? "Online" : "Offline"}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Ellipsis className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Hành động</DropdownMenuLabel>
                    <DropdownMenuItem>Xem hồ sơ</DropdownMenuItem>
                    <DropdownMenuItem>Ghim hội thoại</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Chặn</DropdownMenuItem>
                    <DropdownMenuItem>Báo cáo</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Messages area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 chat-scroll">
                <div className="mx-auto max-w-3xl">
                  {groupByDay(messages).map((g) => (
                    <div key={g.key} className="mb-3">
                      <div className="text-center text-xs text-slate-500 my-2">
                        <span className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1">
                          {formatRelativeDay(g.items[0].created_at)}
                        </span>
                      </div>
                      <AnimatePresence initial={false} mode="popLayout">
                        <div className="flex flex-col gap-2">
                          {g.items.map((m) => (
                            <MessageBubble
                              key={m.id}
                              m={m}
                              mine={m.sender_id === user?.id}
                              avatarUrl={m.sender_id === user?.id ? myAvatar : otherAvatar}
                            />
                          ))}
                        </div>
                      </AnimatePresence>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
              </div>

              {/* Scroll-to-bottom button */}
              {showScrollBtn && (
                <motion.button
                  onClick={() =>
                    scrollRef.current?.scrollTo({
                      top: scrollRef.current.scrollHeight,
                      behavior: "smooth",
                    })
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="scroll-btn fixed bottom-24 right-10 z-30 rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 p-3"
                  title="Cuộn xuống cuối"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.button>
              )}

              {/* Composer */}
              <div className="composer p-3 bg-white border-t">
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10">
                          <Smile className="h-5 w-5 text-slate-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Emoji</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10">
                          <ImageIcon className="h-5 w-5 text-slate-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Đính kèm ảnh</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Input
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);
                      socketRef.current?.emit("typing", {
                        conversationId: activeChat.conversation_id,
                        isTyping: true,
                      });
                      window.clearTimeout(Input._t);
                      Input._t = window.setTimeout(() => {
                        socketRef.current?.emit("typing", {
                          conversationId: activeChat.conversation_id,
                          isTyping: false,
                        });
                      }, 1200);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Nhập tin nhắn…"
                    className="flex-1 rounded-full px-5 py-5 text-[15px] focus-visible:ring-orange-400"
                  />
                  <Button onClick={handleSend} className="btn-send h-10 w-10 flex items-center justify-center rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  Enter = gửi · Shift+Enter = xuống dòng
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500">
              Chọn một cuộc trò chuyện để bắt đầu
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
