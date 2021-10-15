import React from "react";
import { Card } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { IBaseProps } from "../../utils/types";
require("./index.less");

export interface IProjectOption {
  _id: string;
  title: string;
  content: string;
  categoryId: string;
  scanCount: number;
  create_time: number;
  update_time: number;
  imgUrl: string;
  github: string;
  gitee: string;
  showUrl: string;
  description: string;
}

interface IProjectListProps extends IBaseProps {
  data: IProjectOption[];
  setProjectId: (opt: IProjectOption) => void;
}

const { Meta } = Card;

export function ProjectList(props: IProjectListProps) {
  const { data } = props;

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement>,
    project: IProjectOption
  ) => {
    let el = e.currentTarget as HTMLDivElement;
    let key = el.getAttribute("data-key");
    e.stopPropagation();
    // props.setProjectId(project);
    props.history.push("/project/detail",project)
  };

  return (
    <div className="project">
      {data.map((d) => (
        <Card
          className="project-item"
          data-key={d._id}
          key={d._id}
          onClick={(e) => handleClick(e, d)}
          cover={
            <img
              alt=""
              style={{width:"100%"}}
              src={
                d.imgUrl
                  ? "https://www.dodream.wang" + d.imgUrl
                  : "http://cdn.dodream.top/projectDefault.jpg?key=joelee"
              }
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta title={d.title} description={d.description} />
        </Card>
      ))}
    </div>
  );
}
