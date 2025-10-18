import api from "@/lib/api"; // ✅ axios instance
import { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Image as ImageIcon, Smile } from "lucide-react";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";

const API_BASE = import.meta.env.VITE_API_URL; // ✅ string URL cho socket.io & ảnh

// ✅ Socket kết nối tới backend
const socket = io(`${API_BASE}/chat`, {
  path: "/socket.io",
  transports: ["websocket"],
  withCredentials: true,
});

export default function Messages() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { user, token } = useContext(AuthContext);

  const sellerId = location.state?.sellerId;
  const sellerName = location.state?.sellerName;
  const urlConversationId = searchParams.get("c");

  const socketRef = useRef(null);
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  /* SOCKET INIT */
  useEffect(() => {
    if (!user?.id) return;

    socket.auth = { userId: user.id };
    socket.connect();
    socketRef.current = socket;

    socket.on("typing", ({ isTyping }) => setIsTyping(isTyping));
    socket.on("message:new", ({ message }) => {
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

    return () => {
      socket.off("typing");
      socket.off("message:new");
    };
  }, [user?.id, activeChat?.conversation_id]);

  /* LOAD CONVERSATIONS */
  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoadingList(true);
        const { data } = await api.get("/api/messages/conversations");
        setConversations(data || []);
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
          return setActiveChat(
            exist || {
              conversation_id: cid,
              other_user_id: sellerId,
              other_user_name: sellerName,
              unread_count: 0,
              last_message: null,
            }
          );
        }

        if (data.length) setActiveChat(data[0]);
      } catch (err) {
        setLoadingList(false);
        toast.error("Không thể tải danh sách hội thoại");
        console.error(err);
      }
    };
    if (token) loadConversations();
  }, [token]);

  /* LOAD MESSAGES */
  useEffect(() => {
    const loadMessages = async () => {
      if (!activeChat) return;
      socket.emit("join", { conversationId: activeChat.conversation_id });

      try {
        const { data } = await api.get(
          `/api/messages/conversations/${activeChat.conversation_id}/messages?limit=100`
        );
        setMessages(data || []);

        if (data.length) {
          const lastId = data[data.length - 1].id;
          await api.post(
            `/api/messages/conversations/${activeChat.conversation_id}/read`,
            { last_message_id: lastId }
          );
          socket.emit("read", {
            conversationId: activeChat.conversation_id,
            lastMessageId: lastId,
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải tin nhắn");
      }
    };
    loadMessages();
  }, [activeChat]);

  /* AUTO SCROLL */
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  /* SEND MESSAGE */
  const handleSend = async () => {
    if (!newMessage.trim() || !activeChat) return;
    const content = newMessage.trim();
    setSending(true);
    try {
      const { data } = await api.post("/api/messages/send", {
        conversation_id: activeChat.conversation_id,
        content,
        type: "text",
      });
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (err) {
      toast.error("Gửi tin nhắn thất bại");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  /* TYPING */
  const handleTyping = () => {
    if (!activeChat) return;
    socket.emit("typing", {
      conversationId: activeChat.conversation_id,
      isTyping: true,
    });
    setTimeout(() => {
      socket.emit("typing", {
        conversationId: activeChat.conversation_id,
        isTyping: false,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
      {/* Sidebar conversations */}
      <div className="md:w-1/3 border-r bg-white overflow-y-auto">
        <div className="p-4 border-b font-semibold text-lg">Hội thoại</div>
        {loadingList ? (
          <div className="p-4 text-sm text-gray-500">Đang tải...</div>
        ) : conversations.length === 0 ? (
          <div className="p-4 text-sm text-gray-500">Chưa có hội thoại.</div>
        ) : (
          conversations.map((c) => {
            const active = c.conversation_id === activeChat?.conversation_id;
            return (
              <div
                key={c.conversation_id}
                onClick={() => setActiveChat(c)}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b hover:bg-gray-50 ${
                  active ? "bg-orange-50" : ""
                }`}
              >
                <img
                  src={
                    c.other_user_avatar
                      ? `${API_BASE}/${c.other_user_avatar}`
                      : "/logo.png"
                  }
                  alt=""
                  className="w-10 h-10 rounded-full bg-gray-100 object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">
                    {c.other_user_name || "Người dùng"}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {c.last_message?.content || "—"}
                  </div>
                </div>
                {c.unread_count > 0 && (
                  <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                    {c.unread_count}
                  </span>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-white">
        {activeChat ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <div className="flex items-center gap-3">
                <img
                  src={
                    activeChat.other_user_avatar
                      ? `${API_BASE}/${activeChat.other_user_avatar}`
                      : "/logo.png"
                  }
                  alt=""
                  className="w-10 h-10 rounded-full bg-gray-100 object-cover"
                />
                <div className="font-semibold">
                  {activeChat.other_user_name}
                </div>
              </div>
              {isTyping && (
                <div className="text-xs text-gray-500">Đang nhập...</div>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((m) => {
                const mine = String(m.sender_id) === String(user?.id);
                return (
                  <div
                    key={m.id}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                        mine
                          ? "bg-orange-500 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div>{m.content}</div>
                      <div
                        className={`text-[11px] mt-1 ${
                          mine ? "text-orange-100" : "text-gray-500"
                        }`}
                      >
                        {new Date(m.created_at).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t flex items-center gap-2">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  } else {
                    handleTyping();
                  }
                }}
                placeholder="Nhập tin nhắn..."
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={sending}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
              >
                Gửi
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            Chọn một cuộc trò chuyện để bắt đầu.
          </div>
        )}
      </div>
    </div>
  );
}
