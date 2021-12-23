import type { NextApiRequest, NextApiResponse } from "next";
import TwitterApi from "twitter-api-v2";

interface Resp {
  error: boolean;
  data?: Data;
}

interface Data {
  id: string;
  username: string;
  name: string;
  tweet: number;
  followers: number;
  following: number;
}

export default async function PublicTwitter(
  req: NextApiRequest,
  res: NextApiResponse<Resp>,
) {
  const { username: uname } = req.query;

  if (uname == undefined || uname == "")
    return res.status(200).json({ error: true });

  const bearer_token = <string>process.env.BEARER_TOKEN;
  const client = new TwitterApi(bearer_token);

  const { data } = await client.v2.userByUsername(<string>uname, {
    "user.fields": ["id", "name", "public_metrics", "username"],
  });

  if (data == undefined) return res.status(200).json({ error: true });

  const { id, username, name } = data;

  type PublcMetrics = {
    followers_count: number;
    following_count: number;
    tweet_count: number;
  };

  const {
    followers_count: followers,
    following_count: following,
    tweet_count: tweet,
  } = <PublcMetrics>data.public_metrics;

  const resp = { id, username, name, tweet, followers, following };

  res.status(200).json({ error: false, data: resp });
}
