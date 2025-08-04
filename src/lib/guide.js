// A. Fetching Data (GET)
const fetchScenarios = async () => {
    try {
    const data = await ApiService.get('/scenario');
    // console.log(data);
    } catch (error) {
    // console.error('Error fetching scenarios:', error);
    }
};



// B. Creating Data (POST)
//1=>
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const newScenario = await ApiService.post('/scenario', { name });
        console.log('Scenario created:', newScenario);
        // Reset form or redirect
    } catch (error) {
        console.error('Error creating scenario:', error);
    }
};

//2=>
const createScenario = async () => {
  try {
    const newScenario = {
      name: "New Scenario Name",
      slug: "new-scenario-slug",
      // other fields as needed
    };

    const response = await ApiService.post('/scenario', newScenario);
    console.log("Created scenario:", response);
    // Handle success (e.g., update state or show notification)
  } catch (error) {
    console.error("Error creating scenario:", error);
    // Handle error
  }
};

// C. Updating Data (PUT/PATCH)
const handleUpdate = async () => {
    try {
        const updatedScenario = await ApiService.put(`/scenario/${scenarioId}`, { name });
        console.log('Updated:', updatedScenario);
    } catch (error) {
        console.error('Error updating:', error);
    }
};




// D. Deleting Data (DELETE)
const handleDelete = async () => {
    try {
        await ApiService.delete(`/scenario/${scenarioId}`);
        console.log('Scenario deleted');
        // Refresh list or redirect
    } catch (error) {
        console.error('Error deleting:', error);
    }
};





// A. Sending Query Parameters (GET)
const searchScenarios = async (query) => {
  try {
    const results = await ApiService.get('/scenario/search', { q: query });
    console.log('Search results:', results);
  } catch (error) {
    console.error('Search failed:', error);
  }
};





// B. Handling Authentication
// Set token after login
const handleLogin = async (email, password) => {
  try {
    const { token } = await ApiService.post('/auth/login', { email, password });
    ApiService.setAuthToken(token); // Store token for future requests
    localStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Clear token on logout
const handleLogout = () => {
  ApiService.removeAuthToken();
  localStorage.removeItem('authToken');
};



// C. Error Handling (Global & Local)
// Global error handling (in interceptors)
apiClient.interceptors.response.use(
  (response) => response.data.data,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login
    }
    return Promise.reject(error);
  }
);

// Local error handling (in components)
try {
  const data = await ApiService.get('/scenario');
} catch (error) {
  alert(error.message); // Show user-friendly error
}