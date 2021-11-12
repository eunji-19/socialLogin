const { verifyJWT } = require("./jwt");

function authMiddleware() {
  return async (req, res, next) => {
    const { access_token } = req.cookies;
    console.log(access_token);
    if (access_token) {
      try {
        const userId = await verifyJWT(access_token);
        console.log("userId", userId);
        if (userId) {
          //   const users = await getUsersCollection();
          //   const user = await users.findOne({
          //     id: userId,
          //   });
          //   if (user) {
          //     req.user = user;
          //   }
        }
      } catch (e) {
        console.log("Invalid token", e);
      }
    }
    next();
  };
}

/*
 * 로그인 여부 확인
 */
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = { authMiddleware, ensureAuthenticated };
