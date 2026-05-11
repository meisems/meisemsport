// ===== CLOUD STORAGE MODULE - Uses JSONBin.io =====
const CloudStorage = {
    // IMPORTANT: Replace these with your own JSONBin credentials
    // Get your API keys from: https://jsonbin.io/api-keys
    API_KEY: '',  // Your JSONBin API Key (optional, for faster reads)
    
    // The Bin ID - get this after creating a bin at https://jsonbin.io
    BIN_ID: '',   // Example: '64a1234567890abcdef12345'
    
    // JSONBin API endpoints
    BASE_URL: 'https://api.jsonbin.io/v3',
    
    // Cache control - set to false for always fresh data, true for faster loading
    USE_CACHE: true,
    cacheTimeout: 60000, // 1 minute cache
    cache: null,
    cacheTime: 0,

    // Check if cloud storage is configured
    isConfigured() {
        return this.BIN_ID && this.BIN_ID !== '';
    },

    // Get cached data if still valid
    getCached() {
        if (!this.USE_CACHE || !this.cache || !this.cacheTime) return null;
        if (Date.now() - this.cacheTime < this.cacheTimeout) {
            return this.cache;
        }
        return null;
    },

    // Load projects from cloud storage
    async loadProjects() {
        if (!this.isConfigured()) {
            console.log('☁️ Cloud storage not configured - using default data');
            return null;
        }

        // Check cache first
        const cached = this.getCached();
        if (cached) return cached;

        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            
            // Add API key for faster reads (optional)
            if (this.API_KEY) {
                headers['X-Access-Key'] = this.API_KEY;
            }

            const response = await fetch(`${this.BASE_URL}/b/${this.BIN_ID}/latest`, {
                method: 'GET',
                headers: headers
            });

            if (!response.ok) {
                if (response.status === 404) {
                    console.log('☁️ No data in cloud storage yet - using default data');
                    return null;
                }
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            
            // Cache the result
            this.cache = data.record;
            this.cacheTime = Date.now();
            
            console.log('☁️ Projects loaded from cloud storage');
            return data.record;

        } catch (error) {
            console.log('☁️ Cloud storage error:', error.message);
            console.log('   Using cached/default data instead');
            return null;
        }
    },

    // Save projects to cloud storage
    async saveProjects(projectsData) {
        if (!this.isConfigured()) {
            console.log('☁️ Cloud storage not configured - changes saved locally only');
            return { success: false, localOnly: true };
        }

        try {
            const headers = {
                'Content-Type': 'application/json'
            };
            
            if (this.API_KEY) {
                headers['X-Access-Key'] = this.API_KEY;
            }

            // Check if bin exists, if not create it
            const response = await fetch(`${this.BASE_URL}/b/${this.BIN_ID}`, {
                method: 'GET',
                headers: headers
            });

            if (response.ok) {
                // Update existing bin
                const updateResponse = await fetch(`${this.BASE_URL}/b/${this.BIN_ID}`, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(projectsData)
                });

                if (!updateResponse.ok) {
                    throw new Error('Failed to update cloud storage');
                }
            } else {
                // Create new bin
                const createResponse = await fetch(`${this.BASE_URL}/b`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(projectsData)
                });

                if (!createResponse.ok) {
                    throw new Error('Failed to create cloud storage');
                }
            }

            // Update cache
            this.cache = projectsData;
            this.cacheTime = Date.now();

            console.log('☁️ Projects saved to cloud storage successfully!');
            return { success: true };

        } catch (error) {
            console.log('☁️ Cloud save error:', error.message);
            console.log('   Changes saved locally instead');
            
            // Fallback to localStorage
            localStorage.setItem('portfolioProjects', JSON.stringify(projectsData));
            return { success: false, localOnly: true };
        }
    },

    // Clear cache (useful when forcing refresh)
    clearCache() {
        this.cache = null;
        this.cacheTime = 0;
    }
};

// Make available globally
window.CloudStorage = CloudStorage;
