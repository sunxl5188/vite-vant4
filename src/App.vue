<template>
  <van-config-provider>
    <van-button type="primary" to="/">首页</van-button>
    <van-button type="primary" to="/form">表单示例</van-button>
    <router-view />
  </van-config-provider>
</template>

<script setup lang="ts"></script>
