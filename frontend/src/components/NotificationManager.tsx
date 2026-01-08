import React, { useState, useRef } from "react";
import { useSocket } from "@/hooks/useSocket";
import TipNotificationToast from "./TipNotificationToast";

interface ActiveNotification {
  id: string;
  type: "daily" | "random" | "periodic" | "category";
  tip: {
    icon: string;
    title: string;
    description: string;
    category: string;
    points?: number;
  };
  timestamp: Date;
}

const NotificationManager: React.FC = () => {
  const { notifications } = useSocket();
  const [activeNotifications, setActiveNotifications] = useState<
    ActiveNotification[]
  >([]);
  const shownNotificationIds = useRef(new Set<string>());
  const lastNotificationId = useRef<string | null>(null);

  // Processar novas notificações
  React.useEffect(() => {
    if (notifications.length > 0) {
      const latestNotification = notifications[0];

      // Verificar se é uma notificação nova e não lida
      if (
        latestNotification.id !== lastNotificationId.current &&
        !latestNotification.read &&
        !shownNotificationIds.current.has(latestNotification.id)
      ) {
        lastNotificationId.current = latestNotification.id;
        shownNotificationIds.current.add(latestNotification.id);

        // Usar setTimeout para evitar setState síncrono no effect
        const timer = setTimeout(() => {
          setActiveNotifications((prev) => [
            ...prev,
            {
              id: latestNotification.id,
              type: latestNotification.type,
              tip: latestNotification.tip,
              timestamp: latestNotification.timestamp,
            },
          ]);
        }, 0);

        return () => clearTimeout(timer);
      }
    }
  }, [notifications]);

  const handleCloseNotification = (id: string) => {
    setActiveNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4 pointer-events-none">
      <div className="space-y-4 pointer-events-auto">
        {activeNotifications.map((notification, index) => (
          <div
            key={notification.id}
            style={{
              transform: `translateY(${index * 10}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <TipNotificationToast
              id={notification.id}
              type={notification.type}
              tip={notification.tip}
              timestamp={notification.timestamp}
              onClose={handleCloseNotification}
              autoClose={8000}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationManager;
