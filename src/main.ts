import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';

require("dotenv").config();
const port=process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Marketplace')
    .setDescription('POC of Marketplace from the comply Sqad')
    .setVersion('1.0')
    .addTag('marketplace')
    .addBearerAuth()
    .build();
        
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);


  // app.use(
  //   session({
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //     cookie: { secure: false }
  //   }),
  // );
   

  await app.listen(port);
  console.log('Start running on: ${await app.getUrl()}');
}
bootstrap();
