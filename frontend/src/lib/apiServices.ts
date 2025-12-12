import { api } from "./api";

// ==================== ACTIONS API ====================
export const actionsApi = {
    // Get all action templates
    getTemplates: async () => {
        const response = await api("/actions/templates");
        return response;
    },

    // Get templates by category
    getTemplatesByCategory: async (category: string) => {
        const response = await api(`/actions/templates/${category}`);
        return response;
    },

    // Register a new action
    registerAction: async (templateId: string, note?: string) => {
        const response = await api("/actions", {
            method: "POST",
            body: JSON.stringify({ templateId, note }),
        });
        return response;
    },

    // Get user action history
    getHistory: async (limit?: number, page?: number) => {
        const params = new URLSearchParams();
        if (limit) params.append("limit", limit.toString());
        if (page) params.append("page", page.toString());
        const query = params.toString();
        const response = await api(`/actions/history${query ? `?${query}` : ""}`);
        return response;
    },

    // Get today's actions
    getTodayActions: async () => {
        const response = await api("/actions/today");
        return response;
    },

    // Get user stats
    getStats: async () => {
        const response = await api("/actions/stats");
        return response;
    },
};

// ==================== CHALLENGES API ====================
export const challengesApi = {
    // Get active challenges
    getActive: async () => {
        const response = await api("/challenges");
        return response;
    },

    // Get user challenge progress
    getProgress: async () => {
        const response = await api("/challenges/progress");
        return response;
    },
};

// ==================== RANKING API ====================
export const rankingApi = {
    // Get global ranking
    getGlobal: async () => {
        const response = await api("/rankings");  // Changed from /ranking to /rankings
        return response;
    },
};
