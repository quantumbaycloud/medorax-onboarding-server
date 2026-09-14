import { apiRequest } from './api';

export const getOnboardingApplications = (status='pending') => apiRequest(`/admin/applications?status=${encodeURIComponent(status)}`);
export const getOnboardingApplication = (id) => apiRequest(`/admin/applications/${id}`);
export const approveOnboardingApplication = (id, note='') => apiRequest(`/admin/applications/${id}/approve`, { method:'POST', body: JSON.stringify({ note }) });
export const rejectOnboardingApplication = (id, reason) => apiRequest(`/admin/applications/${id}/reject`, { method:'POST', body: JSON.stringify({ reason }) });
