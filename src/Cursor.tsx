// import React, { FC, HTMLAttributes, ReactChild } from 'react';
import React, { FC } from 'react';

// export interface Props extends HTMLAttributes<HTMLDivElement> {
// children?: ReactChild;
// }

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Cursor: FC = () => {
    return <path d="M 42.284613710256096,33.73737984210319 L 37.9982879937317,24.702590865493846" stroke="#42A5F5"
                 strokeWidth="4" fill="transparent" strokeLinecap="butt" className="knob-cursor"></path>;
};
