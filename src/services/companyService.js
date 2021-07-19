import httpService from './httpService';

const endpoint = '/companies';

export const getCompanies = async (cancelToken) => (
  httpService.get(endpoint, { cancelToken })
);

export const getCompany = async (id, cancelToken) => (
  httpService.get(`${endpoint}/${id}`, { cancelToken })
);

export const saveCompany = async (company, cancelToken) => {
  if (company._id) {
    return httpService.put(`${endpoint}/update`, company, { cancelToken });
  }
  return httpService.post(`${endpoint}/create`, company, { cancelToken });
};
