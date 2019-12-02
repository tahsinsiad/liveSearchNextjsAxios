import React, { useState } from 'react'
import 'antd/dist/antd.css';
import { Button, Icon, Modal } from 'antd'

const OpenSameFormUsingDiffBtn = () => {

    const [btnId, setBtnId] = useState();
    const [visible, setVisible] = useState(false);

    const data =
    {
        name: "Siad",
        id: "27"
    }


    const handleWhichBtnIsClicked = (e) => {
        console.log(e.target.id);
        setBtnId(e.target.id);
        setVisible(true);
        //console.log(e.target.getAttribute('id'));
    }
    const withData = (data) => {
        return (
            <div>
                <p>{data.name}</p>
                <p>{data.id}</p>
            </div>
        )
    }
    const withOutData = () => {
        return (
            <div>
                <p>no data</p>
                <p>no data</p>
            </div>
        )
    }
    const handleOk = () => {
        setVisible(false);
    }
    const handleCancel = () => {
        setVisible(false);
    }
    return (
        <div>
            <Button id="add" onClick={handleWhichBtnIsClicked}>ADD</Button>
            <Button id="edit" onClick={handleWhichBtnIsClicked}><Icon type="edit" /></Button>
            <Modal
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {
                    btnId === "edit" ? withData(data) : withOutData()
                }

            </Modal>
        </div>
    )
}

export default OpenSameFormUsingDiffBtn;
