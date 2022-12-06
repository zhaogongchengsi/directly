import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

const PORT = 3000;
const PREFIX = 'api/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'anya-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.setGlobalPrefix(PREFIX);
  await app.listen(PORT);
  console.log(`\n http listen on : http://localhost:${PORT}/${PREFIX}`);
}
bootstrap();
