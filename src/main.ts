import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.enableCors();
    app.setGlobalPrefix('api');

    // Подключение документации к проекту
    const config = new DocumentBuilder()
        .setTitle('Сервер админка')
        .setDescription('Документация по REST API')
        .setVersion('0.0.1')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    const PORT = process.env.PORT || 5000;
    await app.listen(PORT, () => console.log('Server started on port: ' + PORT));
}

bootstrap();
