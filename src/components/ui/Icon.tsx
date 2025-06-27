import React from 'react';
import { IconType } from 'react-icons';
import { cn } from '@/lib/utils'; // Assuming cn utility is in this path

interface IconProps {
  icon: IconType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, size = 'md', className }) => {
  const iconSize = sizeMap[size];
  return <IconComponent size={iconSize} className={cn(className)} />;
};
