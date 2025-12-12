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
