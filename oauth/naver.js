const { default: fetch } = require("node-fetch");
const { v4: uuidv4 } = require("uuid");
const { getAccessTokenForUserId } = require("../auth/auth");
const {
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
  NAVER_REDIRECT_URI,
} = require("../config/common");

async function getNaverIdFromAccessToken(accessToken) {
  const tokenVerifyResult = await fetch(`https://openapi.naver.com/v1/nid/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

/**
 * naver token 검증하고, 해당 검증 결과로부터 우리 서비스의 유저를 만들거나,
 * 혹은 이미있는 유저를 가져와서, 그 유저의 액세스 토큰을 돌려준다
 */
async function getUserAccessTokenForNaverAccessToken(token) {
  const naverId = await getNaverIdFromAccessToken(token);

  const existingUserId = await getUserIdWithNaverId(facebookId);

  // 2. 해당 Naver ID에 해당하는 유저가 데이터에비으세 있는 경우
  if (existingUserId) {
    return getAccessTokenForUserId(existingUserId);
  }

  // 1. 해당 Naver ID에 해당하는 유저가 데이터베이스에 없는 경우
  const userId = await createUserWithNaverIdAndGetId(naverId);

  return getAccessTokenForUserId(userId);
}

module.exports = {
  getUserAccessTokenForNaverAccessToken,
};
