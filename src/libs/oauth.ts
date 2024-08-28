import queryString from "query-string";

const GOOGLE_OAUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";

const authQueryParams = {
  client_id: process.env.OAUTH_CLIENT_ID,
  redirect_uri: `http://localhost:8000${process.env.OAUTH_REDIRECT_URI}`,
};

// this objects contains information that will be passed as query params to the auth // token endpoint
const authTokenParams = {
  ...authQueryParams,
  response_type: "code",
};

// the scopes (portion of user's data) we want to access
const scopes = ["profile", "email", "openid"];

// a url formed with the auth token endpoint and the
const requestGetAuthCode = `${GOOGLE_OAUTH_ENDPOINT}?${queryString.stringify(
  authTokenParams
)}&scope=${scopes.join(" ")}`;

const google_access_token_endpoint = "https://oauth2.googleapis.com/token";

const getAccessToken = async (authCode: string) => {
  const access_token_params = {
    ...authQueryParams,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
    code: authCode,
    grant_type: "authorization_code",
  };

  return fetch(`${google_access_token_endpoint}`, {
    method: "POST",
    body: JSON.stringify(access_token_params),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export { requestGetAuthCode, getAccessToken };
