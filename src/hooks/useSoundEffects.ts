import { useCallback, useEffect, useState } from "react";
import useSound from "use-sound";

interface UseSoundEffectReturnTypes {
  play: () => void;
  stop: () => void;
  fadeOut: () => void;
  isSoundLoaded: boolean;
}

type Sprite = Record<
  string,
  [
    number /* start time of audio in milliseconds */,
    number /* duration of audio in milliseconds */
  ]
>;

interface UseSoundEffectOptionsTypes {
  sprite?: Sprite;
  id?: string;
  loop?: boolean;
  volume?: number;
  onload?: () => void;
  fadeOutTimer?: number;
}

/*
//  Sprite Map for /public/sounds/audiosprite.mp3
*/
export const spriteMap: Sprite = {
  ball_transition_whoosh: [0, 1152.0181405895692],
  clapping: [3000, 6984.013605442177],
  done_spinning: [11000, 2568.0045351473914],
  introducing_avatar: [15000, 7295.986394557822],
  lets_play: [24000, 455.9863945578222],
  pop_sound: [26000, 384.01360544217766],
  select_ui: [28000, 1152.0181405895685],
  wheel_spinning: [31000, 4320],
  whoosh: [37000, 1152.0181405895685],
};

export const useSoundEffect = (
  audioFile: string,
  options: UseSoundEffectOptionsTypes
): UseSoundEffectReturnTypes => {
  const { fadeOutTimer, ...useSoundOptions } = options;
  const [isSoundLoaded, setIsSoundLoaded] = useState(false);

  /*
   *	Do not use an audio sprite if you want use stop() method;
   *	use-sound's stop method currently does not work for sprites.
   */
  const [playSound, { sound, stop }] = useSound(audioFile, {
    ...useSoundOptions,
    onload: () => setIsSoundLoaded(true),
  });

  const isSoundEnabled = true;

  useEffect(() => {
    const onVisbilityChange = (): void => {
      if (!sound) return;
      if (document.visibilityState === "visible") {
        sound.mute(!isSoundEnabled);
      } else {
        sound.mute(true);
      }
    };

    document.addEventListener("visibilitychange", onVisbilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisbilityChange);
    };
  }, [isSoundEnabled, sound]);

  useEffect(() => {
    if (sound) sound.mute(!isSoundEnabled);
  }, [sound, isSoundEnabled]);

  const play = useCallback((): void => {
    if (sound)
      if (useSoundOptions.id) playSound({ id: useSoundOptions.id });
      else playSound();
    //	Refer: https://github.com/only-much-louder/tracerbullet/pull/103#issue-1388746143
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useSoundOptions.id, playSound]);

  const fadeOut = useCallback((): void => {
    sound?.on("fade", (): void => {
      sound.stop();
      //	ensures volume is reset to 1 after the fade out
      sound.volume(1);
    });
    sound?.fade(useSoundOptions.volume ?? 1, 0, fadeOutTimer ?? 3000);
    //	Refer: https://github.com/only-much-louder/tracerbullet/pull/103#issue-1388746143
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useSoundOptions.volume, sound]);

  return { play, stop, fadeOut, isSoundLoaded };
};

export const useActivitiesBGMSound = (): void => {
  const {
    play: playActivitiesBgmSound,
    fadeOut: fadeOutActivitiesBgmSound,
    isSoundLoaded: isActivitiesBgmSoundLoaded,
  } = useSoundEffect("./sounds/activities_bgm.mp3", {
    loop: true,
    fadeOutTimer: 700,
  });

  useEffect(() => {
    if (isActivitiesBgmSoundLoaded) playActivitiesBgmSound();
    return () => fadeOutActivitiesBgmSound();
    //	Refer: https://github.com/only-much-louder/tracerbullet/pull/103#issue-1388746143
    //	eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActivitiesBgmSoundLoaded]);
};
