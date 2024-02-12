import { httpWithoutAuth } from "./base";
import { API_ENDPOINTS } from "./endpoints";

export const GetTokenService = async (payload: { code: string }) => {
  try {
    const { data } = await httpWithoutAuth.get(
      API_ENDPOINTS.GET_TOKEN, { params: { code: payload.code } }
    );
    return await Promise.resolve(data);
  } catch (error) {
    return await Promise.reject(error);
  }
};
