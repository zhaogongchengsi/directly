import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 3000;
const PREFIX = 'ap1/v1';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(PREFIX);
  await app.listen(PORT);
  console.log(`\n http listen on : http://localhost:${PORT}/${PREFIX}`);
}
bootstrap();
