<template>
  <div class="product-list">
    <div class="page-header">
      <h1>文创产品</h1>
      <p>购买精美的淮南文化创意产品</p >
    </div>
    
    <div class="content-section">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="8" :md="6" v-for="item in 8" :key="item">
          <el-card class="product-card">
            <template #header>
              <h3>文创产品 {{ item }}</h3>
            </template>
            <p>精美的淮南文化创意产品</p >
            <el-button type="primary">购买</el-button>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
// 产品列表逻辑
</script>

<style scoped>
.product-list {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.page-header {
  text-align: center;
  margin-bottom: 40px;
}
.product-card {
  margin-bottom: 20px;
}
</style>