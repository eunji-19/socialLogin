const { default: fetch } = require("node-fetch");
const passport = require("passport");
const NaverStrategy = require("passport-naver").Strategy;
const {
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
  NAVER_REDIRECT_URI,
} = require("../config/common");
const { signJWT } = require("../auth/jwt");

/**
 * 네이버 로그인
 * https://github.com/cheese10yun/node-yun/blob/8fd19fc0a51077b4c907677448a7f93185529deb/routes/index.js#L113
 */
function setupNaverLogin(app) {
  app.use(passport.initialize());

  passport.use(
    new NaverStrategy(
      {
        clientID: NAVER_CLIENT_ID,
        clientSecret: NAVER_CLIENT_SECRET,
        callbackURL: NAVER_REDIRECT_URI,
      },
      //https://sokia.tistory.com/14
      function (accessToken, refreshToken, profile, done) {
        console.log("naver login", profile);
        // console.log("accessToken", accessToken);
        let result = {
          naver: {
            accessToken,
            profile,
          },
        };
        // done(null, profile);
        done(null, result);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log("des", user);
    done(null, user);
  });

  app.get(
    "/oauth/naver",
    passport.authenticate("naver", {
      session: false,
      failureRedirect: "/login",
    })
  );

  app.get(
    "/oauth/naver/callback",
    passport.authenticate("naver", {
      session: false,
      failureRedirect: "/login",
    }),
    async (req, res) => {
      const naverToken = req.user?.naver?.accessToken;
      console.log("naverToken", naverToken);

      if (!naverToken) {
        res.status(400);
        return;
      }

      const tokenVerifyResult = await fetch(
        `https://openapi.naver.com/v1/nid/me`,
        {
          headers: {
            Authorization: `Bearer ${naverToken}`,
          },
          //   credentials: "include",
        }
      );
      const json = await tokenVerifyResult.json();
      console.log("NAVER? ", json);
      const profile = json.response;
      const accessToken = await signJWT(profile.id);
      console.log("naver", accessToken);
      res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: true,
      });
      res.redirect("/login");
    }
  );
}

module.exports = { setupNaverLogin };
