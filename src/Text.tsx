import React, {FC, HTMLAttributes} from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
    angle: number;
}

export const Text: FC<Props> = ({angle}) => {
    return <text x="50" y="58" textAnchor="middle" cursor="default" fontFamily="sans-serif" fontSize="25"
                 fontWeight="bold" fill="#424242" className="knob-value">{angle.toFixed(0)}</text>;
};
