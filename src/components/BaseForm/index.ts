import BaseForm from './index.vue'
;(BaseForm as any).install = (Vue: any) => {
  Vue.component((BaseForm as any).extendOptions.name, BaseForm)
}
export default BaseForm

export interface FormItemType {
  /**字段名称 */
  label: string
  /**字段key */
  prop: string
  /**初始值 */
  value: string | string[] | [{ [key: string]: any }]
  /**
   * @字段类型
   * 不填则默认文本输入框
   * calendar 日历选择框
   * area 省市区级联选择框
   * switch 开关
   * radio 单选框
   * checkbox 多选框
   * checkboxButton 多选按钮框
   * dateRange 日期范围选择框
   * dateTime 日期时间选择框
   * date 日期选择框
   * time 时间选择框
   * timeRange 时间范围选择框
   * pickerTag 标签多选框
   * code 验证码输入框
   * slot 插槽
   */
  fieldType?: string
  /** 字段属性*/
  fieldAttr?: {
    [key: string]: any
  }
  /**弹出层关联组件属性 */
  attr?: { [key: string]: any }
  /**插槽名称 */
  slotName?: string
  /**数据与字典 */
  data?: {
    /** 选项数据 */
    options?: Array<{ [key: string]: string }>
    /** 字典标识 */
    dict?: string
    /** 不是字典时~接口地址 */
    api?: string
    /** 接口参数 */
    params?: { [key: string]: any }
    /** 文字与值的字段名 */
    fieldNames?: { text?: string; value?: string; children?: string }
  }
}
