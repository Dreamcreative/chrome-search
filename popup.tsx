import { Card, Tabs } from "antd"

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
        <Tabs
          defaultActiveKey={historyKey}
          items={tabsOptions}
          destroyInactiveTabPane></Tabs>
      </Card>
    </div>
  )
}

export default IndexPopup
