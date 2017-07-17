export const MOVED_PERMANENTLY = 301;
export const FOUND = 302;
export const SEE_OTHER = 303;
export const TEMPORARY_REDIRECT = 307;
export const PERMANENT_REDIRECT = 308;

const redirectStatusCodes = [MOVED_PERMANENTLY, FOUND, SEE_OTHER, TEMPORARY_REDIRECT, PERMANENT_REDIRECT];

export function isRedirect(statusCode) {
    return redirectStatusCodes.some(code => code === statusCode);
}
