// @flow
import * as React from "react";
import {inject} from "mobx-react/native";

type Typography = {
    fontFamily: string,
    fontSize: number,
    lineHeight: number
};

type Color = string;

export type Typographies = {
    body: Typography,
    callout: Typography,
    caption: Typography,
    footnote: Typography,
    headline: Typography,
    subhead: Typography,
    title1: Typography,
    title2: Typography,
    title3: Typography
};

type Spacing = {
    tiny: number,
    small: number,
    base: number,
    large: number,
    xLarge: number
};

type Palette = {
    black: Color,
    gray: Color,
    lightGray: Color,
    lighterGray: Color,
    white: Color
};

type Constants = {
    barHeight: number,
    iconSize: number,
    defaultShadow: {
        shadowColor: string,
        shadowOffset: { width: number, height: number },
        shadowOpacity: number,
        shadowRadius: number
    }
};

type StyleGuide = {
    palette: Palette,
    typography: Typographies,
    spacing: Spacing,
    constants: Constants
};

export type Theme = {
    palette: { primary: Color } & Palette,
    typography: Typographies,
    spacing: Spacing,
    constants: Constants
};

// TODO: Use React.ElementConfig instead when flow bin 0.62 is available
// https://flow.org/en/docs/react/types/#toc-react-elementconfig
type RequiredProps<Props: {}, Comp> = $Diff<Props, $PropertyType<Comp, "defaultProps">>;
type ElementConfig<Props: {}, Comp, InjectedProps> = $Diff<RequiredProps<Props, Comp>, InjectedProps>;

export type ThemeProps = {
    theme: Theme
};

// eslint-disable-next-line flowtype/no-weak-types
export type Styles<StyleNames: string> = { [name: StyleNames]: Object };
export type StyleProps<StyleNames: string> = { styles: Styles<StyleNames> };

export function withTheme<Props: {}, Comp: React.ComponentType<Props>>
(C: Comp): React.ComponentType<ElementConfig<Props, Comp, ThemeProps>>
{
    return inject("theme")(C);
}

export function withStyles<StyleNames: string, Props: {}, Comp: React.ComponentType<Props>>
(styles: Theme => Styles<StyleNames>, C: Comp): React.ComponentType<ElementConfig<Props, Comp, StyleProps<StyleNames>>>
{
    return inject("theme")(({ theme, ...props }) => <C styles={styles(theme)} {...props} />);
}

const styleGuide: StyleGuide = {
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
            lineHeight: 17,
            fontFamily: "SFProText-Semibold"
        },
        subhead: {
            fontSize: 15,
            lineHeight: 15 * 1.618,
            fontFamily: "SFProText-Regular"
        },
        title1: {
            fontSize: 34,
            lineHeight: 41,
            fontFamily: "SFProText-Bold"
        },
        title2: {
            fontSize: 28,
            lineHeight: 34,
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
    },
    constants: {
        barHeight: 45,
        iconSize: 28,
        defaultShadow: {
            shadowColor: "black",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.18,
            shadowRadius: 2
        }
    }
};

export {styleGuide as StyleGuide};

export const primaryColors = {
    music: "#00A5FF",
    food: "#73C700",
    travel: "#FF9300",
    social: "#A237F3",
    photography: "#FD4176"
};

export const createTheme = (primary: $Values<typeof primaryColors>): Theme => ({
    palette: {
        primary,
        ...styleGuide.palette
    },
    typography: { ...styleGuide.typography },
    spacing: { ...styleGuide.spacing },
    constants: { ...styleGuide.constants }
});
