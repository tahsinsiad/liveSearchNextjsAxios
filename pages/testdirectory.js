import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { List, Icon, Input } from 'antd';
import axios from 'axios';

function TestDirectory() {

    const [listData, setListData] = useState();
    const [searchInput, setSearchInput] = useState();

    const onChange = (e) => {
        console.log(e.target.value);
        //search(e.target.value);
        setSearchInput(e.target.value)
    }
    useEffect(() => {
        if (!searchInput) {
            axios.get(`http://5dc8c923672b6e001426b6c5.mockapi.io/demo/v1/commiteeMemberList?page=1&limit=10`)
                .then(res => {
                    console.log(res.data);
                    setListData(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            axios.get(`http://5dc8c923672b6e001426b6c5.mockapi.io/demo/v1/commiteeMemberList?search=${searchInput}&page=1&limit=10`)
                .then(res => {
                    console.log(res.data);
                    setListData(res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [searchInput ? searchInput : ""]);

    // useEffect(() => {

    // }, [searchInput]);
    // const search = (searchInput) => {
    //     axios.get(`http://5dc8c923672b6e001426b6c5.mockapi.io/demo/v1/commiteeMemberList?search=${searchInput}`)
    //         .then(res => {
    //             console.log(res.data);
    //             setListData(res.data)
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // };

    const IconText = ({ type, text }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
        </span>
    );
    return (
        <div>
            <Input onChange={onChange} placeholder="search...." />
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={listData}
                footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                }
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                            <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                            <IconText type="message" text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />
                        }
                    >
                        {item.name}
                    </List.Item>
                )}
            />
        </div>
    )
}

export default TestDirectory;
