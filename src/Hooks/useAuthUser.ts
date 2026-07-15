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
