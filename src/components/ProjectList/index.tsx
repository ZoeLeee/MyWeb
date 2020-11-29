import React from 'react';
import { Card } from 'antd';
import { RouterProps } from 'react-router';

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
}

interface IProjectListProps {
    data: IProjectOption[];
    setProjectId: Function;
}

export function ProjectList(props: IProjectListProps) {
    const { data } = props;

    const click = (e: React.MouseEvent<HTMLDivElement>) => {
        let el = e.currentTarget as HTMLDivElement;
        let key = el.getAttribute("data-key");
        e.stopPropagation();
        props.setProjectId(key);
    };

    return (
        <div className="project">
            {
                data.map(d =>
                    <Card
                        className="project-item"
                        data-key={d._id}
                        key={d._id}
                        onClick={click}
                    >
                        <img src={d.imgUrl || "http://cdn.dodream.top/projectDefault.jpg?key=joelee"} alt="" />
                        <p>
                            {d.title}
                        </p>
                        <p>
                            简介位
                    </p>
                    </Card>)
            }

        </div>
    );
}
