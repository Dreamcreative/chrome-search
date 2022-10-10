import { Button } from "antd"
import { useState } from "react"

import "./index.less"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: 16
      }}>
      <h2>Welcome to your Extension!</h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <Button type="primary">点击</Button>
    </div>
  )
}

export default IndexPopup
