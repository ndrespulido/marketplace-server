import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionsLoggerFilter } from './marketplace/utils/exceptionsLogger.filter';

require("dotenv").config();
const port=process.env.PORT;

async function bootstrap() {

    console.log('test');

    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port,
      },
    });

    //const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    //app.enableCors();

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter));

    const options = new DocumentBuilder()
        .setTitle('Marketplace')
        .setDescription('POC of Marketplace from the comply Sqad')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
        
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
    
  await app.listen(port);
  console.log('Start running on: ${await app.getUrl()}');
}
bootstrap();
