import { User } from "./screens/project-list/search-panel";

const apiUrl = process.env.REACT_APP_API_URL;
let localStorageKey = "__auth_provider_token__";
export const getToken = () => window.localStorage.getItem(localStorageKey);
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};
export const localOut = async () =>
  window.localStorage.removeItem(localStorageKey);
