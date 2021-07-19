import httpService from './httpService';

const endpoint = '/providers';

export const getProviders = async (cancelToken) => (
  httpService.get(endpoint, { cancelToken })
);

export const getProvider = async (id, cancelToken) => (
  httpService.get(`${endpoint}/${id}`, { cancelToken })
);

export const saveProvider = async (provider, cancelToken) => {
  const updatedProvider = { ...provider };
  updatedProvider.birthDay = Date.parse(provider.birthDay);

  if (updatedProvider._id) {
    return httpService.put(`${endpoint}/update`, updatedProvider, { cancelToken });
  }
  return httpService.post(`${endpoint}/create`, updatedProvider, { cancelToken });
};
