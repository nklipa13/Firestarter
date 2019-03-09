const API_URL = 'https://4d29e764.ngrok.io/api';

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

export const getAllProjectsApiCall = () => fetch(`${API_URL}/project/`, {
  method: 'GET',
}).then(res => handleResponse(res));

export const oneTimeFundApiCall = (id, amount, account) => fetch(`${API_URL}/project/${id}/funds`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'add', type: 1, amount, account,
  }),
}).then(res => handleResponse(res));

export const vestFundApiCall = (id, amount) => fetch(`${API_URL}/project/${id}/funds`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ action: 'add', type: 2, amount }),
}).then(res => handleResponse(res));

export const compoundFundApiCall = (id, amount) => fetch(`${API_URL}/project/${id}/funds`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ action: 'add', type: 3, amount }),
}).then(res => handleResponse(res));
