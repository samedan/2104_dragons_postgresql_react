const { hash } = require("../account/helper");
const Session = require("../account/session");
const AccountTable = require("../account/table");

const setSession = ({ username, res, sessionId }) => {
  return new Promise((resolve, reject) => {
    let session, sessionString;
    if (sessionId) {
      // if session already opened on DB
      sessionString = Session.sessionString({ username, id: sessionId });
      setSessionCookie({ sessionString, res });
      resolve({ message: "session restored" });
    } else {
      // if no previous session (undefined)
      session = new Session({ username });
      sessionString = session.toString();
      AccountTable.updateSessionId({
        sessionId: session.id,
        usernameHash: hash(username),
      })
        .then(() => {
          setSessionCookie({ sessionString, res });
          resolve({ message: "session was created" });
        })
        .catch((error) => reject(error));
    }
  });
};

const setSessionCookie = ({ sessionString, res }) => {
  res.cookie("sessionString", sessionString, {
    expire: Date.now() + 3600000, // 1 hour
    httpOnly: true,
    // secure: true, // only on HTTPS
  });
};

module.exports = { setSession };
