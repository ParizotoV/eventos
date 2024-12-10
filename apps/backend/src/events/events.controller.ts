import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Date, Event, Id } from 'core';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('/access')
  async accessEvent(@Body() datas: { id: string; password: string }) {
    return await this.eventsService.accessEvent(datas.id, datas.password);
  }

  @Get()
  async searchEvents() {
    return await this.eventsService.searchEvents();
  }

  @Get(':id')
  async getEvent(@Param('id') id: string) {
    if (Id.valid(id)) {
      return this.serializeEvent(await this.eventsService.getById(id));
    } else {
      return this.serializeEvent(await this.eventsService.getByAlias(id));
    }
  }

  @Get('validate/:alias/:id')
  async validateAlias(@Param('alias') alias: string, @Param('id') id: string) {
    console.log('alias', alias);
    console.log('id', id);
    return await this.eventsService.validAlias(alias, id);
  }

  private serializeEvent(event: Event) {
    if (!event) return null;
    return {
      ...event,
      date: Date.format(event.date),
    };
  }

  private deserializeEvent(event: any): Event {
    if (!event) return null;
    return {
      ...event,
      date: Date.parse(event.date),
    };
  }
}
