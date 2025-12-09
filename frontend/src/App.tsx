import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/Dashboard";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* página inicial = login */}
                <Route path="/" element={<Login />} />

                {/* destino do redirect após login */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* futuro: /ranking, /challenges, /profile, /badges */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
