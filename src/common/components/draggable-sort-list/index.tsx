import { IconHandle } from '@douyinfe/semi-icons';
import React from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

interface IMixinComponent {
  [x: string]: any;
  Component: React.FC<any> | React.ComponentClass<any>;
  children: React.ReactNode;
  props?: Record<string, any>;
}

export const DragHandler = SortableHandle(() => <IconHandle style={{ cursor: 'move', color: '#555' }} />);

export const SortItem = SortableElement(({ Component, children, props, ...restProps }: IMixinComponent) => (
  <Component {...restProps} {...props}>
    {children}
  </Component>
));

export const SortList = SortableContainer(
  ({ Component, children, props, ...restProps }: IMixinComponent) => (
    <Component {...restProps} {...props}>
      {children}
    </Component>
  )
);
