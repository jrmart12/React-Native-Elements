// @flow
import * as React from "react";
import {Svg, FileSystem} from "expo";
import {observable, runInAction} from "mobx";
import {observer} from "mobx-react/native";
import SHA1 from "crypto-js/sha1";

import type {StyleProps} from "../../components/theme";

const {Defs, Image, ClipPath, Path, Circle} = Svg;

type AvatarProps = StyleProps & {
    size: number,
    uri: string,
    stacked: boolean
};

@observer
export default class Avatar extends React.Component<AvatarProps> {

    static defaultProps = {
        size: 36,
        stacked: false
    };

    @observable uri: string = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    async componentWillMount(): Promise<void> {
        const {uri} = this.props;
        const ext = uri.substring(uri.lastIndexOf("."), uri.indexOf("?") === -1 ? undefined : uri.indexOf("?"));
        const path = FileSystem.cacheDirectory + SHA1(uri) + ext;
        const info = await FileSystem.getInfoAsync(path);
        if (!info.exists) {
            await FileSystem.downloadAsync(uri, path);
        }
        runInAction(() => this.uri = path);
    }

    render(): React.Node {
        const {uri} = this;
        const {stacked, size, style} = this.props;
        const width = stacked ? 27 : size;
        const height = size;
        const viewBox = `0 0 ${width} ${height}`;
        const clipPath = stacked ? "url(#crescent)" : "url(#circle)";
        return (
            <Svg style={[{ alignSelf: "center" }, style]} {...{width, height, viewBox }}>
                <Defs>
                    <ClipPath id="crescent">
                        <Path
                            // eslint-disable-next-line max-len
                            d="M0.897764484,34.07775 C5.81365469,30.4339111 9,24.5890609 9,18 C9,11.4109391 5.81365469,5.56608893 0.897764484,1.92225003 C3.33298752,0.6926267 6.08560794,5.35365135e-16 9,0 C18.9411255,-1.82615513e-15 27,8.0588745 27,18 C27,27.9411255 18.9411255,36 9,36 C6.08560794,36 3.33298752,35.3073733 0.897766964,34.0777481 Z"
                        />
                    </ClipPath>
                    <ClipPath id="circle">
                        <Circle r={size/2} cx={size/2} cy={size/2} />
                    </ClipPath>
                </Defs>
                <Image
                    x={0}
                    y={0}
                    href={{ uri }}
                    preserveAspectRatio="xMidYMid slice"
                    {...{width: size, height: size, clipPath}}
                />
            </Svg>
        );
    }
}