import express, { RequestHandler } from 'express';
import { json as bodyParserJson } from 'body-parser';
import { dbClient } from './db';
import { serverAPIPort, APIPath, APICloneTicket } from '@fed-exam/config';
import { Ticket } from '../client/src/api';

console.log('starting server', { serverAPIPort, APIPath });

const app = express();
const db = dbClient({ filePath: './data.sqlite' });

const PAGE_SIZE = 20;

const clonesTickets: Ticket[] = [];


app.use(bodyParserJson());

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

const asyncWrapper = (fn: RequestHandler): RequestHandler => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (e) {
    next(e);
  }
}
app.get('/', (req, res) => {
  res.send('ok');
});

app.get(APIPath, (async (req, res) => {

  // @ts-ignore
  const page: number = req.query.page || 1;
  const data = await db.getTickets();

  res.json([...data, ...clonesTickets]);
}));

app.post(APICloneTicket, (async (req, res) => {
  // const { id, title, content, userEmail, creationTime, labels } = req.body;
  clonesTickets.push(req.body)
  console.log(req.body.title);
  res.status(200).send({ sucess: true, message: 'ok' });
}))

app.listen(serverAPIPort);
console.log('server running', serverAPIPort)

