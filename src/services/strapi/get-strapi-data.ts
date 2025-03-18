import { strapiInstance } from ".";

export async function getStrapiData<T>(type: string): Promise<T> {
  const response = await strapiInstance.get(`/${type}?populate=*`);

  return response.data;
}
