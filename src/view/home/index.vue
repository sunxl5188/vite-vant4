<template>
  <div class="font12">11111</div>
  <div class="text-xs">11111</div>
  {{ formData }}
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <field-calender v-model="formData.date" />
      <field-cascader v-model="formData.area" />
      <div class="pt-4">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-cell-group>
  </van-form>
</template>

<script setup lang="ts" name="HomeIndex">
// import { useUserStore } from '@/store/userStore'
// import dayjs from '@/utils/dayjs'
// import { copyContent } from '@/utils'
import FieldCascader from '@/components/FieldCascader/index.vue'
import FieldCalender from '@/components/FieldCalendar/index.vue'

const formData = ref({
  date: '',
  area: ''
})
const onSubmit = (values: any) => {
  console.log('submit', values)
}
// const store = useUserStore()
// console.log(store.name)
// store.setName('李四')
// console.log(store.getName)

// console.log(dayjs().format('YYYY-MM-DD'))
</script>

<style scoped>
.font12 {
  font-size: 12px;
}
</style>
