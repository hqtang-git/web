import { IconSemiLogo } from '@douyinfe/semi-icons';
import { IconBadge, IconBreadcrumb, IconTreeSelect } from '@douyinfe/semi-icons-lab';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { useState } from 'react';
import { Outlet, useMatches, useNavigate } from 'react-router-dom';

import * as PathPattern from '@/app/route/path-pattern';


export const NavBar = () => {
  const { Footer, Sider, Content } = Layout;
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const matches = useMatches();
  const selectedKeys = matches.map(match => match.pathname);

  const onOpenChange = (data: any) => {
    setOpenKeys([...data.openKeys]);
  };

  const LeftNav = () => (
    <Nav
      className='h-full max-w-[200px] bg-[#fbfbfb]'
      defaultSelectedKeys={['Home']}
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={[
        {
          itemKey: PathPattern.APPROVAL,
          text: '审批管理',
          icon: <IconBreadcrumb />,
        },
        {
          itemKey: PathPattern.USER,
          text: '用户管理',
          icon: <IconBadge />
        },
        {
          itemKey: PathPattern.DUTY,
          text: '值班管理',
          icon: <IconTreeSelect />,
          items: [
            {
              itemKey: `${PathPattern.DUTY}/current-month`,
              text: '当月排班',
            },
          ]
        },
      ]}
      footer={{
        collapseButton: true,
      }}
      onClick={data => navigate(data.itemKey as string, { replace: true })}
    />
  );

  const FooterContent = () => (
    <>
      <span className='flex items-center'>
        <IconSemiLogo size="large" className="mr-2" />
        <span>版权 © {new Date().getFullYear()} 导航中心. 保留所有权利. </span>
      </span>
      <span>
        <span className='mr-[24px]'>联系作者</span>
        <span>反馈建议</span>
      </span>
    </>
  );

  return (
    <Layout className='h-[98%] w-[98%] absolute overflow-hidden'>
      <Layout className='overflow-hidden'>
        <Sider className='bg-[#fbfbfb] overflow-hidden'>
          <LeftNav />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer className="flex justify-center p-[10px] bg-[#fbfbfb] text-[#999]">
        <FooterContent />
      </Footer>
    </Layout>
  );
};