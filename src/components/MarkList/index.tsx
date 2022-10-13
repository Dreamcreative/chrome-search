import { DeleteOutlined } from "@ant-design/icons"
import { Avatar, Input, List, Space, message } from "antd"
import { debounce } from "lodash-es"
import VirtualList from "rc-virtual-list"
import React, { useEffect, useState } from "react"
import type { ChangeEvent, MouseEvent } from "react"

import { flattenTree } from "~src/utils/index"

import "~src/components/search.less"

const icon = require("~assets/icon.png")

export interface MarkListProps {}
const MarkList: React.FC<MarkListProps> = () => {
  const [markDatas, setMarkDatas] = useState([])
  const [bookmarkSearchData, setBookmarkSearchDate] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([])
  const [bookmarksearchValue, setBookmarkSearchValue] = useState("")

  useEffect(() => {
    getAllBookmarks()
  }, [])
  const newTab = (bookmark) => {
    const { url } = bookmark
    chrome.tabs.create({ url: url })
  }
  const deleteBookmark = (bookmark) => {
    const { id } = bookmark
    chrome.bookmarks.remove(id, () => {
      message.success("成功删除书签！")
      getAllBookmarks()
    })
  }
  const filterDatas = (
    data: chrome.bookmarks.BookmarkTreeNode[],
    val
  ): chrome.bookmarks.BookmarkTreeNode[] => {
    const filterData = data.filter((item) => {
      return item.title.indexOf(val) > -1
    })
    return filterData
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const filterBookmark = filterDatas(markDatas, val)
    console.log(val, filterBookmark)
    setBookmarkSearchValue(val)
    setBookmarkSearchDate(filterBookmark)
  }
  const getAllBookmarks = () => {
    chrome.bookmarks.getTree((bookmarks) => {
      let result = []
      for (let bookmark of bookmarks[0].children) {
        result.push(...flattenTree(bookmark.children))
      }
      setMarkDatas(result)
      setBookmarkSearchDate(
        bookmarksearchValue ? filterDatas(result, bookmarksearchValue) : result
      )
    })
  }

  const handleClick = (
    e: MouseEvent<HTMLSpanElement>,
    bookmark: chrome.bookmarks.BookmarkTreeNode
  ) => {
    e.stopPropagation()
    newTab(bookmark)
    window.close()
  }
  const handleClose = (
    e: MouseEvent<HTMLSpanElement>,
    bookmark: chrome.bookmarks.BookmarkTreeNode
  ) => {
    e.stopPropagation()
    deleteBookmark(bookmark)
  }
  const debounceInputChange = debounce(handleInputChange, 200)
  return (
    <div className="list">
      <Input
        allowClear
        placeholder={`搜索书签`}
        onChange={(val) => debounceInputChange(val)}></Input>
      <div className="list-container">
        <List>
          <VirtualList
            data={bookmarkSearchData}
            height={300}
            itemHeight={47}
            itemKey="id">
            {(item: chrome.bookmarks.BookmarkTreeNode) => {
              const { id, title } = item
              return (
                <List.Item key={id} onClick={(e) => handleClick(e, item)}>
                  <List.Item.Meta
                    avatar={<Avatar size={16} src={icon} />}
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
        {bookmarkSearchData.length} 个书签
      </footer>
    </div>
  )
}
export default MarkList
