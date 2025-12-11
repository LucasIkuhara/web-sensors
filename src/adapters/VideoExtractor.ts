import type { ExtractorCallback, IExtractor } from "../ports/Extractor";


export type DataURL = string;

/**
 * A Video Image extractor based on the MediaStream WebAPI. Returns images as Data URLs.
 * Reference: https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/toDataURL
 */
export class VideoImageService implements IExtractor<DataURL> {

    private stream?: MediaStream;
    private callbackPool: ExtractorCallback<DataURL>[] = [];
    private canvas: CanvasRenderingContext2D;
    private player = document.createElement("video");
    private imgBuffer?: DataURL;
    private width: number = 0;
    private height: number = 0;
    private targetFPS: number;
    private loopId?: number;

    constructor(whichCamera: "environment" | "user", targetFPS: number, height: number, width: number) {

        this.targetFPS = targetFPS;
        this.width = width;
        this.height = height;

        const videoOptions: MediaTrackConstraints = {
            facingMode: whichCamera,
            frameRate: targetFPS,
            height,
            width
        };

        // Create canvas context for image capture
        const canvasCtx = document.createElement("canvas").getContext("2d");
        if (!canvasCtx) throw Error("Failed to create camera capture context.");
        this.canvas = canvasCtx;

        const options: MediaStreamConstraints = {
            audio: false,
            video: videoOptions
        };
        this.setupCapture(options);
    }

    /**
     * Create and wait for MediaStream to be started. Trigger Callbacks when done.
     * @param options 
     */
    async setupCapture(options: MediaStreamConstraints): Promise<void> {

        const media = await navigator.mediaDevices.getUserMedia(options);
        this.stream = media;

        this.player.srcObject = media;
        this.player.setAttribute("width", String(this.width));
        this.player.setAttribute("height", String(this.height));

        this.loopId = setInterval(() => {
            const data = this.imageToData();
            this.triggerCallbacks(data);
        }, 1000 / this.targetFPS);
    }

    /**
     * Converts images from the HTML Video element to an image as a DataURL string.
     * @returns The DataURL string.
     */
    private imageToData() {
        this.canvas?.drawImage(this.player, 0, 0, this.width, this.height);
        return this.canvas.canvas.toDataURL();
    }

    /**
     * Call all callbacks with the newest image.
     */
    private triggerCallbacks(data: DataURL) {

        this.callbackPool.forEach(async cb => {
            // Prevent callback failure from interfering with others.
            try {
                await cb(data);
            }
            catch (err) {
                console.error(`Callback ${cb.name} failed due to the following error: ${JSON.stringify(err)}`);
            }
        });
    }

    /**
     * Gets a video frame as a DataURL string.
     * @returns The DataURL string.
     */
    getData(): DataURL {

        if (!this.imgBuffer)
            throw new Error("The buffer is empty.");

        return this.imgBuffer;
    }

    destroy(): void {
        this.stream?.getTracks().forEach(tr =>
            tr.stop()
        );
        clearInterval(this.loopId);
        this.stream = undefined;
    }

    /**
     * Register callbacks awaiting for image data to be generated.
     * If there is already data, the callback is triggered immediately.
     * @param target 
     */
    registerCallback(target: ExtractorCallback<DataURL>): void {
        this.callbackPool.push(target);

        if (this.imgBuffer)
            target(this.imgBuffer);
    }

}
