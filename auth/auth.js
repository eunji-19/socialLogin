// @ts-check

const { v4: uuidv4 } = require("uuid");
const { signJWT } = require("./jwt");
const dbConfig = require("../config/dbConfig");

async function getAccessTokenForUserId(userId) {
  return signJWT(userId);
}

async function createUserOrLogin({
  platformUserId,
  platform,
  nickname,
  profileImageURL,
}) {
  /*
   * USER DB -> Connect(MySQL)
   */
  //   const users = await getUsersCollection();

  /*
   * 기존 USER 있는지 확인
   */

  // TODO
  //   if (existingUser) {
  //     return {
  //       userId: existingUser.id,
  //       accessToken: await signJWT(existingUser.id),
  //     };
  //   }

  const userId = uuidv4();
  //   await users.insertOne({
  //     id: userId,
  //     platformUserId,
  //     platform,
  //     verified: true,
  //   });

  return {
    userId,
    accessToken: await signJWT(userId),
  };
}

function setAccessTokenCookie(res, token) {
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: true,
  });
}

module.exports = {
  getAccessTokenForUserId,
  createUserOrLogin,
  setAccessTokenCookie,
};
