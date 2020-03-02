import express from 'express';
// import bodyParser from "body-parser";
import { listings } from "./listings";

const app = express();
const port = 9000;

// app.use(bodyParser.json());
app.use(express.json());

app.get('/', (_req, res) => res.send('Hello world!'));

app.get('/listings', (_req, res) => {
  // return res.send(listings)
  res.status(200)
    .send({listings})
});

app.get('/listing', (req, res) => {
  const id = req.body.id;

  const result = listings.filter(listing => listing.id === id)[0];

  if (result)
    res.status(200)
      .send(result);
  else
    res.status(404)
      .send({'error': 'No such a listing'});
});

app.delete('/listing', (req, res) => {
  const id: string = req.body.id;

  for (let i = 0; i < listings.length; i++){
    if (listings[i].id === id) {
      return res.status(200)
        .send(listings.splice(i,1)[0])
    }
  }

  return res.status(404)
    .send({'error': 'failed to delete listing'})
});

app.post('/delete-listing', (req, res) => {
  const id: string = req.body.id;

  for (let i = 0; i < listings.length; i++){
    if (listings[i].id === id) {
      return res.send(listings.splice(i,1)[0])
    }
  }

  return res.send('failed to delete listing')
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
