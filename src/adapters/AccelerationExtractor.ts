import type { AccelerationData } from "../ports/Extractor";
import {
    LinearAccelerationSensor
    // @ts-ignore
} from 'motion-sensors-polyfill/src/motion-sensors.js';
import { GenericExtractor } from "./GenericExtractor";


/**
 * An Acceleration extractor based on the LinearAccelerationSensor WebAPI.
 */
export class AccelerationExtractor extends GenericExtractor<AccelerationData> {

    private _sensor: LinearAccelerationSensor;

    constructor(options: MotionSensorOptions = { frequency: 60, referenceFrame: "device" }) {
        super()
        this._sensor = new LinearAccelerationSensor(options);
        this._sensor.onreading = (e: Event) => this.refreshData(e);
        this._sensor.onerror = (e: SensorErrorEvent) => this.handleWatchError(e);
        this._sensor.start(); 
    }

    private refreshData(event: Event) {   
        const {x, y, z} = event.target as any;
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
        console.warn("Failed to watch Orientation: ", err);
    }
}
