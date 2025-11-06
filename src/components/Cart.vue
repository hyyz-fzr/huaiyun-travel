<template>
  <div class="cart">
    <h1>购物车</h1>
    <p>查看和管理您的商品</p >
    
    <el-table :data="cartItems">
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="quantity" label="数量"></el-table-column>
    </el-table>
    
    <div class="cart-total">
      <h3>总计: ￥{{ totalPrice }}</h3>
      <el-button type="primary">立即购买</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cartItems = ref([
  { id: 1, name: '淮南豆腐文化文创', price: 99, quantity: 1 },
  { id: 2, name: '八公山传说书籍', price: 68, quantity: 1 }
])

const totalPrice = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})
</script>

<style scoped>
.cart {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.cart-total {
  margin-top: 20px;
  text-align: right;
}
</style>