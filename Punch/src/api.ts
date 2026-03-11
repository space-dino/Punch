const getHeaders = () => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('ngrok-skip-browser-warning', 'true');
  return headers;
};

export const getJSON = <T>(baseUrl: string, endpoint: string): Promise<T> => {
  return fetch(`${baseUrl}${endpoint}`, {
    method: 'GET',
    headers: getHeaders(),
    redirect: 'follow' as const,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      return response.json()
    })
};

export const postJSON = (baseUrl: string, endpoint: string, body: object): Promise<{ status: number, body: string }> => {
  return fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
    redirect: 'follow' as const,
  }).then(async (response) => ({
    status: response.status,
    body: await response.text(),
  }))
}