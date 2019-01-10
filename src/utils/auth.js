import jwt_decode from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");
  let currentUser;
  try {
    let {
      user: { id }
    } = jwt_decode(token);
    currentUser = id;
    const { exp } = jwt_decode(refreshToken);
    if (Date.now() / 1000 > exp) {
      return {
        ok: false,
        userId: 0
      };
    }
  } catch (err) {
    return {
      ok: false,
      userId: 0
    };
  }
  return {
    ok: true,
    userId: currentUser
  };
};
