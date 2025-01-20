import { makeApiCall } from "../../../utils/api";

export const createRide = async (
  pickup: string,
  destination: string,
  vehicleType: string
) => {
  try {
    const response = await makeApiCall<any>({
      url: "api/ride/create",
      method: "POST",
      data: { pickup, destination, vehicleType },
    });
    return response;
  } catch (error: any) {
    const backendMessage =
      error.response?.data?.message || "Failed to create ride";
    throw new Error(backendMessage);
  }
};

export const getFareEstimate = async (pickup: string, destination: string) => {
  try {
    const response = await makeApiCall<any>({
      url: "api/ride/get-fare",
      method: "GET",
      params: { pickup, destination },
    });
    return response;
  } catch (error: any) {
    const backendMessage =
      error.response?.data?.message || "Failed to fetch fare estimate";
    throw new Error(backendMessage);
  }
};

export const confirmRide = async (rideId: string) => {
  try {
    const response = await makeApiCall<any>({
      url: "api/ride/confirm",
      method: "POST",
      data: { rideId },
    });
    return response;
  } catch (error: any) {
    const backendMessage =
      error.response?.data?.message || "Failed to confirm ride";
    throw new Error(backendMessage);
  }
};

export const startRide = async (rideId: string, otp: string) => {
  try {
    const response = await makeApiCall<any>({
      url: "api/ride/start-ride",
      method: "GET",
      params: { rideId, otp },
    });
    return response;
  } catch (error: any) {
    const backendMessage =
      error.response?.data?.message || "Failed to start ride";
    throw new Error(backendMessage);
  }
};

export const endRide = async (rideId: string) => {
  try {
    const response = await makeApiCall<any>({
      url: "api/ride/end-ride",
      method: "POST",
      data: { rideId },
    });
    return response;
  } catch (error: any) {
    const backendMessage =
      error.response?.data?.message || "Failed to end ride";
    throw new Error(backendMessage);
  }
};
