import { makeApiCall } from "../../../utils/api";

export const getCoordinates = async (address: string) => {
  try {
    const response = await makeApiCall<any>({
      url: "/api/maps/get-coordinates",
      method: "GET",
      params: { address },
    });
    return response;
  } catch (error: any) {
    const backendMessage =
      error.response?.data?.message || "Failed to fetch coordinates";
    throw new Error(backendMessage);
  }
};

export const getDistanceTime = async (origin: string, destination: string) => {
  try {
    const response = await makeApiCall<any>({
      url: "/api/maps/get-distance-time",
      method: "GET",
      params: { origin, destination },
    });
    return response;
  } catch (error: any) {
    const backendMessage =
      error.response?.data?.message || "Failed to fetch distance and time";
    throw new Error(backendMessage);
  }
};

export const getAutoCompleteSuggestions = async (input: string) => {
  try {
    const response = await makeApiCall<any>({
      url: "/api/maps/get-suggestions",
      method: "GET",
      params: { input },
    });
    return response;
  } catch (error: any) {
    const backendMessage =
      error.response?.data?.message || "Failed to fetch suggestions";
    throw new Error(backendMessage);
  }
};
