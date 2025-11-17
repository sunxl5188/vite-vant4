<template>
  <van-config-provider>
    <div class="fixed left-0 top-0 right-0 z-20">
      <van-space class="text-blue-500">
        <router-link to="/">首页</router-link>
        <router-link type="primary" to="/form">表单示例</router-link>
      </van-space>
    </div>
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts"></script>
