import type { ExtractorCallback, IExtractor, OrientationData } from "../ports/Extractor";
import {
  AbsoluteOrientationSensor
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
        this._sensor.onreading = this.refreshData;
        this._sensor.onerror = this.handleWatchError;
        this._sensor.start(); 
    }

    private refreshData(event: Event) {
        const q: number[] = event.target?.quaternion;
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
