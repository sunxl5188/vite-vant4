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
  export const copyContent: (_el: string) => void
}
