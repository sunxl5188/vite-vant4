declare module '@/utils' {
  /**
   * @系统字典接口
   */
  export const dictApi: string
  /**
   * @系统上传接口
   */
  export const uploadApi: string
  /**
   * @系统删除文件接口
   */
  export const deleteFileApi: string
  /**
   * @复制文本
   */
  export const copyContent: (el: string) => void
  /**
   * @查找字典名称
   * @param dictType 字典类型
   * @param value 字典对应的值
   * @returns 返回名称
   * @调用示例getDictFilter('area', '0592')
   */
  export const getDictFilter: (dictType: string, value: string) => string
}
