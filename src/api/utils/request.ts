interface JSONRequestInit extends RequestInit {
  data: unknown;
}
export const requestJSON = async (
  input: RequestInfo,
  init?: JSONRequestInit
) => {
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

export const postJSON = async (input: RequestInfo, data: unknown) => {
  return await requestJSON(input, {
    method: 'POST',
    data
  });
};
