import { error } from "@sveltejs/kit";
import type { ExtractorCallback, IExtractor } from "../ports/IExtractor";


/**
 * A GPS extractor based on the Geolocation WebAPI.
 */
export class GpsExtractor implements IExtractor<GeolocationPosition> {

    private _watchId: number;
    private _buffer?: GeolocationPosition;
    private _callbackPool: ExtractorCallback<GeolocationPosition>[] = [];

    constructor(highAccuracy: boolean) {

        // Fails if the context isn't capable of geolocation.
        // if (!("geolocation" in navigator)) 
        //     throw new Error("GPS unavailable in the context.")

        const options: PositionOptions = {
            enableHighAccuracy: highAccuracy
        };

        // Start watching the GPS signal.
        this._watchId = navigator.geolocation.watchPosition(
            async dt => {this.refresh(dt)},
            this.handleWatchError,
            options
        );
    }

    getData(): GeolocationPosition {

        if (!this._buffer)
            throw new Error("The buffer is empty.");

        return this._buffer;
    }

    destroy(): void {
        navigator.geolocation.clearWatch(this._watchId);
    }

    registerCallback(target: ExtractorCallback<GeolocationPosition>): void {
        this._callbackPool.push(target);
    }

    private handleWatchError(err: GeolocationPositionError) {
        console.error(`Failed to watch GPS: ${JSON.stringify(err)}`);
    }

    /**
     * Save data to buffer and trigger callbacks.
     * @param position 
     */
    async refresh(position: GeolocationPosition): Promise<void> {
        
        this._buffer = position;
        this._callbackPool.forEach(async cb => {

            // Create a copy, so callbacks can't alter the buffer.
            const copy = position//structuredClone(position);

            // Prevent callback failure from interfering with others.
            try {
                await cb(copy);
            }
            catch (err) {
                console.error(`Callback ${cb.name} failed due to the following error: ${JSON.stringify(err)}`);
            }
        })
    }
}
