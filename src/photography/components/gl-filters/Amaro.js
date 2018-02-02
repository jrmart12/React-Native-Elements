// @flow
import * as React from "react";
import {Shaders, Node} from "gl-react";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";

const shaders = Shaders.create({
    Amaro: {
        frag: `
      precision highp float;
      varying highp vec2 uv;

      uniform sampler2D inputImageTexture;
      uniform sampler2D inputImageTexture2;
      uniform sampler2D inputImageTexture3;
      uniform sampler2D inputImageTexture4;

      void main () {

        vec4 texel = texture2D(inputImageTexture, uv);
        vec3 bbTexel = texture2D(inputImageTexture2, uv).rgb;

        texel.r = texture2D(inputImageTexture3, vec2(bbTexel.r, (1.0-texel.r))).r;
        texel.g = texture2D(inputImageTexture3, vec2(bbTexel.g, (1.0-texel.g))).g;
        texel.b = texture2D(inputImageTexture3, vec2(bbTexel.b, (1.0-texel.b))).b;

        vec4 mapped;
        mapped.r = texture2D(inputImageTexture4, vec2(texel.r, .83333)).r;
        mapped.g = texture2D(inputImageTexture4, vec2(texel.g, .5)).g;
        mapped.b = texture2D(inputImageTexture4, vec2(texel.b, .16666)).b;
        mapped.a = 1.0;

        gl_FragColor = mapped;

      }`
    }
});

export default class Amaro extends React.PureComponent<{ children: React.Node, on: boolean }> {
    render(): React.Node {
        const {on, children: inputImageTexture} = this.props;
        if (!on) {
            return this.props.children;
        }
        return (
            <Node
                shader={shaders.Amaro}
                uniforms={{
                    inputImageTexture,
                    // eslint-disable-next-line global-require
                    inputImageTexture2: resolveAssetSource(require("./images/blackboard1024.png")),
                    // eslint-disable-next-line global-require
                    inputImageTexture3: resolveAssetSource(require("./images/overlayMap.png")),
                    // eslint-disable-next-line global-require
                    inputImageTexture4: resolveAssetSource(require("./images/amaroMap.png"))
                }}
            />
        );
    }
}
