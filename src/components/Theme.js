// @flow
type Typography = {
    fontFamily: string,
    fontSize: number,
    lineHeight: number
};

type Color = string;

type Theme = {
    palette: {
        black: Color,
        gray: Color,
        lightGray: Color,
        lighterGray: Color,
        white: Color
    },
    typography: {
        body: Typography,
        callout: Typography,
        caption: Typography,
        footnote: Typography,
        headline: Typography,
        subhead: Typography,
        title1: Typography,
        title2: Typography,
        title3: Typography
    },
    spacing: {
        tiny: number,
        small: number,
        base: number,
        large: number,
        xLarge: number
    }
};

const theme: Theme = {
    palette: {
        black: "black",
        gray: "#999999",
        lightGray: "#CCCCCC",
        lighterGray: "#F3F3F3",
        white: "white"
    },
    typography: {
        body: {
            fontSize: 17,
            lineHeight: 17 * 1.618,
            fontFamily: "SFProText-Regular"
        },
        callout: {
            fontSize: 16,
            lineHeight: 16 * 1.618,
            fontFamily: "SFProText-Regular"
        },
        caption: {
            fontSize: 11,
            lineHeight: 11 * 1.618,
            fontFamily: "SFProText-Regular"
        },
        footnote: {
            fontSize: 13,
            lineHeight: 13 * 1.618,
            fontFamily: "SFProText-Regular"
        },
        headline: {
            fontSize: 17,
            lineHeight: 17 * 1.618,
            fontFamily: "SFProText-Semibold"
        },
        subhead: {
            fontSize: 15,
            lineHeight: 15 * 1.618,
            fontFamily: "SFProText-Regular"
        },
        title1: {
            fontSize: 34,
            lineHeight: 34 * 1.618,
            fontFamily: "SFProText-Bold"
        },
        title2: {
            fontSize: 28,
            lineHeight: 28 * 1.618,
            fontFamily: "SFProText-Bold"
        },
        title3: {
            fontSize: 22,
            lineHeight: 22 * 1.618,
            fontFamily: "SFProText-Bold"
        }
    },
    spacing: {
        tiny: 8,
        small: 16,
        base: 24,
        large: 48,
        xLarge: 64
    }
};

export { theme as Theme };
