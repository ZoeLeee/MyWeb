import React from 'react';
import { Card } from 'antd';
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

interface IProjectListProps {
    data: IProjectOption[];
    setProjectId: (opt: IProjectOption) => void;
}

export function ProjectList(props: IProjectListProps) {
    const { data } = props;

    const click = (e: React.MouseEvent<HTMLDivElement>, project: IProjectOption) => {
        let el = e.currentTarget as HTMLDivElement;
        let key = el.getAttribute("data-key");
        e.stopPropagation();
        props.setProjectId(project);
    };

    return (
        <div className="project">
            {
                data.map(d =>
                    <Card
                        className="project-item"
                        data-key={d._id}
                        key={d._id}
                        onClick={(e) => click(e, d)}
                    >
                        <img src={d.imgUrl ? ("https://www.dodream.wang" + d.imgUrl) : "http://cdn.dodream.top/projectDefault.jpg?key=joelee"} alt="" />
                        <p>
                            {d.title}
                        </p>
                        <p>
                            {
                                d.description
                            }
                        </p>
                    </Card>)
            }

        </div>
    );
}
