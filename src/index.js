const express = require('express');
const dotenv = require('dotenv')

const Twit = require('twit');

const app = express();
dotenv.config()
app.use(express.json())

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, 
  strictSSL: true, 
});


app.get('/trends', (request,response) => {
 const {id} = request.body
  
 T.get(
    `https://api.twitter.com/2/tweets?ids=${id}&tweet.fields=created_at&expansions=author_id&user.fields=created_at`,
    (error, data, response) => {
        const {text} = data.data[0];
        const {name, id} = data.includes.users[0];
        const content = {name, text, userId:id};
        console.log(content)
    },
  );

  response.status(200).send('foi')
});


app.listen(3333, () => {
  console.log('Rodando MAOE')
});