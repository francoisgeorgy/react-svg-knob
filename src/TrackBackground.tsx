// import React, { FC, HTMLAttributes, ReactChild } from 'react';
import React, { FC } from 'react';

// export interface Props extends HTMLAttributes<HTMLDivElement> {
// children?: ReactChild;
// }

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const TrackBackground: FC = () => {
    return <path d="M 29.999939540051646,84.64098124473975 A 40,40 0 1,1 70.00006045994832,84.64098124473976"
                 stroke="#CFD8DC"
                 strokeWidth="8" fill="transparent" strokeLinecap="butt" className="knob-track-bg"></path>;
};
