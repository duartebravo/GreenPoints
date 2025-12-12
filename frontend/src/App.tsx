import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";
import { PrivateRoute } from "@/components/PrivateRoute";
import Login from "@/pages/auth/Login";
import Dashboard from "@/pages/Dashboard";
import Ranking from "@/pages/Ranking";
import Actions from "@/pages/Actions";
import Challenges from "@/pages/Challenges";
import Profile from "@/pages/Profile";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* página inicial = login */}
                    <Route path="/" element={<Login />} />

                    {/* rotas protegidas */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/ranking"
                        element={
                            <PrivateRoute>
                                <Ranking />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/actions"
                        element={
                            <PrivateRoute>
                                <Actions />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/challenges"
                        element={
                            <PrivateRoute>
                                <Challenges />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />

                    {/* Redirect unknown routes to login */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

