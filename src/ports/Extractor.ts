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
     * extracted successfully. If buffered data is already present, trigger
     * the callback immediately.
     * @param target The callback function.
     */
    registerCallback(target: ExtractorCallback<T>): void;

    /**
     * Destroy the extractor service. This includes clearing allocated or tracked resources.
     */
    destroy(): void;
}
