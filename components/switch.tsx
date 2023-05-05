import React from 'react';
import { MotiAnimationProp, MotiTransitionProp, MotiView } from 'moti';
import { View, Pressable } from 'react-native';
import {Easing} from 'react-native-reanimated';

const _trackColors = {
  true: '#9777F4',
  false: '#D9D9D9',
};


type SwitchProps = {
  size: number;
  onPress: () => void;
  isActive: boolean;
};

const transition : MotiTransitionProp = {
  type: 'timing',
  duration: 300,
  easing : Easing.inOut(Easing.ease),
};

const Switch: React.FC<SwitchProps> = ({ size, onPress, isActive }) => {


  const trackWidth = React.useMemo(() => {
    return size * 1;
  }, [size]);

  const trackHeight = React.useMemo(() => {
    return size * 0.2;
  }, [size]);

  const knobSize = React.useMemo(() => {
    return size * 0.6;
  }, [size]);

  return (
    <Pressable onPress={onPress}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <MotiView
          transition={transition}
          from={{
            backgroundColor: isActive ? _trackColors.false : _trackColors.true,
          }}
          animate={{
            backgroundColor: isActive ? _trackColors.true : _trackColors.false,
          }}
          style={{
            position: 'absolute',
            width: trackWidth,
            height: trackHeight,
            borderRadius: trackHeight,
            backgroundColor: isActive ? _trackColors.true : _trackColors.false,
          }}
        />
        <MotiView
          transition={transition}
          from={{
            translateX: isActive ? size  - knobSize : size / 3 - knobSize,
          }}
          style={{
            width: size/2,
            height: size/2,
            borderRadius: size / 2,
            backgroundColor: "#9747FF" ,
            alignItems: 'center',
            justifyContent: 'center',

          }}
        >
          {/* Add some content here, such as an icon or text */}

        </MotiView>
      </View>
    </Pressable>
  );
};

export default Switch;


