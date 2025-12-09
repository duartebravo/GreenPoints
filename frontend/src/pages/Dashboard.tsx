export default function Dashboard() {
    const token = localStorage.getItem("token") ?? null;

    return (
        <div className="min-h-dvh flex items-center justify-center">
            <div className="p-8 rounded-2xl border bg-white shadow">
                <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
                {token ? (
                    <p className="text-slate-600">Login OK ✅ (token no localStorage)</p>
                ) : (
                    <p className="text-red-600">Sem token. Faz login primeiro.</p>
                )}
                <button
                    onClick={() => { localStorage.removeItem("token"); window.location.href = "/"; }}
                    className="mt-4 px-4 py-2 rounded bg-slate-900 text-white"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
