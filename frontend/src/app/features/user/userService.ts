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
  } catch (error) {
    console.error(error);
    throw new Error("Faild To Create New User");
  }
};