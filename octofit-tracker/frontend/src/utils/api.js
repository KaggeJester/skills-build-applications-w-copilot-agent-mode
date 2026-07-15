/**
 * API Configuration for OctoFit Tracker
 * 
 * This utility handles Codespaces and localhost API endpoints.
 * 
 * Detects environment dynamically:
 * - In Codespaces: Extracts codespace name from browser URL (*.app.github.dev)
 * - Locally: Uses http://localhost:8000
 */

const getApiBaseUrl = () => {
  // In development, use Vite proxy to avoid CORS and Codespaces hostname mismatches.
  if (import.meta.env.DEV) {
    return '/api';
  }

  // Check if running in Codespaces by looking at the current domain
  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  
  // Match Codespaces domain pattern: {codespace-name}-{port}.app.github.dev
  const codespacesMatch = hostname.match(/^(.+?)-\d+\.app\.github\.dev$/);
  
  if (codespacesMatch) {
    const codespaceName = codespacesMatch[1];
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }
  
  // Also check environment variable as fallback
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
