export const token = {
  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    return !!token;
  },

  set(token: string) {
    return localStorage.setItem("token", token);
  },

  retrieve(): string | null {
    return localStorage.getItem("token");
  },

  clear(): void {
    localStorage.removeItem("token");
  },
};
