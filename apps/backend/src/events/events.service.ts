import { Injectable } from '@nestjs/common';
import { complementEvent, Date, type Event, type Guest } from 'core';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class EventsService {
  constructor(readonly prismaService: PrismaService) {}
  async searchEvents() {
    return await this.prismaService.event.findMany({
      include: {
        guests: true,
      },
    });
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

  async addGuest(alias: string, guest: Guest) {
    const event = await this.prismaService.event.findFirst({
      where: {
        alias: alias,
      },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    const existingGuest = await this.prismaService.guest.findFirst({
      where: {
        eventId: event.id,
        email: guest.email,
      },
    });

    if (existingGuest) {
      throw new Error('Guest already exists');
    }

    return await this.prismaService.guest.create({
      data: {
        ...guest,
        eventId: event.id,
      },
    });
  }

  async createEvent(event: Event) {
    const existingEvent = await this.prismaService.event.findFirst({
      where: {
        alias: event.alias,
      },
    });

    if (existingEvent && existingEvent.id !== event.id) {
      throw new Error('The event with this alias already exists');
    }

    const eventComplete = complementEvent(this.deserializeEvent(event));

    if (existingEvent) {
      return await this.prismaService.event.update({
        where: {
          id: existingEvent.id,
        },
        include: {
          guests: true,
        },
        data: {
          ...eventComplete,
          guests: {
            createMany: {
              data: eventComplete.guests
                .filter((guest) => !guest.id)
                .map((guest) => ({
                  ...guest,
                })),
            },
            updateMany: eventComplete.guests
              .filter((guest) => guest.id)
              .map((guest) => ({
                where: {
                  id: guest.id,
                },
                data: {
                  confirmed: guest.confirmed,
                  email: guest.email,
                  hasCompanion: guest.hasCompanion,
                  name: guest.name,
                  id: guest.id,
                  qtyCompanions: guest.qtyCompanions,
                },
              })),
          },
        },
      });
    }

    return await this.prismaService.event.create({
      data: {
        ...eventComplete,
        guests: {
          create: eventComplete.guests,
        },
      },
    });
  }

  private deserializeEvent(event: any): Event {
    if (!event) return null;
    return {
      ...event,
      date: Date.parse(event.date),
    };
  }
}
