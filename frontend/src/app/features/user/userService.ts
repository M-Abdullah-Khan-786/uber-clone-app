import { makeApiCall } from "../../../utils/api";

export const registerNewUser = async (data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string
}) => {
  try {
    const response = await makeApiCall<any>({
      url: "api/user/register",
      method: "POST",
      data: data,
    });
    return response;
  } catch (error: any) {
    const backendMessage = error.response?.data?.message || "Failed to register user";
    throw new Error(backendMessage);
  }
};


export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await makeApiCall<any>({
      url: "api/user/login",
      method: "POST",
      data: credentials,
    });
    return response;
  } catch (error: any) {
    const backendMessage = error.response?.data?.message || "Login Failed";
    throw new Error(backendMessage);
  }
};