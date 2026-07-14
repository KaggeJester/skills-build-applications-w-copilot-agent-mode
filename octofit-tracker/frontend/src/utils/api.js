/**
 * API Configuration for OctoFit Tracker
 * 
 * This utility handles Codespaces and localhost API endpoints.
 * 
 * Environment Variable: VITE_CODESPACE_NAME
 * - In Codespaces: Automatically set by GitHub
 * - Locally: Must be defined in .env.local (optional)
 * 
 * Example .env.local:
 * VITE_CODESPACE_NAME=your-codespace-name
 * 
 * Fallback: If VITE_CODESPACE_NAME is not set, uses http://localhost:8000
 */

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
  
  if (codespaceName && codespaceName !== 'undefined') {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  // Fallback to localhost
  return 'http://localhost:8000/api';
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * Generic fetch wrapper for API calls
 * Handles both paginated and array responses
 * 
 * @param {string} endpoint - API endpoint (e.g., 'users', 'activities')
 * @returns {Promise<Array>} Data array from the response
 */
export const fetchFromApi = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Handle both paginated responses and direct arrays
    if (Array.isArray(data)) {
      return data;
    }
    
    // If response is an object with data property (paginated)
    if (data.data && Array.isArray(data.data)) {
      return data.data;
    }
    
    // If response is an object with results property (alternative pagination)
    if (data.results && Array.isArray(data.results)) {
      return data.results;
    }
    
    // Fallback to empty array if format is unexpected
    return [];
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Get the full API base URL (for debugging)
 * @returns {string} The configured API base URL
 */
export const getApiUrl = () => API_BASE_URL;
