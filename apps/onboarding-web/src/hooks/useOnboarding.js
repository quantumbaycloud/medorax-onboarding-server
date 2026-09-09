// src/hooks/useOnboarding.js

import { useState, useCallback } from 'react';
import { 
    submitPharmacyDetails, 
    updatePharmacyDetails, 
    getPharmacyDetails,
    uploadDocuments,
    verifyBusiness,
    getBusinessStatus,
    formatBusinessDataForAPI
} from '../api/onboarding/onboardingApi';

export const useOnboarding = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const submitDetails = useCallback(async (businessData, businessType) => {
        setLoading(true);
        setError(null);
        
        try {
            const formattedData = formatBusinessDataForAPI(businessData, businessType);
            const response = await submitPharmacyDetails(formattedData);
            setData(response);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateDetails = useCallback(async (id, businessData, businessType) => {
        setLoading(true);
        setError(null);
        
        try {
            const formattedData = formatBusinessDataForAPI(businessData, businessType);
            const response = await updatePharmacyDetails(id, formattedData);
            setData(response);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchDetails = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await getPharmacyDetails(id);
            setData(response);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const uploadBusinessDocuments = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await uploadDocuments(formData);
            setData(response);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const verifyBusinessDetails = useCallback(async (verificationData) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await verifyBusiness(verificationData);
            setData(response);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchBusinessStatus = useCallback(async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await getBusinessStatus();
            setData(response);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        data,
        submitDetails,
        updateDetails,
        fetchDetails,
        uploadBusinessDocuments,
        verifyBusinessDetails,
        fetchBusinessStatus,
    };
};