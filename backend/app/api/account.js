const { Router } = require("express");
const AccountTable = require("../account/table");
const Session = require("../account/session");
const { hash } = require("../account/helper");
const { setSession } = require("./helper");

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
      return setSession({ username, res });
    })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  AccountTable.getAccount({ usernameHash: hash(username) })
    .then(({ account }) => {
      if (account && account.passwordHash === hash(password)) {
        // check if a session is already opened and saved in DB
        const { sessionId } = account;

        return setSession({ username, res, sessionId });
      } else {
        const error = new Error("Incorrect username/password");
        error.statusCode = 409;
        throw error;
      }
    })
    .then(({ message }) => {
      res.json({ message });
    })
    .catch((error) => next(error));
});

router.get("/logout", (req, res, next) => {
  // parse(x) => { username | | }
  const { username } = Session.parse(req.cookies.sessionString);
  AccountTable.updateSessionId({
    sessionId: null,
    usernameHash: hash(username),
  })
    .then(() => {
      // clears cookie on the client
      res.clearCookie("sessionString");
      res.json({ message: "Succesful logout" });
    })
    .catch((error) => next(error));
});

module.exports = router;
