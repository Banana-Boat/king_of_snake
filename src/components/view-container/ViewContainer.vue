<template>
  <div class="container">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.container {
  display: flex;
  justify-content: center;

  margin: 20px 0;
  width: 100%;
  height: calc(100vh - 100px);
}
.content {
  display: flex;
  position: relative;
  width: 70%;
  overflow-y: auto;
  padding: 30px;

  background-color: #1a1b28;
  border: 0;
  border-radius: 12px;
  box-shadow: #080808 8px 8px 8px;
}
</style>
