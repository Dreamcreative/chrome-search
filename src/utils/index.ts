// 平铺树
export const flattenTree = (target, key = "children") => {
  return target.reduce((total, item) => {
    const cur = item[key] ?? []
    return total.concat(cur.length > 0 ? [...cur, ...flattenTree(cur)] : cur)
  }, [])
}
