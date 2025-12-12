import type { SensorData } from "../domain/sensorData";

/**
 * An entity capable of transmitting sensor data.
 */
export interface Transmitter {

    /**
     * Send sensor data frame.
     * @param data The sensor observation.
     */
    sendData(data: SensorData): Promise<void>
}
