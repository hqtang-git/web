import { Nav } from '@douyinfe/semi-ui';
import { NavItems } from '@douyinfe/semi-ui/lib/es/navigation';
import { useState } from 'react';
import { useMatches, useNavigate } from 'react-router-dom';


interface Props {
  items: NavItems;
}

export const AsideNavigation = ({ items }: Props) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const onOpenChange = (data: any) => {
    setOpenKeys([...data.openKeys]);
  };

  const matches = useMatches();
  const selectedKeys = matches.map(match => match.pathname);

  const navigate = useNavigate();

  return (
    <Nav
      mode='horizontal'
      className="w-[100vw] bg-[#fbfbfb]"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      items={items}

      onClick={data => navigate(data.itemKey as string, { replace: true })}
      // defaultIsCollapsed={defaultIsCollapsed}
      footer={{ collapseButton: true }}
      onOpenChange={onOpenChange}
    />
  );
};
