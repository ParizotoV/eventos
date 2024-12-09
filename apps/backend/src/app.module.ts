import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { EventsController } from './events/events.controller';
import { EventsModule } from './events/events.module';

@Module({
  imports: [EventsModule],
  controllers: [AppController, EventsController],
  providers: [],
})
export class AppModule {}
