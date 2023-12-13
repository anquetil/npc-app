/**
 * Decode the RLE image data into a format that's easier to consume in `buildSVG`.
 * @param image The RLE image data
 */
function decodeImage(image: string) {
   var _a, _b
   const data = image.replace(/^0x/, '')
   const paletteIndex = parseInt(data.substring(0, 2), 16)
   const bounds = {
      top: parseInt(data.substring(2, 4), 16),
      right: parseInt(data.substring(4, 6), 16),
      bottom: parseInt(data.substring(6, 8), 16),
      left: parseInt(data.substring(8, 10), 16),
   }
   const rects = data.substring(10)
   return {
      paletteIndex,
      bounds,
      rects:
         (_b =
            (_a =
               rects === null || rects === void 0 ? void 0 : rects.match(/.{1,4}/g)) ===
               null || _a === void 0
               ? void 0
               : _a.map((rect) => [
                    parseInt(rect.substring(0, 2), 16),
                    parseInt(rect.substring(2, 4), 16),
                 ])) !== null && _b !== void 0
            ? _b
            : [],
   }
}

/**
 * @notice Given an x-coordinate, draw length, and right bound, return the draw
 * length for a single SVG rectangle.
 */
function getRectLength(currentX: number, drawLength: number, rightBound: number) {
   const remainingPixelsInLine = rightBound - currentX
   return drawLength <= remainingPixelsInLine ? drawLength : remainingPixelsInLine
}
/**
 * Given RLE parts, palette colors, and a background color, build an SVG image.
 * @param parts The RLE part datas
 * @param paletteColors The hex palette colors
 * @param bgColor The hex background color
 */
export function buildSVG(
   parts: { data: string }[],
   paletteColors: string[],
   bgColor?: string
) {
   const svgWithoutEndTag = parts.reduce(
      (result, part) => {
         const svgRects: string[] = []
         const { bounds, rects } = decodeImage(part.data)
         let currentX = bounds.left
         let currentY = bounds.top
         rects.forEach((draw) => {
            let drawLength = draw[0]
            const colorIndex = draw[1]
            const hexColor = paletteColors[colorIndex]
            let length = getRectLength(currentX, drawLength, bounds.right)
            while (length > 0) {
               // Do not push rect if transparent
               if (colorIndex !== 0) {
                  svgRects.push(
                     `<rect width="${length * 10}" height="10" x="${currentX * 10}" y="${
                        currentY * 10
                     }" fill="#${hexColor}" />`
                  )
               }
               currentX += length
               if (currentX === bounds.right) {
                  currentX = bounds.left
                  currentY++
               }
               drawLength -= length
               length = getRectLength(currentX, drawLength, bounds.right)
            }
         })
         result += svgRects.join('')
         return result
      },
      `<svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="${
         bgColor ? `#${bgColor}` : 'none'
      }" />`
   )
   return `${svgWithoutEndTag}</svg>`
}
