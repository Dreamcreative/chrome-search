// 平铺树
export const flattenTree = (target, key = "children") => {
  return target.reduce((total, item) => {
    const cur = item[key] ?? []
    return total.concat(cur.length > 0 ? [...cur, ...flattenTree(cur)] : cur)
  }, [])
}
// 通过 input 值 过滤数据
export const filterDatas = (data = [], input: string, key = "title") => {
  const filterData = data.filter((item) => {
    return item[key]?.toLowerCase().indexOf(input?.toLowerCase()) > -1
  })
  return filterData
}
