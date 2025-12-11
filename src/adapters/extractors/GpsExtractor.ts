import type { GpsData } from "../../ports/Extractor";
import { GenericExtractor } from "./GenericExtractor";


/**
 * A GPS extractor based on the Geolocation WebAPI.
 */
export class GpsExtractor extends GenericExtractor<GpsData> {

    private _watchId: number;

    constructor(options = { enableHighAccuracy: true }) {
        super();

        // Fails if the context isn't capable of geolocation.
        if (!("geolocation" in navigator))
            throw new Error("GPS unavailable in the context.");

        // Start watching the GPS signal.
        this._watchId = navigator.geolocation.watchPosition(
            async dt => { this.refresh(dt); },
            this.handleWatchError,
            options
        );
    }

    destroy(): void {
        navigator.geolocation.clearWatch(this._watchId);
    }

    private handleWatchError(err: GeolocationPositionError) {
        console.error(`Failed to watch GPS: ${JSON.stringify(err)}`);
    }

    /**
     * Save data to buffer and trigger callbacks.
     * @param position 
     */
    async refresh(position: GeolocationPosition): Promise<void> {
        this._buffer = {
            type: "gps",
            payload: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        };
        this.triggerCallbacks();
    }
}
