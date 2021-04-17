const { Router } = require("express");
const AccountTable = require("../account/table");
const { hash } = require("../account/helper");

const router = new Router();

router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  const usernameHash = hash(username);
  const passwordHash = hash(password);

  AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
      // if 'undefined', the current username doenst exist
      if (!account) {
        return AccountTable.storeAccount({
          usernameHash,
          passwordHash,
        });
      } else {
        // user exists
        const error = new Error("This username has already been taken");
        error.statusCode = 409;
        throw error;
      }
    })
    .then(() => {
      return res.json({ message: "success" });
    })
    .catch((error) => next(error));
});

module.exports = router;