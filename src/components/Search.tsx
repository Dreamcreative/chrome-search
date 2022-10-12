import { DeleteOutlined } from "@ant-design/icons"
import { Avatar, Input, List, Space } from "antd"
import { debounce } from "lodash-es"
import VirtualList from "rc-virtual-list"
import React, { useEffect, useMemo, useState } from "react"
import type { ChangeEvent, MouseEvent } from "react"

import { historyKey, markKey } from "~popup"

import "./search.less"

export interface SearchProps {
  type: string
  label?: string
}
const Search: React.FC<SearchProps> = (props) => {
  const { type, label = "tab" } = props
  const [data, setData] = useState<chrome.tabs.Tab[] | undefined>([])
  const [searchDate, setSearchDate] = useState<chrome.tabs.Tab[] | undefined>(
    []
  )
  const [searchValue, setSearchValue] = useState("")
  useEffect(() => {
    switch (type) {
      case historyKey:
        getAllTabs()
        break
      case markKey:
        getAllBookmarks()
        break
    }
  }, [type])
  const getAllTabs = () => {
    chrome.windows.getAll(
      { populate: true },
      function (windowList: chrome.windows.Window[]) {
        let tabs: chrome.tabs.Tab[] = []
        for (let item of windowList) {
          tabs.push(...item.tabs)
        }
        setData(tabs)
        setSearchDate(searchValue ? filterDatas(tabs, searchValue) : tabs)
      }
    )
  }
  const getAllBookmarks = () => {
    chrome.bookmarks.getTree((bookmarks) => {
      console.log(
        "🚀 ~ file: Search.tsx ~ line 45 ~ chrome.bookmarks.getTree ~ bookmarks",
        bookmarks
      )
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
  const closeTab = (tab: chrome.tabs.Tab) => {
    chrome.tabs.remove(tab.id, () => {
      getAllTabs()
    })
  }
  const handleClose = (
    e: MouseEvent<HTMLSpanElement>,
    tab: chrome.tabs.Tab
  ) => {
    e.stopPropagation()
    closeTab(tab)
  }
  const handleClick = (
    e: MouseEvent<HTMLSpanElement>,
    tab: chrome.tabs.Tab
  ) => {
    e.stopPropagation()
    switchTab(tab)
    window.close()
  }
  const filterDatas = (data: chrome.tabs.Tab[], val): chrome.tabs.Tab[] => {
    const filterData = data.filter((item) => {
      return item.title.indexOf(val) > -1
    })
    return filterData
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const filterData = filterDatas(data, val)
    setSearchValue(val)
    setSearchDate(filterData)
  }
  const debounceInputChange = debounce(handleInputChange, 200)
  const returnLabel = useMemo(() => {
    let result = ""
    switch (type) {
      case historyKey:
        result = "打开的" + label
        break
      case markKey:
        result = label
        break
      default:
        result = label
        break
    }
    return result
  }, [type, label])
  return (
    <div className="search">
      <Input
        allowClear
        placeholder={`搜索${returnLabel}`}
        onChange={(val) => debounceInputChange(val)}></Input>
      <div className="search-container">
        <List>
          <VirtualList data={data} height={300} itemHeight={47} itemKey="id">
            {(item) => {
              const { id, favIconUrl, title } = item
              return (
                <List.Item key={id} onClick={(e) => handleClick(e, item)}>
                  <List.Item.Meta
                    avatar={<Avatar size={16} src={favIconUrl} />}
                    title={
                      <div className="ellipsisL1 search-list-item--title">
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
      <footer className="search-footer">
        {searchDate.length || 0} 个{returnLabel}
      </footer>
    </div>
  )
}

export default Search
