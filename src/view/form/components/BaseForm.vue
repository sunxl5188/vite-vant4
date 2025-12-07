<template>
  <BaseForm ref="formRef" :form-item="state.formItem" :rules="state.rules">
    <template #title1>
      <div
        class="text-base font-bold px-4 py-2 bg-gray-100 border-b border-gray-200 mb-3"
      >
        用户信息表单
      </div>
    </template>
    <template #title2>
      <div
        class="text-base font-bold px-4 py-2 bg-gray-100 border-b border-gray-200 mb-3"
      >
        基本信息
      </div>
    </template>
    <template #button>
      <van-button
        type="primary"
        round
        size="large"
        block
        :loading="state.loading"
        @click="state.handleSubmit"
      >
        提交保存
      </van-button>
    </template>
  </BaseForm>
</template>

<script setup lang="ts" name="BaseForm">
import type { FormItemType } from '@/components/BaseForm'
import BaseForm from '@/components/BaseForm'

interface StateType {
  loading: boolean
  formItem: FormItemType[]
  rules: { [key: string]: any }
  handleInSubmit: (_data: any) => void
  handleSubmit: () => void
}

const formRef = ref<InstanceType<typeof BaseForm> | null>(null)

const state = reactive<StateType>({
  loading: false,
  formItem: [
    {
      label: '',
      prop: '',
      value: '',
      fieldType: 'slot',
      slotName: 'title1'
    },
    {
      label: '用户名',
      prop: 'username',
      value: '',
      fieldAttr: {
        placeholder: '请输入用户名'
      }
    },
    {
      label: '密码',
      prop: 'password',
      value: '',
      fieldAttr: {
        placeholder: '请输入密码',
        type: 'password'
      }
    },
    {
      label: '出生日期',
      prop: 'dateBirth',
      value: '',
      fieldType: 'calendar',
      fieldAttr: {
        placeholder: '请选择出生日期'
      },
      attr: {
        title: '选择出生日期'
      }
    },
    {
      label: '户籍地区',
      prop: 'address',
      value: '',
      fieldType: 'area',
      fieldAttr: {
        placeholder: '请选择户籍地区'
      }
    },
    {
      label: '复选框1',
      prop: 'hobby1',
      value: ['reading', 'travel'],
      fieldType: 'checkbox',
      data: {
        options: [
          { text: '看书', value: 'reading' },
          { text: '旅游', value: 'travel' }
        ]
      }
    },
    {
      label: '复选框2',
      prop: 'hobby2',
      value: ['travel', 'photography'],
      fieldType: 'checkboxButton',
      data: {
        options: [
          { text: '看书', value: 'reading' },
          { text: '旅游', value: 'travel' },
          { text: '美食', value: 'food' },
          { text: '音乐', value: 'music' },
          { text: '运动', value: 'sports' },
          { text: '电影', value: 'movie' },
          { text: '摄影', value: 'photography' },
          { text: '绘画', value: 'painting' }
        ]
      }
    },
    {
      label: '性别',
      prop: 'gender',
      value: '2',
      fieldType: 'radio',
      data: {
        options: [
          { text: '男', value: '1' },
          { text: '女', value: '2' }
        ]
      }
    },
    {
      label: '',
      prop: '',
      value: '',
      fieldType: 'slot',
      slotName: 'title2'
    },
    {
      label: '是否已婚',
      prop: 'isMarried',
      value: '1',
      fieldType: 'switch'
    },
    {
      label: '开始结束日期',
      prop: 'dateRange',
      value: ['2025-10-28', '2025-11-28'],
      fieldType: 'dateRange',
      fieldAttr: {
        placeholder: '请选择开始结束日期'
      },
      attr: {
        title: '选择开始日期',
        tabs: ['选择开始日期', '选择结束日期'],
        'next-step-text': '下一步',
        startAttr: {
          'min-date': new Date(2025, 9, 20)
        }
      }
    },
    {
      label: '出发日期时间',
      prop: 'dateTime',
      value: '2026-12-30 16:52:00',
      fieldType: 'dateTime',
      fieldAttr: {
        placeholder: '请选择出发日期时间'
      },
      attr: {
        title: '出发时间',
        tabs: ['选择日期', '选择时间'],
        'next-step-text': '下一步'
      }
    },
    {
      label: '入住日期',
      prop: 'checkInDate',
      value: '2026-11-29',
      fieldType: 'date',
      fieldAttr: {
        placeholder: '请选择入住日期'
      },
      attr: {}
    },
    {
      label: '入住时间',
      prop: 'checkInTime',
      value: '10:30',
      fieldType: 'time',
      fieldAttr: {
        placeholder: '请选择入住时间'
      },
      attr: {}
    },
    {
      label: '时间范围',
      prop: 'appointmentTimeRange',
      value: ['10:00', '12:00'],
      fieldType: 'timeRange',
      fieldAttr: {
        placeholder: '请选择时间范围'
      },
      attr: {}
    },
    {
      label: '证件照片',
      prop: 'idPhoto',
      value: [
        {
          status: 'done',
          message: '上传成功',
          url: 'http://127.0.0.1:81/uploads/20251029/982e915403cde19ddfe023a85fd2c9fe.jpeg'
        }
      ],
      fieldType: 'upload',
      fieldAttr: {
        placeholder: '请上传证件照片'
      }
    },
    {
      label: '备注',
      prop: 'remark',
      value: '',
      fieldAttr: {
        type: 'textarea',
        maxlength: 200,
        rows: 1,
        autosize: { minRows: 1, maxRows: 6 },
        //'show-word-limit': true,
        placeholder: '请输入备注'
      }
    },
    {
      label: '选择器',
      prop: 'picker',
      value: '0593',
      fieldType: 'picker',
      fieldAttr: {
        placeholder: '请选择'
      },
      data: {
        dict: 'week'
      }
    },
    {
      label: '标签选择器',
      prop: 'pickerTag',
      value: ['3', '6'],
      fieldType: 'pickerTag',
      fieldAttr: {
        placeholder: '请选择'
      },
      data: {
        dict: 'hobby'
      },
      attr: { row: 3 }
    }
  ],
  rules: {
    username: [{ required: true, message: '用户名不能为空', trigger: 'onBlur' }]
    /* password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    dateBirth: [
      { required: true, message: '出生日期不能为空', trigger: 'blur' }
    ],
    address: [{ required: true, message: '地区不能为空', trigger: 'blur' }],
    appointmentTimeRange: [
      { required: true, message: '预约时间范围不能为空', trigger: 'change' }
    ],
    pickerTag: [
      { required: true, message: '标签选择器不能为空', trigger: 'change' }
    ] */
  },
  //使用内部按钮提交方法
  handleInSubmit(data) {
    console.log(data)
  },
  //自定按钮提交方法
  async handleSubmit() {
    state.loading = true
    if (formRef.value) {
      const { code, data } = await formRef.value.onSubmit()
      console.log('🚀 ~ data:', code, data)
      setTimeout(() => {
        state.loading = false
      }, 1000)
    }
  }
})
</script>
