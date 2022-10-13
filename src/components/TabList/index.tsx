import { DeleteOutlined } from "@ant-design/icons"
import { Avatar, Input, List, Space } from "antd"
import { debounce } from "lodash-es"
import VirtualList from "rc-virtual-list"
import React, { useEffect, useState } from "react"
import type { ChangeEvent, MouseEvent } from "react"

import "~src/components/search.less"

export interface TabListProps {}
const TabList: React.FC<TabListProps> = () => {
  const [tabSearchData, setTabSearchDate] = useState<
    chrome.tabs.Tab[] | undefined
  >([])

  const [tabDatas, setTabDatas] = useState<chrome.tabs.Tab[] | undefined>([])
  const [searchValue, setSearchValue] = useState("")
  useEffect(() => {
    getAllTabs()
  }, [])

  const filterDatas = (data: chrome.tabs.Tab[], val): chrome.tabs.Tab[] => {
    const filterData = data.filter((item) => {
      return item.title.indexOf(val) > -1
    })
    return filterData
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const filterData = filterDatas(tabDatas, val)
    setSearchValue(val)
    setTabSearchDate(filterData)
  }
  const getAllTabs = () => {
    chrome.windows.getAll(
      { populate: true },
      function (windowList: chrome.windows.Window[]) {
        let tabs: chrome.tabs.Tab[] = []
        for (let item of windowList) {
          tabs.push(...item.tabs)
        }
        setTabDatas(tabs)
        setTabSearchDate(searchValue ? filterDatas(tabs, searchValue) : tabs)
      }
    )
  }
  const closeTab = (tab: chrome.tabs.Tab) => {
    chrome.tabs.remove(tab.id, () => {
      getAllTabs()
    })
  }
  // 切换tab
  const switchTab = (tab: chrome.tabs.Tab) => {
    chrome.tabs.highlight({
      tabs: tab.index,
      windowId: tab.windowId
    })
    chrome.windows.update(tab.windowId, { focused: true })
  }
  const handleClick = (
    e: MouseEvent<HTMLSpanElement>,
    tab: chrome.tabs.Tab
  ) => {
    e.stopPropagation()
    switchTab(tab)
    window.close()
  }
  const handleClose = (
    e: MouseEvent<HTMLSpanElement>,
    tab: chrome.tabs.Tab
  ) => {
    e.stopPropagation()
    closeTab(tab)
  }
  const debounceInputChange = debounce(handleInputChange, 200)
  return (
    <div className="list">
      <Input
        allowClear
        placeholder={`搜索打开的页面`}
        onChange={(val) => debounceInputChange(val)}></Input>
      <div className="list-container">
        <List>
          <VirtualList
            data={tabSearchData}
            height={300}
            itemHeight={47}
            itemKey="id">
            {(item: chrome.tabs.Tab) => {
              const { id, favIconUrl, title } = item
              return (
                <List.Item key={id} onClick={(e) => handleClick(e, item)}>
                  <List.Item.Meta
                    avatar={<Avatar size={16} src={favIconUrl} />}
                    title={
                      <div className="ellipsisL1 list-list-item--title">
                        {title}
                      </div>
                    }
                  />
                  <Space>
                    <DeleteOutlined
                      size={16}
                      onClick={(e) => handleClose(e, item)}
                    />
                  </Space>
                </List.Item>
              )
            }}
          </VirtualList>
        </List>
      </div>
      <footer className="list-footer">
        {tabSearchData.length} 个打开的页面
      </footer>
    </div>
  )
}
export default TabList
