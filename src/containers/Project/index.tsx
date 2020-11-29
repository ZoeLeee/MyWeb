import { Layout, Tree } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ProjectApi } from '../../utils/Host';
import { iFetch, RequestStatus } from '../../utils/Request';
import { ProjectList } from './../../components/ProjectList/index';
import './index.less';
import { Spin } from 'antd';
import ProjectDetailPanel from './../../components/projectDetail/index';
import { RouterProps } from 'react-router';
import { ProjectOutlined, FolderOutlined, DownOutlined } from '@ant-design/icons';

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
  const [currentProjectId, setCurrentProjectId] = useState("");
  const [selectKey, setSelectKey] = useState("");

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
      console.log('list: ', list);
      firstKey = getFirstKey(list);
      if (firstKey)
        getProject(firstKey);
      setList(list);
    }
    setLoading(false);
  };

  const getProject = async (category: string) => {
    setLoadingProject(true);
    let res = await iFetch(ProjectApi.GetProjectList + `?categoryId=${category}`);
    if (res.code === RequestStatus.Ok) {
      setProjectList(res.data);
    }
    setLoadingProject(false);
  };
  const onSelect = (keys, event) => {
    setCurrentProjectId("");
    getProject(event.node.key);
  };
  const clickMunu = (param: ClickParam) => {
    setCurrentProjectId("");
    getProject(param.key);
  };

  function getFirstKey(list: IProjectMenu[]) {
    if (list[0]?.children?.length > 0) {
      return getFirstKey(list[0].children);
    }
    else {
      return list[0]?.key;
    }
  }


  const onExpand = () => {

  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <Spin />;
  }

  return (

    <Layout style={{ flexDirection: "row" }}>
      <Sider width={200} className="site-layout-background" theme="light">
        <Tree
          defaultSelectedKeys={[firstKey]}
          defaultExpandedKeys={[list[0]?.key ?? ""]}
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={list}
          // icon={<ProjectOutlined />}
          switcherIcon={<DownOutlined />}
        />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {
            loadingProject ? <Spin /> : (
              currentProjectId ? <ProjectDetailPanel id={currentProjectId} /> : <ProjectList setProjectId={setCurrentProjectId} data={projectList} />
            )
          }
        </Content>
      </Layout>
    </Layout>
  );
}

const Test = () => <div>ThreeJS</div>;