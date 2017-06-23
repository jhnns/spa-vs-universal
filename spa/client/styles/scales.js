const baseFontSize = 16;
const targetFontSize = 12;
const pxBase = 4;
const pxRatio = 9 / 8;
const remBase = targetFontSize / baseFontSize;
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
