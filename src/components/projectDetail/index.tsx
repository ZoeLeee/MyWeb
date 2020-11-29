import React from 'react';
import { Tabs } from 'antd';
import './index.less';

const { TabPane } = Tabs;


function callback(key) {
    console.log(key);
}

export default function ProjectDetailPanel(props: { id: string; }) {
    return (
        <Tabs className="project-detail" defaultActiveKey="1" onChange={callback} >
            <TabPane tab="项目详情" key="1">
                Content of Tab Pane 1
            </TabPane>
            <TabPane tab="项目展示" key="2">
                <iframe src="https://www.dodream.wang/project/village/dist/" width="100%" height="100%" frameBorder={0} scrolling="auto"></iframe>
            </TabPane>
        </Tabs>
    );
}
