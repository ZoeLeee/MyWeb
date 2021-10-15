import { Menu } from "antd";
import React from "react";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
} from "@ant-design/icons";

interface IProjectMenu {
  key: string;
  title: string;
  isLeaf: boolean;
  children?: IProjectMenu[];
}

interface Props {
  list: IProjectMenu[];
  defaultSelectedKey?: string;
  defaultOpenKey?: string;
  onSelect: (...arg) => void;
}

const { SubMenu } = Menu;

const ProjectNavList: React.FC<Props> = ({
  list,
  defaultSelectedKey,
  defaultOpenKey,
  onSelect,
}) => {
  return (
    <Menu
      style={{ width: "100%" }}
      defaultSelectedKeys={[defaultSelectedKey]}
      defaultOpenKeys={[defaultOpenKey]}
      mode="inline"
    >
      {list.map((l) => {
        if (l.children?.length === 0)
          return (
            <Menu.Item
              key={l.key}
              icon={<MailOutlined />}
              onClick={() => onSelect(l.key)}
            >
              {l.title}
            </Menu.Item>
          );
        else {
          return (
            <SubMenu key={l.key} icon={<AppstoreOutlined />} title={l.title}>
              {l.children.map((l1) => (
                <Menu.Item onClick={() => onSelect(l1.key)} key={l1.key}>
                  {l1.title}
                </Menu.Item>
              ))}
            </SubMenu>
          );
        }
      })}
    </Menu>
  );
};

export default ProjectNavList;
