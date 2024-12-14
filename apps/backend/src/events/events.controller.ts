import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Date, Event, Id, type Guest } from 'core';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  async createEvent(@Body() event: Event) {
    return await this.eventsService.createEvent(event);
  }

  @Post(':alias/guest')
  async addGuest(@Param('alias') alias: string, @Body() guest: Guest) {
    return await this.eventsService.addGuest(alias, guest);
  }

  @Post('access')
  async accessEvent(@Body() datas: { id: string; password: string }) {
    return await this.eventsService.accessEvent(datas.id, datas.password);
  }

  @Get()
  async searchEvents() {
    return await this.eventsService.searchEvents();
  }

  @Get(':id')
  async getEvent(
    @Param('id') id: string,
    @Query('complete') complete: boolean,
  ) {
    if (Id.valid(id)) {
      return this.serializeEvent(
        await this.eventsService.getById(id, complete),
      );
    } else {
      return this.serializeEvent(
        await this.eventsService.getByAlias(id, complete),
      );
    }
  }

  @Get('validate/:alias/:id')
  async validateAlias(@Param('alias') alias: string, @Param('id') id: string) {
    return await this.eventsService.validAlias(alias, id);
  }

  private serializeEvent(event: Event) {
    if (!event) return null;
    return {
      ...event,
      date: Date.format(event.date),
    };
  }
}
