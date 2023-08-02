import Icon, { IconProps } from 'components/Icons/Icon';
import React from 'react';
import { IconSchema } from 'schemas';

import { FALLBACK_ICON } from 'fixtures';

type IconDisplayProps = Partial<IconProps> & {
  icon?: string;
};
export default function IconDisplay({ icon, ...props }: IconDisplayProps) {
  const iconProps = React.useMemo(() => {
    if (!icon) {
      return FALLBACK_ICON;
    }
    try {
      const object = JSON.parse(icon);
      const parsed = IconSchema.parse(object);
      return parsed;
    } catch (error) {
      return FALLBACK_ICON;
    }
  }, [icon]);

  return (
    <Icon {...props} {...iconProps} />
  );
}