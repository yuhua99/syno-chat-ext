import {
    Color,
    adjustBrightness,
    colorToRgb,
    toColor
} from "./color"

type CSSProperty = keyof CSSStyleDeclaration

export const bgColor = toColor("#424242")
export const bgColorDark = adjustBrightness(bgColor, -30)
export const bgColorLight = adjustBrightness(bgColor, 30)
export const primaryColor = toColor("#f1beb0")

// TODO: fix sidebar color remap notworking

const colorMap: { [key: string]: Color } = {
    "rgb(255, 255, 255)": bgColor,
    "rgb(245, 249, 250)": bgColorLight,
    "rgb(50, 61, 90)": bgColorDark, // sidebar
    "rgb(87, 96, 120)": bgColor, // sidebar hover
    "rgb(99, 189, 112)": primaryColor,
    "rgb(95, 184, 109)": primaryColor,
}

function replaceColor(color: string): string {
    const mappedColor = colorMap[color]

    return mappedColor ? colorToRgb(mappedColor) : color
}

function isColorProperty(value: string): boolean {
    return (value.startsWith('rgb') || value.startsWith('#'))
}

function replaceColorPropertiesOfRule(rule: CSSStyleRule): void {
    const properties: string[] = ['backgroundColor', 'background', 'color', 'borderColor']
    const style: CSSStyleDeclaration = rule.style
    properties.forEach(property => {
        const value = style[property as CSSProperty]
        if (typeof value === 'string' && isColorProperty(value)) {
            style.setProperty(property, replaceColor(value))
        }
    })
}

function processStyleSheet(styleSheet: CSSStyleSheet): void {
    if (!styleSheet.cssRules) return

    Array.from(styleSheet.cssRules)
        .filter(rule => rule instanceof CSSStyleRule)
        .forEach(rule => replaceColorPropertiesOfRule(rule as CSSStyleRule))
}

export function setBackgroundColor(): void {
    Array.from(document.styleSheets).forEach(processStyleSheet)
}
