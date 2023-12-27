import type { IExtractor } from "../ports/IExtractor";

/**
 * A GPS extractor based on the Geolocation WebAPI.
 */
export class GpsExtractor implements IExtractor<GeolocationPosition> {

    private _useHighPrecision: boolean;
    private _watchId: number;
    private _buffer: GeolocationPosition;

    constructor(useHighPrecision: boolean) {

        this._useHighPrecision = useHighPrecision;
        this._watchId = this.setup();
    }

    setup(): number {
    
        // Fails if the context isn't capable of geolocation.
        if (~("geolocation" in navigator)) 
            throw new Error("GPS unavailable in the context.")

        // Start watching the GPS signal.
        const watchId = navigator.geolocation.watchPosition((position) => {
            this._buffer = position
        });

        return watchId;
    }

    getData(): GeolocationPosition {
        return this._buffer;
    }

    async refresh(): Promise<GeolocationPosition> {
        
    }
}