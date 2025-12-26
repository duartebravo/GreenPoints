import { useContext } from "react";
import { SocketContext } from "@/contexts/SocketProvider";

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket deve ser usado dentro de SocketProvider");
  }
  return context;
};
