import { error } from "@sveltejs/kit";
import type { ExtractorCallback, IExtractor } from "../ports/IExtractor";


/**
 * A GPS extractor based on the Geolocation WebAPI.
 */
export class VideoService implements IExtractor<MediaStream> {

    private _stream?: MediaStream;
    private _callbackPool: ExtractorCallback<MediaStream>[] = [];

    constructor() {

        const options: MediaStreamConstraints = {
            audio: true,
            video: true
        };
        this.setup(options)
    }

    async setup(options: MediaStreamConstraints): Promise<void> {

        const media = await navigator.mediaDevices.getUserMedia(options);
        this._stream = media;
        this.triggerCallbacks();
    }

    private triggerCallbacks() {

        this._callbackPool.forEach(async cb => {

            if (!this._stream)
                return;

            // Prevent callback failure from interfering with others.
            try {
                await cb(this._stream);
            }
            catch (err) {
                console.error(`Callback ${cb.name} failed due to the following error: ${JSON.stringify(err)}`);
            }
        });
    }

    getData(): MediaStream {

        if (!this._stream)
            throw new Error("The buffer is empty.");

        return this._stream;
    }

    destroy(): void {
        this._stream = undefined;
    }

    registerCallback(target: ExtractorCallback<MediaStream>): void {
        this._callbackPool.push(target);
        this.triggerCallbacks();
    }

}
