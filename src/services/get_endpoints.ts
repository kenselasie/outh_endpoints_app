import endpointsData from './list_endpoints.json'

export const GetEndpointService = async () => {
  try {
    return await Promise.resolve(endpointsData);
  } catch (error) {
    return await Promise.reject(error);
  }
};
