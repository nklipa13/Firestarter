const API_URL = 'http://e3fd672f.ngrok.io/api';

const handleResponse = response => response.text().then((text) => {
  const data = text && JSON.parse(text);

  if (!response.ok) {
    return Promise.reject(data.error ? data.error.message : data);
  }

  return data;
});

export const startProjectApiCall = data => fetch(`${API_URL}/project`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
}).then(res => handleResponse(res));

export const getProjectApiCall = id => fetch(`${API_URL}/project/${id}`, {
  method: 'GET',
}).then(res => handleResponse(res));

export const oneTimeFundApiCall = (id, amount) => fetch(`${API_URL}/project/${id}/funds`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ action: 'add', type: 1, amount }),
}).then(res => handleResponse(res));
