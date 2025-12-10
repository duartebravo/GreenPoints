import { useState } from "react";
import { Leaf, Mail, Lock, User, GraduationCap, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";

export default function LoginMockup() {
    const [showPassword, setShowPassword] = useState(false);

    // login
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState<string | null>(null);
    const [loginLoading, setLoginLoading] = useState(false);

    // register
    const [name, setName] = useState("");
    const [regEmail, setRegEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [regConfirm, setRegConfirm] = useState("");
    const [regError, setRegError] = useState<string | null>(null);
    const [regLoading, setRegLoading] = useState(false);

    const ipvcRegex = /^[a-zA-Z0-9._%+-]+@ipvc\.pt$/;

    async function handleLogin() {
        setLoginError(null);

        if (!ipvcRegex.test(loginEmail)) {
            setLoginError("O email tem de ser institucional @ipvc.pt");
            return;
        }
        if (!loginPassword) {
            setLoginError("Indica a palavra-passe.");
            return;
        }

        try {
            setLoginLoading(true);
            const data = await api<{ token: string }>("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            });
            localStorage.setItem("token", data.token);
            window.location.href = "/dashboard";
        } catch (e: any) {
            setLoginError(e.message || "Erro no login");
        } finally {
            setLoginLoading(false);
        }
    }

    async function handleRegister() {
        setRegError(null);

        if (!name.trim()) return setRegError("Indica o teu nome completo.");
        if (!ipvcRegex.test(regEmail)) return setRegError("O email tem de ser @ipvc.pt");
        if (regPassword.length < 8) return setRegError("A palavra-passe deve ter pelo menos 8 caracteres.");
        if (regPassword !== regConfirm) return setRegError("As palavras-passe não coincidem.");

        try {
            setRegLoading(true);
            await api("/auth/register", {
                method: "POST",
                body: JSON.stringify({ name, email: regEmail, password: regPassword }),
            });
            // simples feedback; poderias usar toast do shadcn mais tarde
            window.alert("Conta criada com sucesso! Já podes iniciar sessão.");
        } catch (e: any) {
            setRegError(e.message || "Erro no registo");
        } finally {
            setRegLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-6 sm:p-8 text-white text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-12 h-12 text-emerald-600" />
                </div>
                <h1 className="mb-2 text-2xl font-semibold">GreenPoints+</h1>
                <p className="text-sm opacity-90">Sustentabilidade na ESTG - IPVC</p>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
                <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="login">Entrar</TabsTrigger>
                        <TabsTrigger value="register">Registar</TabsTrigger>
                    </TabsList>

                    {/* LOGIN */}
                    <TabsContent value="login" className="space-y-4 mt-0">
                        <Card className="border-emerald-200 p-2 sm:p-3 md:p-4">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-emerald-700 text-center">Bem-vindo de volta!</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-slate-700">
                                        <Mail className="w-4 h-4" /> Email institucional
                                    </Label>
                                    <Input
                                        type="email"
                                        placeholder="exemplo@ipvc.pt"
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        className="h-10 sm:h-12 text-sm sm:text-base"
                                    />
                                    <p className="text-xs text-slate-500">Usa o teu email institucional da ESTG/IPVC.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-slate-700">
                                        <Lock className="w-4 h-4" /> Palavra-passe
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((v) => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {loginError && <p className="text-sm text-red-600">{loginError}</p>}

                                <Button
                                    onClick={handleLogin}
                                    disabled={loginLoading}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 h-11"
                                >
                                    {loginLoading ? "A entrar..." : "Entrar"}
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 p-2 sm:p-3 md:p-4">
                            <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                                        <GraduationCap className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-900 mb-1">Apenas para comunidade ESTG</p>
                                        <p className="text-xs text-slate-600">
                                            App exclusiva para estudantes, docentes e funcionários da ESTG-IPVC.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* REGISTO */}
                    <TabsContent value="register" className="space-y-4 mt-0">
                        <Card className="border-emerald-200 p-2 sm:p-3 md:p-4">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-emerald-700 text-center">Cria a tua conta</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-slate-700">
                                        <User className="w-4 h-4" /> Nome completo
                                    </Label>
                                    <Input
                                        type="text"
                                        placeholder="Ex: João Silva"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-10 sm:h-12 text-sm sm:text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-slate-700">
                                        <Mail className="w-4 h-4" /> Email institucional
                                    </Label>
                                    <Input
                                        type="email"
                                        placeholder="exemplo@ipvc.pt"
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        className="h-10 sm:h-12 text-sm sm:text-base"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-slate-700">
                                        <Lock className="w-4 h-4" /> Palavra-passe
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={regPassword}
                                            onChange={(e) => setRegPassword(e.target.value)}
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((v) => !v)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500">Mínimo 8 caracteres.</p>
                                </div>

                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2 text-slate-700">
                                        <Lock className="w-4 h-4" /> Confirmar palavra-passe
                                    </Label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={regConfirm}
                                        onChange={(e) => setRegConfirm(e.target.value)}
                                        className="h-10 sm:h-12 text-sm sm:text-base"
                                    />
                                </div>

                                {regError && <p className="text-sm text-red-600">{regError}</p>}

                                <Button
                                    onClick={handleRegister}
                                    disabled={regLoading}
                                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 h-11"
                                >
                                    {regLoading ? "A criar conta..." : "Criar Conta"}
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-blue-50 to-emerald-50 border-blue-200 p-2 sm:p-3 md:p-4">
                            <CardContent className="p-4">
                                <h4 className="text-slate-900 mb-3 text-center">Ao registares-te terás acesso a:</h4>
                                <div className="space-y-2 text-sm text-slate-700">
                                    {["Sistema de pontos e recompensas", "Rankings e competições", "Badges e conquistas exclusivas", "Descontos e prémios"].map((t) => (
                                        <div key={t} className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                            <span>{t}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-500">© 2025 ESTG - Instituto Politécnico de Viana do Castelo</p>
                </div>
            </div>
        </div>
    );
}
