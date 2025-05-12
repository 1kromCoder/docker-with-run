import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthorModule, BookModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
