import { makeApiCall } from "../../../utils/api";

export const registerNewDriver = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string
}) => {
  try {
    const response = await makeApiCall<any>({
      url: "api/driver/register",
      method: "POST",
      data: data,
    });
    return response;
  } catch (error: any) {
    const backendMessage = error.response?.data?.message || "Failed to register driver";
    throw new Error(backendMessage);
  }
};


export const loginDriver = async (credentials: { email: string; password: string }) => {
  try {
    const response = await makeApiCall<any>({
      url: "api/driver/login",
      method: "POST",
      data: credentials,
    });
    return response;
  } catch (error: any) {
    const backendMessage = error.response?.data?.message || "Login Failed";
    throw new Error(backendMessage);
  }
};