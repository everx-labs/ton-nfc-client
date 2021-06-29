export default class CardResponse {
    public message: string
    public status: string
    public ecsHash: string
    public epHash: string
    public numberOfKeys: string
    public occupiedSize: string
    public freeSize: string
    public hmac: string
    public length: string
    public serialNumbers: Array<string>

    public constructor(message: string, status: string, ecsHash: string, epHash: string, numberOfKeys: string, occupiedSize: string, freeSize: string, hmac: string, length: string, serialNumbers: Array<string>) {
        this.message = message
        this.status = status
        this.ecsHash = ecsHash
        this.epHash = epHash
        this.numberOfKeys = numberOfKeys
        this.occupiedSize = occupiedSize
        this.freeSize = freeSize
        this.hmac = hmac
        this.length = length
        this.serialNumbers = serialNumbers
    }

}
