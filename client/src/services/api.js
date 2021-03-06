const API_URL = 'http://firestarter.cc:9999/api';

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

export const vestFundApiCall = (id, amount, account) => fetch(`${API_URL}/project/${id}/funds`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'add', type: 2, amount, account,
  }),
}).then(res => handleResponse(res));

export const compoundFundApiCall = (id, amount, account) => fetch(`${API_URL}/project/${id}/funds`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'add', type: 3, amount, account,
  }),
}).then(res => handleResponse(res));

export const projectAddQuestionApiCall = (id, formData, address, sig) => fetch(`${API_URL}/project/${id}/faq`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...formData, address, sig, msg: formData.question,
  }),
}).then(res => handleResponse(res));

export const projectAddChangelogApiCall = (id, formData, address, sig) => fetch(`${API_URL}/project/${id}/log`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    ...formData, address, sig, msg: formData.description,
  }),
}).then(res => handleResponse(res));

export const projectAddProposalApiCall = (id, proposalId, formData) => fetch(`${API_URL}/project/${id}/proposal`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: formData.featureName,
    description: formData.featureName,
    ethAmount: formData.ethAmount,
    daiAmount: formData.daiAmount,
    proposalId,
  }),
}).then(res => handleResponse(res));

export const getAllProjectProposalsApiCall = id => fetch(`${API_URL}/project/${id}/proposal`, {
  method: 'GET',
}).then(res => handleResponse(res));
