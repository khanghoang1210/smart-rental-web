export const customStorage = {
    getItem: (name: string) => {
      const storedValue = localStorage.getItem(name);
      if (storedValue) {
        return JSON.parse(storedValue); // Parse the stored string into JSON
      }
      return null;
    },
    setItem: (name: string, value: unknown) => {
      localStorage.setItem(name, JSON.stringify(value)); // Convert to string and store
    },
    removeItem: (name: string) => {
      localStorage.removeItem(name); // Remove item from localStorage
    },
  };