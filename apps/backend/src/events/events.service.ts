import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EventsService {
  constructor(readonly prismaService: PrismaService) {}
  async searchEvents() {
    return await this.prismaService.event.findMany();
  }

  async getById(id: string) {
    const event = await this.prismaService.event.findFirst({
      where: {
        id: id,
      },
      include: {
        guests: true,
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  }

  async getByAlias(alias: string) {
    const event = await this.prismaService.event.findFirst({
      where: {
        alias: alias,
      },
      include: {
        guests: true,
      },
    });

    console.log('event', event);

    if (!event) {
      throw new Error('Event not found');
    }

    return event;
  }

  async validAlias(alias: string, id: string) {
    const event = await this.prismaService.event.findFirst({
      where: {
        alias: alias,
      },
      include: {
        guests: true,
      },
    });

    return { valid: !event || event.id === id };
  }

  async accessEvent(id: string, password: string) {
    const event = await this.prismaService.event.findFirst({
      where: {
        id: id,
      },
      include: {
        guests: true,
      },
    });

    if (event.password !== password) {
      throw new Error('Invalid password');
    }

    return event;
  }
}
