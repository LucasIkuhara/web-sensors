import type { ExtractorCallback, IExtractor } from "../ports/Extractor";

/**
 * A generic extractor able to handle basic extractor functionality, like registering and triggering callbacks.
 */
export class GenericExtractor<T> implements IExtractor<T> {

    protected _buffer?: T;
    protected _callbackPool: ExtractorCallback<T>[] = [];

    getData(): T {
        if (!this._buffer)
            throw new Error("The buffer is empty.");

        return this._buffer;
    }

    /**
     * Trigger all registered callbacks passing the latest buffer value as an argument.
     */
    protected triggerCallbacks() {
        const currentValue = this._buffer;
        if (currentValue) 
            this._callbackPool.forEach(fn => fn(currentValue));
    }

    destroy(): void {
        throw Error("Not implemented. Extractors must overload GenericExtractor's destroy method.");
    }

    registerCallback(target: ExtractorCallback<T>): void {
        this._callbackPool.push(target);
    }
}
