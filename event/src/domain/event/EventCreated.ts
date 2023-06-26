export default class EventCreated {
  constructor(
    readonly eventId: string,
    readonly description: string,
    readonly price: number,
    readonly capacity: number,
  ) {}
}
