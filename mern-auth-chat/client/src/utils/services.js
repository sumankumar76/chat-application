import axios from "axios";

export const baseUrl = "http://localhost:5000/api";

// Function to handle POST requests.
export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });

    return await response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response.data?.message || error.message,
    };
  }
};

// Function to handle GET requests.
export const getRequest = async (url) => {
  try {
    const response = await axios.get(url,{
      headers:{
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
      }
    });

    return await response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response.data?.message || error.message,
    };
  }
};

// Function to handle PUT requests.
export const putRequest = async (url, body) => {
  try {
    const response = await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    });

    return await response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response.data?.message || error.message,
    };
  }
};
