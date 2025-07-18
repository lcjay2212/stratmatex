import { storage } from "@/constant/storage";

export const clearStorage = (): void => {
  const items = [
    storage.REFRESH_TOKEN,
    storage.SMX_USER_DETAILS,
    storage.SMX_USER_TOKEN,
    "user-storage", // Zustand user store persistence
  ];
  items.forEach((item) => localStorage.removeItem(item));
};
