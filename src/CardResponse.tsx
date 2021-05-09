export default class CardResponse {
  public message: string;
  public status: string;

  public constructor(theMessage: string, theStatus: string) {
    this.message = theMessage;
    this.status = theStatus;
  }
}