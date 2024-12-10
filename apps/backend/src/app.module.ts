import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './database/prisma.module';
import { PrismaService } from './database/prisma.service';
import { EventsModule } from './events/events.module';

@Module({
  imports: [EventsModule, PrismaModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
