import { error } from "@sveltejs/kit";
import type { ExtractorCallback, IExtractor } from "../ports/IExtractor";


/**
 * A GPS extractor based on the Geolocation WebAPI.
 */
export class VideoService implements IExtractor<MediaStream> {

    private _stream?: MediaStream;
    private _callbackPool: ExtractorCallback<MediaStream>[] = [];

    constructor(useBackCamera: boolean) {
        
        const cameraToUse = useBackCamera ? "environment" : "user";
        const videoOptions: MediaTrackConstraints = {
            facingMode: cameraToUse
        };

        const options: MediaStreamConstraints = {
            audio: false,
            video: videoOptions
        };
        this.setup(options)
    }

    /**
     * Create and wait for MediaStream to be started. Trigger Callbacks when done.
     * @param options 
     */
    async setup(options: MediaStreamConstraints): Promise<void> {

        const media = await navigator.mediaDevices.getUserMedia(options);
        this._stream = media;
        this.triggerCallbacks();
    }

    /**
     * Call all callbacks with the media stream.
     */
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

    /**
     * Gets a MediaStream object with camera and audio.
     * @returns A copy of the media stream.
     */
    getData(): MediaStream {

        if (!this._stream)
            throw new Error("The buffer is empty.");

        return this._stream;
    }

    destroy(): void {
        this._stream = undefined;
    }

    /**
     * Register callbacks awaiting for the MediaStream to be initialized.
     * If there is already a MediaStream, the callback is triggered immediately.
     * @param target 
     */
    registerCallback(target: ExtractorCallback<MediaStream>): void {
        this._callbackPool.push(target);

        if (this._stream)
            target(this._stream);
    }

}
