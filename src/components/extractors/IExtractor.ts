/**
 * The callback signature for services implementing the @type {IExtractor} interface.
 */
export type ExtractorCallback<T> = (data: T) => unknown;

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
     * Refresh the reading of the extractor and return the result. 
     */
    refresh(): Promise<T>;

    /**
     * Setup the extractor service. This includes getting user grants.
     */
    setup(): void;
}
