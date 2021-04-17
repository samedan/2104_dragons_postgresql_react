const { hash } = require("../account/helper");
const Session = require("../account/session");
const AccountTable = require("../account/table");

const setSession = ({ username, res }) => {
  return new Promise((resolve, reject) => {
    const session = new Session({ username });
    const sessionString = session.toString();

    AccountTable.updateSessionId({
      sessionId: session.id,
      usernameHash: hash(username),
    }).then(() => {
      res.cookie("sessionString", sessionString, {
        expire: Date.now() + 3600000, // 1 hour
        httpOnly: true,
        // secure: true, // only on HTTPS
      });
    });

    resolve({ message: "session was created" });
  }).catch((error) => reject(error));
};

module.exports = { setSession };
