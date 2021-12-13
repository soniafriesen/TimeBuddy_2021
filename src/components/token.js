export const getToken = () => {
  const tokenString = sessionStorage.getItem("token");
  if (tokenString == null) return false;
  else return tokenString;
};
