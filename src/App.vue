<template>
  <div class="h-full bg-gray-200">
    {{ $t('apple', 1) }}
    <div class="text-base">字体大小</div>
    <div class="fontSize">font字体大小</div>
    <div style="font-size: 16px">font16字体大小</div>
    <!-- <XlPullRefresh>1111</XlPullRefresh> -->
    <!-- <VirtuallyList /> -->
    <!-- <XlUploader />
    <div>{{ value }}</div>
    <van-button type="primary" @click="visible = !visible">
      主要按钮
    </van-button>
    <XlCheckbox v-model="value" isCell> </XlCheckbox>
    <hr />
    <div>{{ value1 }}</div>
    <XlRadio v-model="value1" isCell> </XlRadio> -->
    <!-- <van-cascader
      v-model="cascaderValue"
      title="请选择所在地区"
      :options="options"
      :field-names="{ text: 'label', value: 'value', children: 'children' }"
      @change="onChange"
      @finish="onFinish"
    /> -->
    <hr />
    <!-- <TextOverflowEllipsis :content="content" /> -->
    <div>---------------------</div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { fetch } from '@/utils/request'
// import TextOverflowEllipsis from '@/components/TextOverflowEllipsis.vue'

console.log(import.meta.env)

//import XlPullRefresh from '../packages/pull-refresh/XlPullRefresh.vue'
//import VirtuallyList from '../packages/virtually-list/XlVirtuallyList.vue'
//import { getCurrentInstance, ComponentInternalInstance } from 'vue'

//const { proxy } = getCurrentInstance() as ComponentInternalInstance
//console.log(proxy)
//const currentDate = ref<string[]>()
//const currentTime = ref<string[]>()
/* const visible = ref<boolean>(false)
const value = ref<string[]>(['1', '2'])
const value1 = ref<string>('2') */
/* const handleConfirm = (date: string[]) => {
  value.value = date
} */

// const content = ref(
//   `五百里滇池，奔来眼底，披襟岸帻，喜茫茫空阔无边。看东骧神骏，西翥灵仪，北走蜿蜒，南翔缟素。高人韵士，何妨选胜登临。趁蟹屿螺洲，梳裹就风鬟雾鬓；更苹天苇地，点缀些翠羽丹霞，莫辜负四围香稻，万顷晴`
// )

const cascaderValue = ref('350211')
const defaultValue = ['350000', '350200', '350211']
const defaultLabel = ref<any[]>([])
const onFinish = ({ selectedOptions }: { selectedOptions: any }) => {
  let fieldLabel = selectedOptions.map((option: any) => option.label).join('/')
  let fieldValue = selectedOptions.map((option: any) => option.value).join(',')
  console.log(fieldLabel, fieldValue)
}

const options = ref<any[]>([])

const onChange = async ({
  value,
  selectedOptions,
  tabIndex
}: {
  value: any
  selectedOptions: any[]
  tabIndex: number
}) => {
  if (selectedOptions?.length) {
    if (tabIndex >= 2) return
    const selectedData: any = selectedOptions.filter(o => o.value === value)[0]
    if (!selectedData.children?.length) {
      const { data } = await fetch(`/index/index/getCityList/id/${value}`)
      if (data.length) loopChildren(selectedOptions, value, data)
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loopChildren = (data: any, value: any, list: any) => {
  data.forEach((item: any) => {
    if (item.value === value) {
      item.children = list
    } else if (item.children?.length) loopChildren(item.children, value, list)
  })
}

const getData = (pid: string) => {
  return new Promise((resolve, reject) => {
    fetch(`/index/index/getCityList/id/${pid}`)
      .then(res => {
        resolve(res)
      })
      .catch(err => reject(err))
  })
}

const setChildren = (array: any[], pid: string, data: any[]) => {
  array.forEach((item: any, i: number) => {
    if (item.value === pid) {
      array[i].children = data.length ? data : null
      defaultLabel.value.push(item.label)
    } else if (item.children?.length) {
      setChildren(item.children, pid, data)
    }
  })
}

onMounted(async () => {
  const res: any = await getData('100000')
  options.value = res.data

  for (const element of defaultValue) {
    const res: any = await getData(element)
    setChildren(options.value, element, res.data)
  }
})
</script>

<style lang="less" scoped>
.fontSize {
  font-size: 16px;
}

.container {
  width: 100%; /* 或者具体宽度 */
}
.text-content {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3; /* 显示3行后显示省略号 */
  line-height: 1.2em; /* 根据需要调整 */
  max-height: 3.6em; /* 3行的高度，根据line-height调整 */
}
</style>
