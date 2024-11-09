import { SpriteAnimator } from 'react-sprite-animator'

import player_sprite from "../../../assets/_Idle.png";


const Player = ({ active }) => {

    const sprite_image = new Image();
    sprite_image.src = player_sprite

  return (
    <SpriteAnimator 
        sprite={sprite_image}
        width={16}
        height={32}
        scale={0.3}
        shouldAnimate={active}
        direction="horizontal"
        frameCount={4}
        fps={8}
    />
  )
}

export default Player