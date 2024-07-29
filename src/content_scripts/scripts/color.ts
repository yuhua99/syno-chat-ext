export interface Color {
  r: number
  g: number
  b: number
  a: number
}

export function getDefaultColor(customFields?: Partial<Color>): Color {
  return {
    r: customFields?.r || 0,
    g: customFields?.g || 0,
    b: customFields?.b || 0,
    a: customFields?.a || 1
  }
}

function padZero(str: string): string {
  return str.length === 1 ? '0' + str : str
}

function hexToColor(hexStr: string): Color {
  if (hexStr.startsWith('#')) {
    hexStr = hexStr.slice(1)
  }
  if (hexStr.length === 3) {
    hexStr = hexStr.split('').map(x => x + x).join('')
  }
  return getDefaultColor({
    r: parseInt(hexStr.slice(0, 2), 16),
    g: parseInt(hexStr.slice(2, 4), 16),
    b: parseInt(hexStr.slice(4, 6), 16)
  })
}

function rgbToColor(rgbStr: string): Color {
  const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i)
  return match
    ? getDefaultColor({ r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) })
    : getDefaultColor()
}

export function toColor(colorStr: string): Color {
  if (colorStr.startsWith('#')) {
    return hexToColor(colorStr)
  } else {
    return rgbToColor(colorStr)
  }
}

export function colorToHex(color: Color): string {
  return '#' + [color.r, color.g, color.b].map(x => padZero(x.toString(16))).join('')
}

export function colorToRgb(color: Color): string {
  return `rgb(${color.r}, ${color.g}, ${color.b})`
}

export function adjustBrightness(color: Color, brightness: number): Color {
  return getDefaultColor({
    r: Math.max(0, Math.min(255, Math.floor(color.r + brightness))),
    g: Math.max(0, Math.min(255, Math.floor(color.g + brightness))),
    b: Math.max(0, Math.min(255, Math.floor(color.b + brightness))),
  })
}

export function areColorsSimilar(color1: Color, color2: Color, threshold: number): boolean {
  const distance = Math.sqrt(Math.pow(color1.r - color2.r, 2) + Math.pow(color1.g - color2.g, 2) + Math.pow(color1.b - color2.b, 2))
  return distance <= threshold
}

