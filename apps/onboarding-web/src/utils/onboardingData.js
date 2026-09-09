// src/utils/onboardingData.js
export const OnboardingData = {
  // Save data to localStorage with proper keys
  save: (key, data) => {
    try {
      localStorage.setItem(`onboarding_${key}`, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  },

  // Get data from localStorage
  get: (key, defaultValue = null) => {
    try {
      const data = localStorage.getItem(`onboarding_${key}`);
      return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return defaultValue;
    }
  },

  // Remove data
  remove: (key) => {
    try {
      localStorage.removeItem(`onboarding_${key}`);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  },

  // Clear all onboarding data
  clearAll: () => {
    const keys = [
      'registration',
      'businessType',
      'businessInfo',
      'documents',
      'bankSetup',
      'payment'
    ];
    keys.forEach(key => localStorage.removeItem(`onboarding_${key}`));
  },

  // Get complete onboarding data
  getAll: () => {
    return {
      registration: OnboardingData.get('registration', {}),
      businessType: OnboardingData.get('businessType', null),
      businessInfo: OnboardingData.get('businessInfo', {}),
      documents: OnboardingData.get('documents', {}),
      bankSetup: OnboardingData.get('bankSetup', {}),
      payment: OnboardingData.get('payment', {})
    };
  }
};