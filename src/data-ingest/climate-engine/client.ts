/**
 * Climate Engine API Client
 * Secure communication with climateengine.org
 */

const BASE_URL = 'https://api.climateengine.org/';
const API_KEY = process.env.CLIMATE_ENGINE_API_KEY;

export async function climateRequest<T>(endpoint: string, params: Record<string, string | number>): Promise<T> {
  if (!API_KEY) {
    throw new Error('CLIMATE_ENGINE_API_KEY is not configured in environment.');
  }

  const queryParams = new URLSearchParams(params as Record<string, string>).toString();
  const url = `${BASE_URL}${endpoint}?${queryParams}`;

  const response = await fetch(url, {
    headers: {
      'Authorization': API_KEY,
      'Content-Type': 'application/json'
    },
    // Adding reasonable timeout and retry logic can be done here or in services
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Climate Engine API Error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  return response.json();
}
