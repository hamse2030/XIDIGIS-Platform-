/**
 * IPC-CH API Client (Secure Server-Side)
 * 
 * This service handles all interactions with the IPC-CH Public API.
 * Access is restricted to the backend layer to ensure API key security.
 */

export interface IPCAnalysis {
  id: number;
  title: string;
  country: string;
  year: number;
  period: string;
  status: string;
  release_date: string;
}

export interface IPCPopulationData {
  country: string;
  region?: string;
  phase: number;
  population_affected: number;
  reporting_period: string;
  confidence_level?: string;
  timestamp: string;
}

export class IPCClient {
  private static instance: IPCClient;
  private apiKey: string;
  private baseUrl: string = 'https://api.ipcinfo.org';

  private constructor() {
    const key = process.env.IPC_API_KEY;
    if (!key) {
      console.warn('⚠️ IPC_API_KEY is not defined in environment variables.');
      this.apiKey = '';
    } else {
      this.apiKey = key;
    }
  }

  public static getInstance(): IPCClient {
    if (!IPCClient.instance) {
      IPCClient.instance = new IPCClient();
    }
    return IPCClient.instance;
  }

  /**
   * Secure fetch with authentication and retry logic
   */
  private async fetchSecure<T>(endpoint: string, retries: number = 3): Promise<T | null> {
    const url = `${this.baseUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}key=${this.apiKey}`;
    
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.status === 429) {
          const waitTime = Math.pow(2, i) * 1000;
          console.warn(`⏳ Rate limited. Retrying in ${waitTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        }

        if (!response.ok) {
          throw new Error(`IPC API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json() as T;
      } catch (error) {
        console.error(`❌ IPC API Request failed (Attempt ${i + 1}):`, error);
        if (i === retries - 1) return null;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    return null;
  }

  /**
   * Fetches latest analyses list
   */
  public async getAnalyses(countryCode?: string): Promise<IPCAnalysis[]> {
    const endpoint = countryCode ? `/analyses?country=${countryCode}` : '/analyses';
    const data = await this.fetchSecure<IPCAnalysis[]>(endpoint);
    return data || [];
  }

  /**
   * Fetches population tracking data for a specific country
   */
  public async getPopulationData(countryCode: string): Promise<IPCPopulationData[]> {
    const endpoint = `/population?country=${countryCode}`;
    const data = await this.fetchSecure<{ country?: string; area?: string; region?: string; phase: string; population: string | number; period?: string; confidence?: string }[]>(endpoint);
    
    if (!data) return [];

    return data.map((item: { country?: string; area?: string; region?: string; phase: string; population: string | number; period?: string; confidence?: string }) => ({
      country: item.country || countryCode,
      region: item.area || item.region,
      phase: parseInt(item.phase) || 0,
      population_affected: typeof item.population === 'string' ? parseInt(item.population) : item.population || 0,
      reporting_period: item.period || 'Unknown',
      confidence_level: item.confidence,
      timestamp: new Date().toISOString()
    }));
  }
}

export const ipcClient = IPCClient.getInstance();
