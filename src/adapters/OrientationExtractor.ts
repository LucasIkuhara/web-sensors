import type { ExtractorCallback, IExtractor, OrientationData } from "../ports/Extractor";
import {
  AbsoluteOrientationSensor
} from 'motion-sensors-polyfill/src/motion-sensors.js';


/**
 * An Orientation extractor based on the AbsoluteOrientationSensor WebAPI.
 */
export class OrientationExtractor implements IExtractor<OrientationData> {

    private _sensor: any;
    private _buffer?: OrientationData;
    private _callbackPool: ExtractorCallback<OrientationData>[] = [];

    constructor(options: MotionSensorOptions = { frequency: 60, referenceFrame: "device" }) {
        this._sensor = new AbsoluteOrientationSensor(options);
        this._sensor.onreading = this.refreshData;
        this._sensor.onerror = this.handleWatchError;
        this._sensor.start(); 
    }

    getData(): OrientationData {

        if (!this._buffer)
            throw new Error("The buffer is empty.");

        return this._buffer;
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
        }
    }

    destroy(): void {
        this._sensor.stop()
    }

    registerCallback(target: ExtractorCallback<OrientationData>): void {
        this._callbackPool.push(target);
    }

    private handleWatchError(err: SensorErrorEvent) {
        console.warn("Failed to watch Orientation: ", err);
    }
}
