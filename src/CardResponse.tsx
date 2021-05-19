export default class CardResponse {
  public message: string;
  public status: string;

  public constructor(message: string, status: string) {
    this.message = message;
    this.status = status;
  }
}