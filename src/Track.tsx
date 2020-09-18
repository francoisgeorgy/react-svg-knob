// import React, { FC, HTMLAttributes, ReactChild } from 'react';
import React, { FC } from 'react';

// export interface Props extends HTMLAttributes<HTMLDivElement> {
// children?: ReactChild;
// }

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Track: FC = () => {
    return <path d="M 29.999939540051646,84.64098124473975 A 40,40 0 0,1 21.377244431841547,22.058313156048467"
                 stroke="#42A5F5" strokeWidth="8" fill="transparent" strokeLinecap="butt"
                 className="knob-track"></path>;
};
