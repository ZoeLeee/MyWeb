import React from 'react';
import { Result, Button } from 'antd';
import { RouterProps } from 'react-router';

export default function NoMatch(props: RouterProps) {
    return (
        <Result
            status="404"
            title="404"
            subTitle="页面不存在"
            extra={
                <div>
                    <Button type="primary" style={{ marginRight: 20 }} onClick={() => props.history.push("/")}>主页</Button>
                    <Button type="primary" onClick={() => props.history.goBack()}>返回</Button>
                </div>
            }
        />
    );
}
