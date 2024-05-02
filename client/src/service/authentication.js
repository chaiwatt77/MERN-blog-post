export const loginSetToken = (response, next) => {
  if (window !== "undefined") {
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  next();
};

export const getToken = () => {
  if (window !== "undefined") {
    if (localStorage.getItem("token")) {
      return JSON.stringify(localStorage.getItem("token"));
    } else {
      return false;
    }
  }
};

export const logoutDestroyToken = (next) => {
  if (window !== "undefined") {
    localStorage.removeItem("token");
  }
  next();
};
