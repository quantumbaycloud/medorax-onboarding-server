// src/api/onboarding/locationApi.js
import client from "../client";

export const saveLocation = async (data) => (await client.post("/api/onboarding/location", data)).data;
export const getLocation = async () => (await client.get("/api/onboarding/location")).data;
export const updateLocation = async (id, data) => (await client.put(`/api/onboarding/location/${id}`, data)).data;
export const deleteLocation = async (id) => (await client.delete(`/api/onboarding/location/${id}`)).data;
