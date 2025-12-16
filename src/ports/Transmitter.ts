import type { SensorData } from "../domain/SensorData";

/**
 * An entity capable of transmitting sensor data.
 */
export interface ITransmitter {

    /**
     * Send sensor data frame.
     * @param data The sensor observation.
     */
    sendData(data: SensorData): Promise<void>
}
