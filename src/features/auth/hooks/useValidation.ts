export const useValidation = () => {
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };
  const validateUsername = (username: string): boolean => {
    return username.length >= 1;
  };
  return {
    validateEmail,
    validatePassword,
    validateUsername,
  };
};
