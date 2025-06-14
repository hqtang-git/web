import { IllustrationConstruction, IllustrationConstructionDark } from '@douyinfe/semi-illustrations';
import { Empty } from '@douyinfe/semi-ui';


export const EmptyContent = () => {
  return (
    <div className='flex w-full h-full items-center justify-center'>
      <Empty
        image={<IllustrationConstruction style={{ width: 150, height: 150 }} />}
        darkModeImage={<IllustrationConstructionDark style={{ width: 150, height: 150 }} />}
        title={'功能建设中'}
        description="当前功能暂未开放，敬请期待"
      />
    </div>
  )
}