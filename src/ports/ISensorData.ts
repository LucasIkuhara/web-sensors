export type SensorData = GpsData;

export type GpsData = {
    type: "gps",
    payload: {
        longitude: number,
        latitude: number
    }
}

/**
 * An entity capable of transmitting sensor data.
 */
export interface ISensorTransmitter {

    /**
     * Send sensor data frame.
     * @param data The sensor observation.
     */
    sendData(data: SensorData): Promise<any>
}
