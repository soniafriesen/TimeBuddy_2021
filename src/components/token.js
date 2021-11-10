export const getToken = () => {
  const tokenString = sessionStorage.getItem("token");
  const userToken = tokenString;
  console.log("getToken called - userToken : " + userToken);
  if (userToken == null) return false;
  else return true;
};
