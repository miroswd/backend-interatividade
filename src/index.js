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


app.get('/', (request,response) => {
  
  try {
    const {id} = request.body
    console.log(id)
  let ala = []
  T.get(
    `https://api.twitter.com/2/tweets?ids=${id}&tweet.fields=created_at&expansions=author_id&user.fields=created_at`,
    (error, data, response) => {
      for (let i =0; i < data.data.length; i++){     
        const {text} = data.data[i];
         const {name, id} = data.includes.users[i];
         const content = {name, text, userId:id};
        ala.push(content)
      }
      },
    );
    
    setTimeout(() => {
      console.log(ala)
      response.status(200).json(ala)
    }, 2000)
  } catch (error) {
    
    response.status(200).send('foi não')
  }
});


app.listen(3030, () => {
  console.log('Rodando MAOE')
});