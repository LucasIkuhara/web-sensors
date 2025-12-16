import type { AccelerationData } from "../../domain/SensorData";
import {
    LinearAccelerationSensor
    // @ts-expect-error Types package doesn't work
} from 'motion-sensors-polyfill/src/motion-sensors.js';
import { GenericExtractor } from "./GenericExtractor";


type AccelerationEvent = { target: { x: number, y: number, z: number } }

/**
 * An Acceleration extractor based on the LinearAccelerationSensor WebAPI.
 */
export class AccelerationExtractor extends GenericExtractor<AccelerationData> {

    private _sensor: LinearAccelerationSensor;

    constructor(options: MotionSensorOptions = { frequency: 60, referenceFrame: "device" }) {
        super();
        this._sensor = new LinearAccelerationSensor(options);
        this._sensor.onreading = (e: AccelerationEvent) => this.refreshData(e);
        this._sensor.onerror = (e: SensorErrorEvent) => this.handleWatchError(e);
        this._sensor.start();
    }

    private refreshData(event: AccelerationEvent) {
        const { x, y, z } = event.target;
        this._buffer = {
            type: "acceleration",
            payload: {
                x: x,
                y: y,
                z: z
            }
        };
        this.triggerCallbacks();
    }

    destroy(): void {
        this._sensor.stop();
    }

    private handleWatchError(err: SensorErrorEvent) {
        console.warn("Failed to watch Acceleration: ", err);
    }
}
