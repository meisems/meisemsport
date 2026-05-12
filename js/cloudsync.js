// ==================== js/cloudsync.js ====================
// Syncs portfolio data across all devices using JSONBin.io (FREE)

const CloudSync = {
    // Get your FREE API key from: https://jsonbin.io/api-keys
    API_KEY: '$2a$10$m5s/TIAtQ8l9JheummDfye9MrWX2MHeKdxk55rCKVrjHx7cp1EHCO',  // ← UPDATE THIS with your key
    BIN_ID: '6a022fa4c0954111d80b8a31',    // ← UPDATE THIS after creating a bin
    API_URL: 'https://api.jsonbin.io/v3',
    
    // Check if properly configured
    isConfigured() {
        return this.API_KEY !== 'YOUR_API_KEY_HERE' && 
               this.BIN_ID !== 'YOUR_BIN_ID_HERE';
    },

    // Load data from cloud
    async loadFromCloud() {
        if (!this.isConfigured()) {
            console.log('☁️ Cloud sync not configured - using local storage only');
            return null;
        }

        try {
            console.log('☁️ Syncing from cloud...');
            const response = await fetch(`${this.API_URL}/b/${this.BIN_ID}/latest`, {
                headers: {
                    'X-Access-Key': this.API_KEY,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            console.log('✅ Cloud data loaded:', data.record);
            return data.record;
        } catch (error) {
            console.error('❌ Cloud load error:', error.message);
            return null;
        }
    },

    // Save data to cloud
    async saveToCloud(dataToSave) {
        if (!this.isConfigured()) {
            console.log('☁️ Cloud sync not configured - saved locally only');
            return false;
        }

        try {
            console.log('☁️ Syncing to cloud...');
            const response = await fetch(`${this.API_URL}/b/${this.BIN_ID}`, {
                method: 'PUT',
                headers: {
                    'X-Access-Key': this.API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSave)
            });

            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            console.log('✅ Cloud data saved!');
            return true;
        } catch (error) {
            console.error('❌ Cloud save error:', error.message);
            return false;
        }
    },

    // Full sync: load from cloud and update localStorage
    async syncFromCloud() {
        const cloudData = await this.loadFromCloud();
        if (cloudData) {
            localStorage.setItem('portfolioProjects', JSON.stringify(cloudData.projects || []));
            if (cloudData.aboutData) {
                localStorage.setItem('aboutData', JSON.stringify(cloudData.aboutData));
            }
            console.log('✅ Local storage updated from cloud');
            return true;
        }
        return false;
    },

    // Full sync: save local data to cloud
    async syncToCloud() {
        const dataToSave = {
            projects: JSON.parse(localStorage.getItem('portfolioProjects') || '[]'),
            aboutData: JSON.parse(localStorage.getItem('aboutData') || 'null'),
            lastUpdated: new Date().toISOString()
        };
        
        return await this.saveToCloud(dataToSave);
    }
};

// Make available globally
window.CloudSync = CloudSync;
