export interface ResponseData<T = any> {
  ok: boolean;
  error?: {
    code: number;
    name: string;
  };
  result: T;
}

export const getResultOrFail = (responseData: ResponseData) => {
  if (!responseData.ok) {
    throw new Error(`${responseData.error?.name} ${responseData.error?.code}`);
  }
  return responseData.result;
};
