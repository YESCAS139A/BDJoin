export function isAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  return !!token;
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function logout(): void {
  localStorage.removeItem("token");
}

// Cuando tengas el endpoint /me, esta función cambia a:
// export async function fetchCurrentUser() {
//   const { data } = await api.get("/me");
//   return data;
// }