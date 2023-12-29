import type { GpsData, ISensorTransmitter } from "../ports/ISensorData";


export class WSTransmitter implements ISensorTransmitter {

    async sendData(data: GpsData): Promise<any> {
        
    }
}
