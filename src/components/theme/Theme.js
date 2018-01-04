// @flow
import * as React from "react";
import {inject} from "mobx-react/native";

import styleGuide from "./StyleGuide";
import type {Palette, StyleGuide} from "./StyleGuide";

// TODO: Use React.ElementConfig instead when flow bin 0.63 is available
// https://flow.org/en/docs/react/types/#toc-react-elementconfig
type RequiredProps<Props: {}, Comp> = $Diff<Props, $PropertyType<Comp, "defaultProps">>;
type ElementConfig<Props: {}, Comp, InjectedProps> = $Diff<RequiredProps<Props, Comp>, InjectedProps>;

export type ThemeProps = {
    theme: Theme
};

// eslint-disable-next-line flowtype/no-weak-types
export type StyleSheet<StyleNames: string> = { [name: StyleNames]: Object };
export type StylesProps<StyleNames: string> = { styles: StyleSheet<StyleNames> };

export function withTheme<Props: {}, Comp: React.ComponentType<Props>>
(C: Comp): React.ComponentType<ElementConfig<Props, Comp, ThemeProps>>
{
    return inject("theme")(C);
}

export function withStyles<StlNames: string, Props: {}, Comp: React.ComponentType<Props>>
(styles: Theme => StyleSheet<StlNames>, C: Comp): React.ComponentType<ElementConfig<Props, Comp, StylesProps<StlNames>>>
{
    return inject("theme")(({ theme, ...props }) => <C styles={styles(theme)} {...props} />);
}

export type ThemeName = "Music" | "Food" | "Travel" | "Social" | "Photography";
export type ThemeColors = {
    primary: string,
    secondary: string
};

export type Theme = {
    palette: { primary: string, secondary: string } & Palette,
    switchColors: ThemeColors => void
} & StyleGuide;

export const Colors: { [name: ThemeName]: ThemeColors } = {
    Music: {
        primary: "#00A5FF",
        secondary: "#e3f7ff"
    },
    Food: {
        primary: "#73C700",
        secondary: "#effae5"
    },
    Travel: {
        primary: "#FF9300",
        secondary: "#fff4e5"
    },
    Social: {
        primary: "#A237F3",
        secondary: "#f7ebfe"
    },
    Photography: {
        primary: "#FD4176",
        secondary: "#ffebf1"
    }
};

export const createTheme = (): Theme => ({
    palette: {
        primary: "white",
        secondary: "#e6e6e6",
        ...styleGuide.palette
    },
    typography: { ...styleGuide.typography },
    spacing: { ...styleGuide.spacing },
    styles: { ...styleGuide.styles },
    switchColors: function(colors: ThemeColors) {
        this.palette.primary = colors.primary;
        this.palette.secondary = colors.secondary;
    }
});
