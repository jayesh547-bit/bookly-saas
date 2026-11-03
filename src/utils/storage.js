export const storage = {
  get: (key, fallbackValue) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : fallbackValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return fallbackValue;
    }
  },
  set: (key, value) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  },
  remove: (key) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  },
};

