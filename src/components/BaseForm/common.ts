export const getFieldValue = (type: string, attr: any) => {
  let bindAttr: Record<string, unknown> = {}
  if (type === 'line') {
    bindAttr = {
      'is-link': true,
      rightIcon: 'arrow-right',
      readonly: true,
      placeholder: '请选择',
      rules: []
    }
  } else if (type === 'input-inline') {
    bindAttr = {
      inputAlign: 'left',
      border: false,
      'is-link': false,
      'right-icon': 'arrow-down'
    }
  } else if (type === 'input-top') {
    bindAttr = {
      inputAlign: 'left',
      border: false,
      'is-link': false,
      'right-icon': 'arrow-down',
      placeholder: '请选择',
      rules: []
    }
  } else if (type === 'input-left') {
    bindAttr = {
      inputAlign: 'left',
      border: false,
      'is-link': false,
      'right-icon': 'arrow-down',
      placeholder: '请选择',
      rules: []
    }
  }
  return { ...bindAttr, ...attr }
}
