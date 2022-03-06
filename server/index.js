import express from "express";
import cors from "cors";
import "dotenv/config";
import request from "request";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 5000;

let accessToken = "";
let refreshToken = "";
let expiresIn = 0;
const redirect_uri = "http://localhost:3000/auth/callback";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/auth/login", (req, res) => {
  const generateRandomString = (length) => {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const scope =
    "streaming \
    playlist-read-private \
    playlist-read-collaborative \
     user-read-email \
     user-top-read \
      user-read-private \
      user-read-recently-played \
      user-library-read \
       user-library-modify \
       user-read-currently-playing \
        user-read-playback-state \
         user-modify-playback-state";

  const state = generateRandomString(16);

  const auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  });

  res.redirect(
    "https://accounts.spotify.com/authorize/?" +
      auth_query_parameters.toString()
  );
});

app.get("/auth/callback", (req, res) => {
  const code = req.query.code;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      accessToken = body.access_token;
      expiresIn = body.expires_in;
      refreshToken = body.refresh_token;
      res.redirect("/");
    }
  });
});

app.get("/auth/token", (req, res) => {
  console.log("Returned token at ", new Date().toLocaleString());

  res.json({
    accessToken: accessToken,
    expiresIn: expiresIn,
    refreshToken,
  });

  if (accessToken) {
    accessToken = "";
    refreshToken = "";
    expiresIn = 0;
  }
});

app.post("/auth/refresh_token", (req, res) => {
  const refresh_token = req.body?.refreshToken;

  if (!refresh_token) {
    res.sendStatus(404);
  }

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log("Refreshed token at ", new Date().toLocaleString());
      res.json({
        accessToken: body.access_token,
        expiresIn: body.expires_in,
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
