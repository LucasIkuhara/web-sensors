import type { ExtractorCallback, IExtractor, OrientationData } from "../ports/Extractor";


/**
 * An Orientation extractor based on the AbsoluteOrientationSensor WebAPI.
 */
export class OrientationExtractor implements IExtractor<OrientationData> {

    private _sensor: any;
    private _buffer?: OrientationData | any;
    private _callbackPool: ExtractorCallback<OrientationData>[] = [];

    constructor(options = { frequency: 60, referenceFrame: "device" }) {
        this._sensor = new AbsoluteOrientationSensor(options);
        this._sensor.onreading = e => this.refreshData(e);
        this._sensor.onerror = this.handleWatchError;
        this._sensor.start(); 
    }

    getData(): OrientationData {

        if (!this._buffer)
            throw new Error("The buffer is empty.");

        console.log(this._buffer)
        return this._buffer;
    }

    private refreshData(event: Event) {
        this._buffer = event.target.quaternion;
    }

    destroy(): void {
        this._sensor.stop()
    }

    registerCallback(target: ExtractorCallback<OrientationData>): void {
        this._callbackPool.push(target);
    }

    private handleWatchError(err: SensorErrorEvent) {
        console.warn("Failed to watch Orientation: ", err);
        window.alert(JSON.stringify(err))
    }
}
