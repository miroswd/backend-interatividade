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
        const {name, username, id} = data.includes.users[i];
        
        T.get(`https://api.twitter.com/1.1/users/show.json?screen_name=${username}`,(error,data,response) => {
          // data retornando tudo do usuário
          const avatar_url = data.profile_image_url_https.replace('_normal','')
          const content = {name, text, userId:id, avatar_url};
          ala.push(content)
        })
      }
      },
    );

    
    
    setTimeout(() => {
      response.status(200).json(ala)
    }, 2000)
  } catch (error) {
    
    response.status(200).send('foi não')
  }
});


app.listen(3333, () => {
  console.log('Rodando MAOE')
});