interface JSONRequestInit extends RequestInit {
  data: unknown;
}
export const requestJSON = async <T>(
  input: RequestInfo,
  init?: JSONRequestInit
): Promise<T | string> => {
  const response = await fetch(input, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(init.data),
    ...init
  });

  if (!response.ok) {
    throw response;
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return await response.text();
  }

  return await response.json();
};

export const postJSON = async <T>(
  input: RequestInfo,
  data: unknown
): Promise<T> => {
  return (await requestJSON(input, {
    method: 'POST',
    data
  })) as T;
};

export const getJSON = async <T>(input: RequestInfo): Promise<T> => {
  return (await requestJSON(input)) as T;
};
