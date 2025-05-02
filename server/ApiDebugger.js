// Add this file to your utils directory to help with debugging API calls

/**
 * Helper function to check authentication state
 * Use this for debugging purposes
 */
export const checkAuthState = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  console.group("🔐 Auth State");
  console.log("Token exists:", !!token);
  if (token) {
    console.log("Token:", token.substring(0, 15) + "...");

    try {
      // Parse the JWT to show expiration
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const payload = JSON.parse(jsonPayload);
      console.log("Token payload:", payload);

      // Check if token is expired
      const expiryDate = new Date(payload.exp * 1000);
      const now = new Date();
      console.log("Token expiry:", expiryDate);
      console.log("Token expired:", expiryDate < now);
    } catch (e) {
      console.log("Error parsing token:", e.message);
    }
  }

  console.log("UserID exists:", !!userId);
  if (userId) {
    console.log("UserID:", userId);
  }
  console.groupEnd();

  return {
    isAuthenticated: !!(token && userId),
    token,
    userId,
  };
};

/**
 * Test API connectivity
 * @param {string} endpoint - API endpoint to test
 */
export const testApiConnection = async (endpoint = "/api/health") => {
  try {
    console.group("🔄 API Connection Test");
    const response = await fetch(`http://localhost:5000${endpoint}`);
    console.log("Status:", response.status);
    const data = await response.json();
    console.log("Response:", data);
    console.groupEnd();
    return { success: true, data };
  } catch (error) {
    console.log("Connection Error:", error.message);
    console.groupEnd();
    return { success: false, error: error.message };
  }
};

/**
 * Check CORS configuration
 */
export const testCorsConfig = async () => {
  try {
    console.group("🌐 CORS Test");
    const response = await fetch("http://localhost:5000/api/health", {
      method: "OPTIONS",
      headers: {
        Origin: "http://localhost:3000",
      },
    });

    console.log("Status:", response.status);
    console.log("CORS Headers:", {
      "Access-Control-Allow-Origin": response.headers.get(
        "Access-Control-Allow-Origin"
      ),
      "Access-Control-Allow-Methods": response.headers.get(
        "Access-Control-Allow-Methods"
      ),
      "Access-Control-Allow-Headers": response.headers.get(
        "Access-Control-Allow-Headers"
      ),
      "Access-Control-Allow-Credentials": response.headers.get(
        "Access-Control-Allow-Credentials"
      ),
    });

    console.groupEnd();
    return { success: true };
  } catch (error) {
    console.log("CORS Error:", error.message);
    console.groupEnd();
    return { success: false, error: error.message };
  }
};

// Export a single debug function that runs all checks
export const runApiDiagnostics = async () => {
  checkAuthState();
  await testCorsConfig();
  await testApiConnection();

  console.log("✅ API diagnostics complete. Check console for details.");
};
