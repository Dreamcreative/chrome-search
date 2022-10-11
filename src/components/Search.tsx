import { CloseOutlined } from "@ant-design/icons"
import { Avatar, Button, Input, List, Space } from "antd"
import { throttle } from "lodash-es"
import React, { useEffect, useState } from "react"

import "./search.less"

const Search: React.FC = () => {
  const [data, setData] = useState([])
  const [searchDate, setSearchDate] = useState([])
  useEffect(() => {
    chrome.windows.getAll({ populate: true }, function (windowList) {
      let tabs = []
      for (let item of windowList) {
        tabs.push(...item.tabs)
      }
      setData(tabs)
      setSearchDate(tabs)
      console.log("🚀 ~ file: Search.tsx ~ line 15 ~ tabs", tabs)
    })
  }, [])
  const handleClick = (e, item) => {
    console.log("🚀 ~ file: Search.tsx ~ line 22 ~ handleClick ~ item", item)
    // chrome.tabs.remove(item.id, (res) => {
    //   console.log(33333)
    //   console.log(
    //     "🚀 ~ file: Search.tsx ~ line 28 ~ chrome.tabs.remove ~ res",
    //     res
    //   )
    // })
  }
  const handleInputChange = (e) => {
    const val = e.target.value
    const filterData = data.filter((item) => {
      return item.title.indexOf(val) > -1
    })
    setSearchDate(filterData)
  }
  const throttleInputChange = throttle(handleInputChange, 500)
  return (
    <div className="search">
      <Input
        allowClear
        placeholder="搜索打开的Tab"
        onChange={(val) => throttleInputChange(val)}></Input>
      <div className="search-container">
        <List
          dataSource={searchDate}
          renderItem={(item) => {
            const { id, favIconUrl, title } = item
            return (
              <List.Item key={id}>
                <List.Item.Meta
                  avatar={<Avatar size={16} src={favIconUrl} />}
                  title={
                    <div
                      className="ellipsisL1 search-list-item--title"
                      onClick={(e) => handleClick(e, item)}>
                      {title}
                    </div>
                  }
                />
                <Space>
                  <CloseOutlined size={16} />
                </Space>
              </List.Item>
            )
          }}></List>
      </div>
      <footer className="search-footer">
        {searchDate.length || 0} 个打开的Tab
      </footer>
    </div>
  )
}

export default Search
