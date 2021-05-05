const localStorageApiEndpoint =
  typeof localStorage !== 'undefined' && localStorage.getItem('apiEndpoint');
export const apiEndoint =
  localStorageApiEndpoint || process.env.NEXT_PUBLIC_API_ENDPOINT || '';
