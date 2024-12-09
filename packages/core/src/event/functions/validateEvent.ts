import type Event from "../model/Event";

export default function validateEvent(event: Partial<Event>): string[] {
  const errors: string[] = [];

  if (!event.alias) {
    errors.push("Alias é obrigatório");
  }
  if (!event.name) {
    errors.push("Nome é obrigatório");
  }
  if (!event.description) {
    errors.push("Descrição é obrigatória");
  }
  if (!event.date) {
    errors.push("Data é obrigatória");
  }
  if (!event.local) {
    errors.push("Local é obrigatório");
  }
  if (!event.expectedAudience || event.expectedAudience < 1) {
    errors.push("Público esperado é obrigatório");
  }
  if (!event.imageBackground) {
    errors.push("Imagem de fundo é obrigatória");
  }
  if (!event.image) {
    errors.push("Imagem é obrigatória");
  }
  if (event.image && !event.image.match(/.(jpg|jpeg|png)$/i)) {
    errors.push("Imagem inválida");
  }
  if (
    event.imageBackground &&
    !event.imageBackground.match(/.(jpg|jpeg|png)$/i)
  ) {
    errors.push("Imagem de fundo inválida");
  }

  return errors;
}
