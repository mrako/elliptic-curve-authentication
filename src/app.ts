import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

import cors from 'kcors';

import { authMiddleware } from './verify';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(logger());
app.use(cors({ credentials: true }));
app.use(bodyParser());

app.use(authMiddleware);

app.use(ctx => {
  const { body } = ctx.request;

  ctx.body = body;
});

(async () => {
  app.listen(port);
})();

console.log(`App listening on port ${port}`);
