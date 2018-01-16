// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {observable, action} from "mobx";
import {inject} from "mobx-react/native";
import {Audio} from "expo";

import type {PlaybackStatus} from "expo/src/av/AV";

export default class Player {

    sound: Audio.Sound;

    @observable playing = false;
    @observable seconds = 0;

    async play(uri: string): Promise<void> {
        if (this.sound) {
            await this.sound.unloadAsync();
        }
        const {sound} = await Audio.Sound.create({ uri }, { shouldPlay: true }, this.onPlaybackStatusUpdate, false);
        this.sound = sound;
    }

    async toggle(): Promise<void> {
        if (this.playing) {
            await this.sound.pauseAsync();
            this.playing = false;
        } else {
            await this.sound.playAsync();
            this.playing = true;
        }
    }

    @autobind @action
    onPlaybackStatusUpdate(status: PlaybackStatus) {
        if (status.isLoaded) {
            this.seconds = Math.floor(status.positionMillis / 1000);
        }
    }
}

export type PlayerProps = {
    player: Player
};

export function withPlayer<Props: {}, Comp: React.ComponentType<Props>>
(C: Comp): React.ComponentType<$Diff<React.ElementConfig<Comp>, PlayerProps>>
{
    return inject("player")(C);
}
