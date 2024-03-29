import express, { RequestHandler } from 'express';
import { json as bodyParserJson } from 'body-parser';
import { dbClient } from './db';
import { serverAPIPort, APIPath, APICloneTicket } from '@fed-exam/config';
import { Ticket } from '../client/src/api';

console.log('starting server', { serverAPIPort, APIPath });

export const app = express();
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

app.get('/', async (req, res) => {
  res.send('ok');
});

app.get(APIPath, (async (req, res) => {

  // @ts-ignore
  const page: number = req.query.page || 1;
  const data = await db.getTickets();

  res.json([...data, ...clonesTickets]);
}));


app.get(`${APIPath}/by`, async (req, res) => {
  try {
    const { page } = req.query;
    const pageNumber = parseInt(page as string);

    let tickets = await db.getTicketsByPageNumber(pageNumber);
    res.status(200).json(tickets);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post(APICloneTicket, (async (req, res) => {

  clonesTickets.push(req.body)
  res.status(200).send({ sucess: true, message: 'ok' });
}))

app.listen(serverAPIPort);

console.log('server running', serverAPIPort)

