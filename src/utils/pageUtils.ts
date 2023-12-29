/**
 * Gets the target URL to send data to from the page's query params, if there is one.
 * In case there isn't, an empty string is returned.
 * The URL is expected to be an encoded URIComponent.
 * 
 * For instructions, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 */
export function getTargetServer(): string {
    const params = new URLSearchParams(window.location.search);
    const url = params.get("target") ?? "";
    return decodeURIComponent(url)
}

