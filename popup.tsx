import { AndroidOutlined, AppleOutlined } from "@ant-design/icons"
import { Button, Card, Input, Tabs } from "antd"
import type { TabItem } from "antd/es/tabs"
import { useEffect, useState } from "react"

import Search from "./src/components/Search"

import "./index.less"
import "./popup.less"

// 页面
export const historyKey = "1"
// 书签
export const markKey = "2"
const tabsOptions = [
  {
    label: "页面",
    key: historyKey,
    children: <Search type={historyKey} label="页面" />
  },
  {
    label: "书签",
    key: markKey,
    children: <Search type={markKey} label="书签" />
  }
]

function IndexPopup() {
  return (
    <div className={"popup"}>
      <Card className="popup-card">
        <Tabs defaultActiveKey={historyKey} items={tabsOptions}></Tabs>
      </Card>
    </div>
  )
}

export default IndexPopup
