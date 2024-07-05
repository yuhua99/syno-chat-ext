function padZero(str: string): string {
    return str.length === 1 ? '0' + str : str;
}

function hexToRgb(hex: string): { r: number, g: number, b: number } {
    if (hex.startsWith('#')) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex.split('').map(x => x + x).join('');
    }
    return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16)
    };
}

function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(x => padZero(x.toString(16))).join('');
}

// Convert RGBA color to hex
function rgbaColorToHex(rgb: string): string {
    return '#' + rgb.match(/\d+/g)!.map(x => parseInt(x).toString(16).padStart(2, '0')).join('');
}

function calculateBrightness(r: number, g: number, b: number): number {
    return (r * 299 + g * 587 + b * 114) / 1000;
}

function calculateSaturation(r: number, g: number, b: number): number {
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    return max - min;
}

function adjustBrightness(r: number, g: number, b: number, brightness: number): { r: number, g: number, b: number } {
    if ([r, g, b, brightness].some(arg => typeof arg !== 'number')) {
        throw new Error('All arguments must be numbers.');
    }
    return {
        r: Math.max(0, Math.min(255, Math.floor(r + brightness))),
        g: Math.max(0, Math.min(255, Math.floor(g + brightness))),
        b: Math.max(0, Math.min(255, Math.floor(b + brightness))),
    };
}

function adjustColor(hex: string): string {
    let { r, g, b } = hexToRgb(hex);
    let brightness = calculateBrightness(r, g, b);
    let saturation = calculateSaturation(r, g, b);
    let percent = saturation < 32 ? 128 : 15;
    let { r: adjustedR, g: adjustedG, b: adjustedB } = adjustBrightness(r, g, b, percent * (brightness < 128 ? 1 : -1));
    return rgbToHex(adjustedR, adjustedG, adjustedB);
}

export function setBackgroundColor(): void {
  // Iterate over all stylesheets
  for (let i = 0; i < document.styleSheets.length; i++) {
    let styleSheet = document.styleSheets[i];
    try {
      // Not all stylesheets have a cssRules property
      if (styleSheet.cssRules) {
        // Iterate over all rules in the stylesheet
        for (let j = 0; j < styleSheet.cssRules.length; j++) {
          let rule = styleSheet.cssRules[j];
          // Check if the rule is a CSSStyleRule and has a backgroundColor property
          if (rule instanceof CSSStyleRule && rule.style.backgroundColor) {
            // Set the backgroundColor to green
            let origColor = rule.style.backgroundColor;
            if (origColor.startsWith('rgb')) {
              rule.style.backgroundColor = adjustColor(rgbaColorToHex(origColor));
            }
          }
        }
      }
    } catch (e) {
      console.error(`Could not access rules for stylesheet at ${styleSheet.href}: ${e}`);
    }
  }
}

