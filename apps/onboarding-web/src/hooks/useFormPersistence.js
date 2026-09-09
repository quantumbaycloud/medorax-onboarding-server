// src/hooks/useFormPersistence.js

import { useState, useEffect, useCallback } from 'react';

export const useFormPersistence = (storageKey, initialData = {}) => {
  const [data, setData] = useState(() => {
    // Try to load from localStorage on initial render
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error(`Error loading data from ${storageKey}:`, error);
        return initialData;
      }
    }
    return initialData;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [data, storageKey]);

  // Save data to localStorage manually
  const saveData = useCallback((newData) => {
    setData(newData);
    localStorage.setItem(storageKey, JSON.stringify(newData));
  }, [storageKey]);

  // Clear data from localStorage
  const clearData = useCallback(() => {
    localStorage.removeItem(storageKey);
    setData({});
  }, [storageKey]);

  // Load data from localStorage
  const loadData = useCallback(() => {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData(parsedData);
        return parsedData;
      } catch (error) {
        console.error(`Error loading data from ${storageKey}:`, error);
        return null;
      }
    }
    return null;
  }, [storageKey]);

  return {
    data,
    setData,
    saveData,
    clearData,
    loadData,
  };
};