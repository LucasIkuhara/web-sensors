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
        const acc = event.target;
        console.log(acc)
        this._buffer = {
            type: "acceleration",
            payload: {
                x: 1,
                y: 1,
                z: 2
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
