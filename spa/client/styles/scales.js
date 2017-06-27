const pxBase = 2;
const pxRatio = 6 / 5;
const remBase = 2 / 16;
const remRatio = 6 / 5;
const regularDevicePixelRatio = 2;

export function px(factor) {
    const size = Math.pow(pxRatio, factor) * pxBase;

    // Round to whole device pixels
    return Math.floor(size * regularDevicePixelRatio) / regularDevicePixelRatio;
}

export function rem(factor) {
    return Math.pow(remRatio, factor) * remBase;
}
