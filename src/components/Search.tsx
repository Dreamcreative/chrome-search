import React from "react"

import { historyKey, markKey } from "~popup"
import MarkList from "~src/components/MarkList"
import TabList from "~src/components/TabList"

import "./search.less"

export interface SearchProps {
  type: string
  label?: string
}
const Search: React.FC<SearchProps> = (props) => {
  const { type, label = "tab" } = props
  return (
    <div className="search">
      {type === historyKey && <TabList />}
      {type === markKey && <MarkList />}
    </div>
  )
}

export default Search
