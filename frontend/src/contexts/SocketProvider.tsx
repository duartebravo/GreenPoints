import React, { createContext, useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface Tip {
  icon: string;
  title: string;
  description: string;
  category: string;
  points?: number;
}

interface TipNotification {
  id: string;
  type: "daily" | "random" | "periodic" | "category";
  tip: Tip;
  timestamp: Date;
  read: boolean;
}

interface SocketContextType {
  socket: Socket | null;
  connected: boolean;
  notifications: TipNotification[];
  unreadCount: number;
  requestRandomTip: () => void;
  requestTipByCategory: (category: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const SocketContext = createContext<SocketContextType | undefined>(
  undefined,
);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState<TipNotification[]>([]);

  const addNotification = useCallback(
    (type: TipNotification["type"], tip: Tip, timestamp: Date) => {
      const newNotification: TipNotification = {
        id: `${Date.now()}-${Math.random()}`,
        type,
        tip,
        timestamp,
        read: false,
      };

      setNotifications((prev) => [newNotification, ...prev].slice(0, 50)); // Manter apenas as últimas 50
    },
    [],
  );

  // Conectar ao Socket.IO
  useEffect(() => {
    const SOCKET_URL =
      import.meta.env.VITE_API_BASE?.replace("/api", "") ||
      "http://localhost:5001";

    const newSocket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    newSocket.on("connect", () => {
      console.log("✅ Conectado ao Socket.IO:", newSocket.id);
      setConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Desconectado do Socket.IO");
      setConnected(false);
    });

    // Receber dica do dia (ao conectar)
    newSocket.on(
      "tip:daily",
      (data: { type: string; tip: Tip; timestamp: string }) => {
        console.log("📅 Dica do dia recebida:", data.tip.title);
        addNotification("daily", data.tip, new Date(data.timestamp));
      },
    );

    // Receber dica aleatória/categoria
    newSocket.on(
      "tip:new",
      (data: {
        type: string;
        tip: Tip;
        category?: string;
        timestamp: string;
      }) => {
        console.log("💡 Nova dica recebida:", data.tip.title);
        addNotification(
          data.type as TipNotification["type"],
          data.tip,
          new Date(data.timestamp),
        );
      },
    );

    // Receber dica periódica (broadcast a cada 10 min)
    newSocket.on(
      "tip:broadcast",
      (data: { type: string; tip: Tip; timestamp: string }) => {
        console.log("📢 Dica periódica recebida:", data.tip.title);
        addNotification("periodic", data.tip, new Date(data.timestamp));
      },
    );

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [addNotification]);

  const requestRandomTip = useCallback(() => {
    if (socket && connected) {
      socket.emit("tip:request");
    }
  }, [socket, connected]);

  const requestTipByCategory = useCallback(
    (category: string) => {
      if (socket && connected) {
        socket.emit("tip:category", { category });
      }
    },
    [socket, connected],
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)),
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const value: SocketContextType = {
    socket,
    connected,
    notifications,
    unreadCount,
    requestRandomTip,
    requestTipByCategory,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
