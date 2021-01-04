import React from 'react';
import { Tabs, Spin, Empty } from 'antd';
import { IProjectOption } from '../ProjectList';
require('./index.less');

const { TabPane } = Tabs;


export default function ProjectDetailPanel(props: { project: IProjectOption; }) {
    if (!props.project)
        return <Spin />;
    return (
        <Tabs className="project-detail" defaultActiveKey="1">
            <TabPane tab="项目详情" key="1">
                <div dangerouslySetInnerHTML={{ __html: props.project.content }}>

                </div>
            </TabPane>
            <TabPane tab="项目展示" key="2">
                {
                    props.project.showUrl ?
                        <iframe src={props.project.showUrl} width="100%" height="100%" frameBorder={0} scrolling="auto"></iframe> :
                        <Empty />
                }

            </TabPane>
        </Tabs>
    );
}
