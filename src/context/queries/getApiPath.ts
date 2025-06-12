export const getApiPath = (endpoint: string) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = "https://api.currencybeacon.com/v1";

  return `${url}${endpoint as string}?api_key=${apiKey}`;
};
