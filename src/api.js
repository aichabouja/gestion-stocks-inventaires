const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
}

export async function api(method, path, body) {
  const headers = { Accept: "application/json" };
  const token = getToken();

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(API_URL + path, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined
    });
  } catch {
    throw new Error("Impossible de contacter le serveur. Vérifiez que Laravel est démarré.");
  }

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const firstError = data?.errors ? Object.values(data.errors)[0][0] : null;
    const error = new Error(firstError || data?.message || "Une erreur est survenue.");
    error.status = response.status;
    throw error;
  }

  return data;
}
