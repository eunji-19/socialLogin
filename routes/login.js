const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  console.log("login req.user", req.user);
  console.log("logged in: " + req.isAuthenticated());
  if (req.user) {
    res.send(`
        <h3>Login Success</h3>
        <a href="/auth/logout">Logout</a>
        <p>
            ${JSON.stringify(req.user, null, 2)}
        </p>
      `);
  } else {
    res.render("login");
  }
});

module.exports = router;
