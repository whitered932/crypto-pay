import { AxiosInstance, AxiosResponse } from 'axios';
import { getResultOrFail, ResponseData } from '../@common';

export default (instance: AxiosInstance, token: string) => async () => {
  const { data } = (await instance.get(`app${token}/getMe`)) as AxiosResponse<ResponseData>;
  return getResultOrFail(data);
};
