/**
 * Represents Geolocation data containing longitude and latitude.
 */
export type GpsData = {
    type: "gps",
    payload: {
        longitude: number,
        latitude: number
    }
}

/**
 * Represents absolute orientation (in respect to earth) data as a quaternion (x, y, z, w).
 */
export type OrientationData = {
    type: "orientation",
    payload: {
        x: number,
        y: number,
        z: number,
        w: number
    }
}

/**
 * Represents linear acceleration from the device's pov, with gravity acceleration cancelled.
 */
export type AccelerationData = {
    type: "acceleration",
    payload: {
        x: number,
        y: number,
        z: number,
    }
}

export type SensorData = GpsData | OrientationData | AccelerationData;


/**
 * The callback signature for services implementing the @type {IExtractor} interface.
 */
export type ExtractorCallback<T> = (data: T) => Promise<void>;

export interface IExtractor<T> {

    /**
     * Returns the last extracted info.
     */
    getData(): T;

    /**
     * Register a callback function which should be ran when new data is
     * extracted successfully.
     * @param target The callback function.
     */
    registerCallback(target: ExtractorCallback<T>): void;

    /**
     * Destroy the extractor service. This includes clearing allocated or tracked resources.
     */
    destroy(): void;
}
