import { apiRequest } from './api';

export const getOnboardingApplications = (status='pending') => apiRequest(`/admin/onboarding/applications?status=${encodeURIComponent(status)}`);
export const getOnboardingApplication = (id) => apiRequest(`/admin/onboarding/applications/${id}`);
export const approveOnboardingApplication = (id, note='') => apiRequest(`/admin/onboarding/applications/${id}/approve`, { method:'POST', body: JSON.stringify({ note }) });
export const rejectOnboardingApplication = (id, reason) => apiRequest(`/admin/onboarding/applications/${id}/reject`, { method:'POST', body: JSON.stringify({ reason }) });
