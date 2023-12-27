import type { IExtractor } from "../ports/IExtractor";

export const dummy = 2;

type Geolocation = {
    longitude: number,
    latitude: number
}
export class GpsExtractor implements IExtractor<Geolocation> {
    
    getData(): Geolocation {
        
    }
}