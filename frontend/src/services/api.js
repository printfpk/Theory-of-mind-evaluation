import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

export const runEvaluation = async (payload) => {
  // payload can contain { story, modelName, evaluationType, title }
  const response = await api.post('/evaluations', payload);
  return response.data;
};

export const fetchEvaluations = async () => {
  const response = await api.get('/evaluations');
  return response.data;
};

export default api;