export const getToken = () => {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  console.log("getToken called - userToken : " + userToken);
  return userToken?.token;
  }