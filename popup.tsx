import { AndroidOutlined, AppleOutlined } from "@ant-design/icons"
import { Button, Card, Input, Tabs } from "antd"
import type { TabItem } from "antd/es/tabs"
import { useEffect, useState } from "react"

import Search from "./src/components/Search"

import "./index.less"
import "./popup.less"

const historyKey = 1
const markKey = 2
const tabsOptions = [
  {
    label: "页面",
    key: historyKey,
    children: <Search />
  },
  {
    label: "书签",
    key: markKey,
    children: " <SearchMark />"
  }
]

function IndexPopup() {
  const [data, setData] = useState([])

  return (
    <div className={"popup"}>
      <Card className="popup-card">
        <Tabs defaultActiveKey={historyKey} items={tabsOptions}></Tabs>
      </Card>
    </div>
  )
}

export default IndexPopup
