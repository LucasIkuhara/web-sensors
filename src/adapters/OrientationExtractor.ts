import type { OrientationData } from "../ports/Extractor";
import {
    AbsoluteOrientationSensor
    // @ts-ignore
} from 'motion-sensors-polyfill/src/motion-sensors.js';
import { GenericExtractor } from "./GenericExtractor";


/**
 * An Orientation extractor based on the AbsoluteOrientationSensor WebAPI.
 */
export class OrientationExtractor extends GenericExtractor<OrientationData> {

    private _sensor: AbsoluteOrientationSensor;

    constructor(options: MotionSensorOptions = { frequency: 60, referenceFrame: "device" }) {
        super()
        this._sensor = new AbsoluteOrientationSensor(options);
        this._sensor.onreading = (e: Event) => this.refreshData(e);
        this._sensor.onerror = (e: SensorErrorEvent) => this.handleWatchError(e);
        this._sensor.start(); 
    }

    private refreshData(event: Event) {
        const q: number[] = (event.target as any).quaternion;
        this._buffer = {
            type: "orientation",
            payload: {
                x: q[0],
                y: q[1],
                z: q[2],
                w: q[3],
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
