import { Color, UIButton, Text } from '@tuval/forms';
import { FuButton } from '../Fusion/Button/FuButton';


export const ActionButton = (text: string) => (
    FuButton(Text(text).whiteSpace('nowrap'))
        .width(110)
        .height(40)
    /*  UIButton(
         Text(text).whiteSpace('nowrap')
     )
         .cursor('pointer')
         .background({ default: 'rgb(0, 97, 235)', hover: 'rgb(51, 135, 255)' })
         .width(110)
         .minWidth('48px')
         .height(48)
         .padding('0px 1rem')
         .cornerRadius(3)
         .foregroundColor(Color.white)
         .fontWeight('600')
         .lineHeight('44px')
         .transition('all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1) 0s') */
)