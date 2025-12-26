import React, { useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import {
  X,
  Bell,
  BellOff,
  Trash2,
  Calendar,
  Lightbulb,
  Megaphone,
} from "lucide-react";

const NotificationPanel: React.FC = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotifications,
  } = useSocket();
  const [isOpen, setIsOpen] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "daily":
        return <Calendar className="w-4 h-4 text-blue-500" />;
      case "periodic":
        return <Megaphone className="w-4 h-4 text-green-500" />;
      case "random":
        return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case "category":
        return <Bell className="w-4 h-4 text-purple-500" />;
      default:
        return <Lightbulb className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      transporte: "bg-blue-100 text-blue-800",
      energia: "bg-yellow-100 text-yellow-800",
      reciclagem: "bg-green-100 text-green-800",
      água: "bg-cyan-100 text-cyan-800",
      alimentação: "bg-orange-100 text-orange-800",
      consumo: "bg-purple-100 text-purple-800",
    };
    return colors[category.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Agora";
    if (minutes < 60) return `${minutes}m atrás`;
    if (hours < 24) return `${hours}h atrás`;
    return `${days}d atrás`;
  };

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <>
      {/* Botão de Notificações */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Notificações"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Painel de Notificações */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed top-16 right-4 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-2xl z-50 max-h-[600px] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-700" />
                <h2 className="font-bold text-lg text-gray-900">
                  Notificações
                </h2>
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Actions */}
            {notifications.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-100 bg-gray-50">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <BellOff className="w-4 h-4" />
                    Marcar como lidas
                  </button>
                )}
                <button
                  onClick={clearNotifications}
                  className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  Limpar tudo
                </button>
              </div>
            )}

            {/* Lista de Notificações */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <Bell className="w-12 h-12 mb-3 opacity-50" />
                  <p className="text-sm">Nenhuma notificação</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification.id)}
                      className={`p-4 cursor-pointer transition-colors ${
                        notification.read
                          ? "bg-white hover:bg-gray-50"
                          : "bg-blue-50 hover:bg-blue-100"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="text-2xl flex-shrink-0">
                              {notification.tip.icon}
                            </div>
                            <span className="text-xs text-gray-500 flex-shrink-0">
                              {formatTime(notification.timestamp)}
                            </span>
                          </div>
                          <h3
                            className={`font-semibold text-sm mb-1 ${
                              notification.read
                                ? "text-gray-700"
                                : "text-gray-900"
                            }`}
                          >
                            {notification.tip.title}
                          </h3>
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                            {notification.tip.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(
                                notification.tip.category,
                              )}`}
                            >
                              {notification.tip.category}
                            </span>
                            {notification.tip.points && (
                              <span className="text-green-600 font-semibold text-xs">
                                +{notification.tip.points} pts
                              </span>
                            )}
                          </div>
                          {!notification.read && (
                            <div className="mt-2">
                              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NotificationPanel;
