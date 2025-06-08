import { IconSemiLogo } from '@douyinfe/semi-icons';
import { IconBadge, IconBreadcrumb, IconSteps, IconTreeSelect } from '@douyinfe/semi-icons-lab';
import { Avatar, Dropdown, Layout, Nav } from '@douyinfe/semi-ui';
import { useState } from 'react';
import { Outlet, useMatches, useNavigate } from 'react-router-dom';

import * as PathPattern from '@/app/route/path-pattern';


export const NavBar = () => {
  const { Header, Footer, Sider, Content } = Layout;
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const matches = useMatches();
  const selectedKeys = matches.map(match => match.pathname);

  const onOpenChange = (data: any) => {
    setOpenKeys([...data.openKeys]);
  };

  const TopHeader = () => (
    <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
      <div>
        <Nav
          mode={'horizontal'}
          items={[
            { itemKey: 'user', text: '用户管理', icon: <IconBadge /> },
            { itemKey: 'union', text: '活动管理', icon: <IconTreeSelect /> },
            {
              itemKey: 'approve-management',
              text: '审批管理',
              icon: <IconBreadcrumb />,
              items: [
                '入驻审核',
                {
                  itemKey: 'operation-management',
                  text: '运营管理',
                  items: [
                    '人员管理',
                    '人员变更'
                  ]
                }
              ]
            },
            {
              text: '任务平台',
              icon: <IconSteps />,
              itemKey: 'job',
              items: ['任务管理', '用户任务查询'],
            },
          ]}
          onSelect={key => console.log(key)}
          header={{
            logo: <IconSemiLogo style={{ height: '36px', fontSize: 36 }} />,
            text: '智能排班平台'
          }}
          footer={
            <Dropdown
              position="bottomRight"
              render={
                <Dropdown.Menu>
                  <Dropdown.Item>详情</Dropdown.Item>
                  <Dropdown.Item>退出</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <Avatar size="small" color='light-blue' style={{ margin: 4 }}>洪琼</Avatar>
              {/* <span>唐洪琼</span> */}
            </Dropdown>
          }
        />
      </div>
    </Header>
  );

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
          itemKey: PathPattern.TASK,
          text: '任务平台',
          icon: <IconSteps />,
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
      <TopHeader />
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