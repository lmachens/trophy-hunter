import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const localStorageApiEndpoint =
  typeof localStorage !== 'undefined' && localStorage.getItem('apiEndpoint');
export const apiEndoint =
  localStorageApiEndpoint || publicRuntimeConfig.API_ENDPOINT || '';
