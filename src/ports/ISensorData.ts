import type { SensorData } from "./Extractor";

/**
 * An entity capable of transmitting sensor data.
 */
export interface ISensorTransmitter {

    /**
     * Send sensor data frame.
     * @param data The sensor observation.
     */
    sendData(data: SensorData): Promise<void>
}
