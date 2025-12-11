import type { ExtractorCallback } from "../../ports/Extractor";
import { GenericExtractor } from "./GenericExtractor";


export type DataURL = string;

/**
 * A Video Image extractor based on the MediaStream WebAPI. Returns images as Data URLs.
 * Reference: https://developer.mozilla.org/docs/Web/API/HTMLCanvasElement/toDataURL
 */
export class VideoImageService extends GenericExtractor<DataURL> {

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

        super();
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

        this.stream = await navigator.mediaDevices.getUserMedia(options);

        // Configure virtual video html element
        this.player.srcObject = this.stream;
        this.player.setAttribute("width", String(this.width));
        this.player.setAttribute("height", String(this.height));
        this.player.setAttribute('autoplay', '');
        this.player.setAttribute('muted', '');

        this.loopId = setInterval(() => {
            this._buffer = this.imageToData();
            this.triggerCallbacks();
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

    destroy(): void {
        this.stream?.getVideoTracks().forEach(e => e.stop());
        clearInterval(this.loopId);
        this.stream = undefined;
    }
}
