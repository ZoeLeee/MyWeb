import React, { useEffect, useState } from "react";
import { Tabs, Spin, Empty } from "antd";
import { IProjectOption } from "../ProjectList";
import { match } from "react-router";
import { IBaseProps } from "../../utils/types";

require("./index.less");

const { TabPane } = Tabs;

interface IProjectProps extends IBaseProps {
  project: IProjectOption;
}

export default function ProjectDetailPanel(props: IProjectProps) {
  const project = props.location.state;

  return (
    <Tabs className="project-detail" defaultActiveKey="1">
      <TabPane tab="项目详情" key="1">
        <div dangerouslySetInnerHTML={{ __html: project.content }}></div>
      </TabPane>
      <TabPane tab="项目展示" key="2">
        {project.showUrl ? (
          <iframe
            src={project.showUrl}
            width="100%"
            height="100%"
            frameBorder={0}
            scrolling="auto"
          ></iframe>
        ) : (
          <Empty />
        )}
      </TabPane>
    </Tabs>
  );
}
