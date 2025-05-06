import React, { memo } from 'react';
import { IconType } from 'react-icons';

export interface IconProps {
  icon: IconType;
  size?: number;
  color?: string;
  [key: string]: any;
}

export const Icon: React.FC<IconProps> = memo(({ icon: IconComponent, size = 24, color, ...props }) => {
  return <IconComponent size={size} color={color} {...props} />;
});

// DRWEB-KM2025
