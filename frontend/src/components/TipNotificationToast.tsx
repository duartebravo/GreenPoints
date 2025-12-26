import React, { useEffect, useState } from "react";
import { X, Lightbulb, Bell, Calendar, Megaphone } from "lucide-react";

interface Tip {
  icon: string;
  title: string;
  description: string;
  category: string;
  points?: number;
}

interface TipNotificationToastProps {
  id: string;
  type: "daily" | "random" | "periodic" | "category";
  tip: Tip;
  timestamp: Date;
  onClose: (id: string) => void;
  autoClose?: number;
}

const TipNotificationToast: React.FC<TipNotificationToastProps> = ({
  id,
  type,
  tip,
  onClose,
  autoClose = 8000,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Animar entrada
    setTimeout(() => setIsVisible(true), 10);

    // Auto-fechar
    if (autoClose > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [autoClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getTypeIcon = () => {
    switch (type) {
      case "daily":
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case "periodic":
        return <Megaphone className="w-5 h-5 text-green-500" />;
      case "random":
        return <Lightbulb className="w-5 h-5 text-yellow-500" />;
      case "category":
        return <Bell className="w-5 h-5 text-purple-500" />;
      default:
        return <Lightbulb className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "daily":
        return "Dica do Dia";
      case "periodic":
        return "Dica de Sustentabilidade";
      case "random":
        return "Nova Dica";
      case "category":
        return "Dica Especial";
      default:
        return "Dica";
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

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 w-96 max-w-[calc(100vw-2rem)]
        bg-white rounded-lg shadow-2xl border border-gray-200
        transform transition-all duration-300 ease-out
        ${isVisible && !isExiting ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {getTypeIcon()}
          <span className="font-semibold text-gray-800">{getTypeLabel()}</span>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="text-3xl flex-shrink-0">{tip.icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 text-lg mb-1 leading-tight">
              {tip.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {tip.description}
            </p>
            <div className="flex items-center justify-between">
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                  tip.category,
                )}`}
              >
                {tip.category}
              </span>
              {tip.points && (
                <span className="text-green-600 font-semibold text-sm">
                  +{tip.points} pontos
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {autoClose > 0 && (
        <div className="h-1 bg-gray-100 overflow-hidden rounded-b-lg">
          <div
            className="h-full bg-green-500 transition-all ease-linear"
            style={{
              width: "100%",
              animation: `shrink ${autoClose}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default TipNotificationToast;
