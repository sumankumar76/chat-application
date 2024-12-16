import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest, putRequest } from "../utils/services";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // States for handling registration-related errors and loading states.
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // States for handling login-related errors and loading states.
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // States for handling profile update-related errors and loading states.
  const [profileError, setProfileError] = useState(null);
  const [isUpdateProfileLoading, setIsUpdateProfileLoading] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");

    setUser(JSON.parse(user));
  }, []);

  // Callback functions to update error states.
  const updateRegisterError = useCallback((info) => {
    setRegisterError(info);
  }, []);

  const updateLoginError = useCallback((info) => {
    setLoginError(info);
  }, []);

  const updateProfileError = useCallback((info) => {
    setProfileError(info);
  }, []);

  // Callback functions to update input fields for registration, login, and profile update.
  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const updateProfileInfo = useCallback((info) => {
    setProfileInfo(info);
  }, []);

  // Function to handle user registration.
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();

      setRegisterError(null);

      if (registerInfo.password !== registerInfo.confirmPassword) {
        setRegisterError({
          error: true,
          message: "Passwords do not match",
        });
      } else {
        setIsRegisterLoading(true);

        const response = await postRequest(
          `${baseUrl}/users/register`,
          JSON.stringify(registerInfo),
        );
        setIsRegisterLoading(false);

        if (response.error) {
          return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        toast.success("Registration Successful!");
      }
    },
    [registerInfo],
  );

  // Function to handle user login.
  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();

      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo),
      );
      setIsLoginLoading(false);

      if (response.error) {
        return setLoginError(response);
      }

      localStorage.setItem("User", JSON.stringify(response));
      localStorage.setItem("token", response.token);
      setUser(response);
    },
    [loginInfo],
  );

  // Function to handle user logout.
  const logoutUser = useCallback(async () => {
    await postRequest(`${baseUrl}/users/logout`);
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  // Function to handle updating the user profile.
  const updateUserProfile = useCallback(
    async (e) => {
      e.preventDefault();

      setProfileError(null);

      if (profileInfo.password !== profileInfo.confirmPassword) {
        setProfileError({
          error: true,
          message: "Passwords do not match",
        });
      } else {
        setIsUpdateProfileLoading(true);

        const response = await putRequest(
          `${baseUrl}/users/profile`,
          JSON.stringify(profileInfo),
        );
        setIsUpdateProfileLoading(false);

        if (response.error) {
          return setProfileError(response);
        }

        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
        toast.success("Profile updated successfully");
      }
    },
    [profileInfo],
  );

  // Providing all the state and functions to the context, so they can be accessed by other components.
  return (
    <AuthContext.Provider
      value={{
        user,

        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        updateRegisterError,
        isRegisterLoading,

        logoutUser,

        loginUser,
        loginError,
        updateLoginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,

        profileInfo,
        updateProfileInfo,
        updateUserProfile,
        profileError,
        updateProfileError,
        isUpdateProfileLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
