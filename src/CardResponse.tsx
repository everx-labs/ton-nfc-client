export default class CardResponse {
    public message: string
    public status: string
    public ecsHash: string
    public epHash: string
    public numberOfKeys: number
    public occupiedSize: number
    public freeSize: number
    public hmac: string
    public length: number
    public sn: string
    public serialNumbers: Array<string>

    public constructor(message: string, status: string, ecsHash: string, epHash: string, sn: string, numberOfKeys: number, occupiedSize: number, freeSize: number, hmac: string, length: number, serialNumbers: Array<string>) {
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
        this.sn = sn
    }

}
