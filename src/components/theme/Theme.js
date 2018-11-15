// @flow
import * as React from "react";

import styleGuide from "./StyleGuide";
import type {Palette, StyleGuide} from "./StyleGuide";

type ElementConfig<Comp, InjectedProps> = $Diff<React.ElementConfig<Comp>, InjectedProps>;

export type ThemeProps = {
    theme: Theme
};

export type StyleSheet<StyleNames: string> = { [name: StyleNames]: mixed };
export type StylesProps<StyleNames: string> = { styles: StyleSheet<StyleNames> };

export type ThemeName = "Music" | "Food" | "Travel" | "Social" | "Photography";
export type ThemeColors = {
    primary: string,
    secondary: string
};

export type Theme = {
    palette: { primary: string, secondary: string } & Palette
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


// $FlowFixMe
const ThemeContext = React.createContext();

type ThemeProviderProps = {
  children: React.Node
};

type ThemeProviderState = {
  theme: Theme
};

export default class ThemeProvider extends React.Component<ThemeProviderProps, ThemeProviderState> {

    static instance: ThemeProvider | null = null;

    state = {
        theme: {
            palette: {
                primary: "#00A5FF",
                secondary: "#e3f7ff",
                ...styleGuide.palette
            },
            typography: { ...styleGuide.typography },
            spacing: { ...styleGuide.spacing },
            styles: { ...styleGuide.styles }
        }
    };

    static getInstance(): ThemeProvider {
        if (!ThemeProvider.instance) {
            throw new Error("ThemeProvider is not mounted yet.");
        }
        return ThemeProvider.instance;
    }

    componentDidMount() {
        if (ThemeProvider.instance !== null) {
            throw new Error("Only one ThemeProvider is allowed to be used.");
        }
        ThemeProvider.instance = this;
    }

    switchColors(colors: ThemeColors) {
        const {palette, typography, spacing, styles} = this.state.theme;
        palette.primary = colors.primary;
        palette.secondary = colors.secondary;
        this.setState({ theme: { palette, typography, spacing, styles } });
    }

    render(): React.Node {
        const {children} = this.props;
        const {theme} = this.state;
        return (
            <ThemeContext.Provider value={theme}>
                {children}
            </ThemeContext.Provider>
        );
    }
}

// eslint-disable-next-line max-len
export function withTheme<Props: {}, Comp: React.ComponentType<Props>>(C: Comp): React.ComponentType<ElementConfig<Comp, ThemeProps>> {
    // eslint-disable-next-line react/no-multi-comp
    return class extends React.PureComponent<Props> {
        render(): React.Node {
            const {props} = this;
            return (
                <ThemeContext.Consumer>
                    {theme => <C {...{ theme }} {...props} />}
                </ThemeContext.Consumer>
            );
        }
    };
}

// eslint-disable-next-line max-len
export function withStyles<StlNames: string, Props: {}, Comp: React.ComponentType<Props>>(styles: Theme => StyleSheet<StlNames>, C: Comp): React.ComponentType<ElementConfig<Comp, StylesProps<StlNames>>> {
    // eslint-disable-next-line react/no-multi-comp
    return class extends React.PureComponent<Props> {
        render(): React.Node {
            const {props} = this;
            return (
                <ThemeContext.Consumer>
                    {theme => <C styles={styles(theme)} {...props} />}
                </ThemeContext.Consumer>
            );
        }
    };
}
