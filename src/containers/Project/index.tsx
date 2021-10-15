import { Layout, Tree } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { ProjectApi } from "../../utils/Host";
import { iFetch, RequestStatus } from "../../utils/Request";
import {
  ProjectList,
  IProjectOption,
} from "./../../components/ProjectList/index";
import { Spin } from "antd";
import ProjectDetailPanel from "./../../components/projectDetail/index";
import { Route, RouterProps, Switch } from "react-router";
import { DownOutlined } from "@ant-design/icons";
import ProjectNavList from "../../components/ProjectNavList";
require("./index.less");

const { Content, Sider } = Layout;

interface IProjectMenu {
  key: string;
  title: string;
  isLeaf: boolean;
  children?: IProjectMenu[];
}

interface ICategorys {
  parent: string;
  id: string;
  title: string;
  children: ICategorys[];
}
let firstKey: string;

export function ProjectComponent(props: RouterProps) {
  const [list, setList] = useState<IProjectMenu[]>([]);
  const [projectList, setProjectList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingProject, setLoadingProject] = useState(false);
  const [project, setProject] = useState<IProjectOption>(null);

  const updateNodes = (categorys: ICategorys[], isLeaf = false) => {
    let nodes: IProjectMenu[] = [];
    for (let cg of categorys) {
      nodes.push({
        key: cg.id,
        title: cg.title,
        isLeaf,
        children: updateNodes(cg.children, true),
      });
    }
    return nodes;
  };

  const getData = async () => {
    setLoading(true);
    let data = await iFetch(ProjectApi.CategoryList);
    if (data.code === RequestStatus.Ok) {
      let categorys = data.data;
      let list = updateNodes(categorys);
      firstKey = getFirstKey(list);
      if (firstKey) getProject(firstKey);
      setList(list);
    }
    setLoading(false);
  };

  const getProject = async (category: string) => {
    setLoadingProject(true);
    let res = await iFetch(
      ProjectApi.GetProjectList + `?categoryId=${category}`
    );
    if (res.code === RequestStatus.Ok) {
      setProjectList(res.data);
    }
    setLoadingProject(false);
  };
  const onSelect = (key: string) => {
    setProject(null);
    getProject(key);
  };

  function getFirstKey(list: IProjectMenu[]) {
    if (list[0]?.children?.length > 0) {
      return getFirstKey(list[0].children);
    } else {
      return list[0]?.key;
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Spin />;
  }

  return (
    <Layout style={{ flexDirection: "row" }}>
      <Sider width={250} className="site-layout-background" theme="light">
        <ProjectNavList
          list={list}
          defaultOpenKey={list[0]?.key ?? ""}
          defaultSelectedKey={firstKey}
          onSelect={onSelect}
        />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route
              exact
              path="/project"
              component={(rest) => (
                <ProjectList {...rest} setProjectId={setProject} data={projectList} />
              )}
            />
            <Route
              exact
              path="/project/detail"
              component={(rest) => <ProjectDetailPanel {...rest} project={project} />}
            />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}
