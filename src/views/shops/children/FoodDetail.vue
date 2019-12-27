<template>
  <transition name="move">
    <div class="food" v-if="showFood">
      <div @click="$emit('foodClose')" class="foodpanel-close">
        <img alt="" src="@/assets/cancel.png" />
      </div>
      <div class="foodpanel-body">
        <div class="foodpanel-foodimg">
          <img :src="foodDetail.image_path" alt />
        </div>
        <div class="foodpanel-foodinfo">
          <h4>{{ foodDetail.name }}</h4>
          <div class="foodpanel-foodsales">
            <span>月售 {{ foodDetail.month_sales }}</span>
            <span>好评率 {{ foodDetail.satisfy_rate }}%</span>
          </div>
          <div class="foodpanel-priceLine">
            <span>¥{{ foodDetail.activity.fixed_price }}</span>
            <cart-control :food="foodDetail" class="cart-btn" />
          </div>
          <p class="description">{{ foodDetail.description }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CartControl from "./CartControl";

export default {
  name: "FoodDetail",
  components: { CartControl },
  props: {
    foodDetail: {
      type: Object,
      default() {
        return {};
      }
    },
    showFood: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.food {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 50px;
  left: 0;
  width: 100%;
  height: calc(100vh - 50px);
}

.foodpanel-close {
  position: absolute;
  z-index: 1;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.2);
}

.foodpanel-close img {
  width: 20px;
  height: 20px;
}

.foodpanel-body {
  position: relative;
  display: flex;
  overflow-x: hidden;
  overflow-y: auto;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.foodpanel-foodimg {
  display: block;
  width: 100%;
  height: 100vw;
  border-bottom: 1px solid #cccccc;
}

.foodpanel-foodimg img {
  width: 100%;
  height: 100%;
}

.foodpanel-foodinfo {
  width: 100%;
  min-height: 180px;
  padding: 15px 15px 0;
}

.foodpanel-foodinfo h4 {
  font-size: 20px;
  font-weight: 700;
  display: flex;
  overflow: hidden;
  align-items: center;
  width: 75%;
  margin-bottom: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #009eef;
}

.foodpanel-foodsales {
  font-size: 14px;
  line-height: 1;
  margin-bottom: 10px;
  color: #666666;
}

.foodpanel-foodsales span:first-child {
  margin-right: 10px;
}

.foodpanel-priceLine {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.foodpanel-priceLine > span {
  font-size: 20px;
  display: flex;
  align-items: baseline;
  color: #ff5339;
}

.foodpanel-priceLine .cart-btn {
  position: absolute;
  right: 30px;
}

.foodpanel-foodinfo > p {
  font-size: 14px;
  line-height: 24px;
  text-align: justify;
  color: #666666;
}

.move-enter-active,
.move-leave-active {
  transition: all 0.25s ease-in;
  transform: translate(0, -500px);
}

.move-enter,
.move-leave-to {
  transform: translate(0, 500px);
}
</style>
