<template>
  <div class="shop-cart">
    <!-- 购物车底部 -->
    <div :class="{ 'bottomNav-carticon-empty': isEmpty }" class="bottomNav-cartfooter">
      <span @click="!isEmpty ? handleShopView() : ''" class="bottomNav-carticon">
        <i class="fa fa-cart-plus" />
        <span v-if="totalCount">{{ totalCount }}</span>
      </span>
      <div @click="!isEmpty ? handleShopView() : ''" class="bottomNav-cartInfo">
        <p class="bottomNav-carttotal">
          <span v-if="isEmpty">未选购商品</span>
          <span v-else>¥{{ totalPrice.toFixed(2) }}</span>
        </p>
        <p class="bottomNav-cartdelivery">另需配送费{{ shopInfo.rst.float_delivery_fee }}元</p>
      </div>
      <button class="submit-btn">
        <span v-if="isEmpty">¥{{ shopInfo.rst.float_minimum_order_amount }} 元起送</span>
        <span v-else>去结算</span>
      </button>
    </div>

    <!-- 购物车遮罩 -->
    <transition name="fade">
      <div @click.self="showCartView = false" class="cartview-cartmask" v-if="showCartView && !isEmpty">
        <div class="cartview-cartbody">
          <!-- 上面 -->
          <div class="cartview-cartheader">
            <span>已选商品</span>
            <button @click="clearFoods">
              <i class="fa fa-trash-o" />
              <span>清空</span>
            </button>
          </div>
          <!-- 下面 -->
          <div class="entityList-cartbodyScroller">
            <ul class="entityList-cartlist">
              <li :key="index" class="entityList-entityrow" v-for="(food, index) in selectFoods">
                <h4>
                  <span>{{ food.name }}</span>
                </h4>
                <span class="entityList-entitytotal">
                  {{ food.activity.fixed_price }}
                </span>
                <cart-control :food="food" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import CartControl from "./CartControl";

export default {
  name: "ShopCart",
  components: { CartControl },
  data() {
    return {
      totalCount: 0,
      totalPrice: 0,
      selectFoods: [],
      showCartView: false
    };
  },
  computed: {
    shopInfo: {
      get() {
        return this.$store.getters.shopInfo;
      },
      set(val) {
        return val;
      }
    },
    isEmpty() {
      let empty = true;
      this.totalCount = 0;
      this.totalPrice = 0;
      this.selectFoods = [];

      // 计算推荐商品总数量和总价格
      this.shopInfo.recommend.forEach(recommend => {
        recommend.items.forEach(item => {
          if (item.count) {
            empty = false;
            this.totalCount += item.count;
            this.totalPrice += item.activity.fixed_price * item.count;
            this.selectFoods.push(item);
          }
        });
      });

      // 计算菜单商品总数量和总价格
      this.shopInfo.menu.forEach(menu => {
        menu.foods.forEach(food => {
          if (food.count) {
            empty = false;
            this.totalCount += food.count;
            this.totalPrice += food.activity.fixed_price * food.count;
            this.selectFoods.push(food);
          }
        });
      });

      return empty;
    }
  },
  methods: {
    handleShopView() {
      this.showCartView = !this.showCartView;
    },
    clearFoods() {
      this.showCartView = false;

      // 清空数量 价格 商品数组
      this.shopInfo.recommend.forEach(recommend => {
        recommend.items.forEach(item => {
          item.count = 0;
        });
      });

      this.shopInfo.menu.forEach(menu => {
        menu.foods.forEach(food => {
          food.count = 0;
        });
      });
    }
  }
};
</script>

<style scoped>
.shop-cart {
  width: 100%;
  height: 50px;
}

.bottomNav-cartfooter {
  position: fixed;
  z-index: 101;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 10px;
  background-color: #3d3d3f;
}

.bottomNav-carticon {
  line-height: 50px;
  position: absolute;
  bottom: 6px;
  left: 10px;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  text-align: center;
  border: 3px solid #444444;
  border-radius: 50%;
  background-color: #3190e8;
  box-shadow: 0 -0.8vw 0.533333vw 0 rgba(0, 0, 0, 0.1);
}

.bottomNav-carticon > i {
  font-size: 24px;
  color: #ffffff;
}

.bottomNav-cartInfo {
  margin-left: 70px;
}

.bottomNav-carttotal {
  font-size: 14px;
  line-height: normal;
  color: #ffffff;
}

.bottomNav-cartdelivery {
  font-size: 13px;
  margin-top: 5px;
  margin-bottom: 2px;
  color: #999999;
}

.submit-btn {
  font-size: 15px;
  font-weight: 600;
  line-height: 100%;
  position: absolute;
  right: 0;
  display: block;
  height: 100%;
  padding: 0 20px;
  user-select: none;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  border: none;
  outline: none;
  background-color: #38ca73;
}

.submit-btn:active {
  background-color: rgba(56, 202, 115, 0.8);
}

.bottomNav-carticon-empty > span {
  background-image: radial-gradient(circle, #363636 6.266667vw, #444444 0);
}

.bottomNav-carticon-empty > span > i {
  color: #606065 !important;
}

.bottomNav-carticon-empty .bottomNav-carttotal > span {
  font-size: 13px;
  color: #999999;
}

.bottomNav-carticon-empty .submit-btn {
  background-color: #535356 !important;
}

.bottomNav-carticon > span {
  font-size: 13px;
  line-height: normal;
  position: absolute;
  top: -6px;
  right: 0;
  display: inline-block;
  padding: 2px 4px;
  color: #ffffff;
  border-radius: 50%;
  background-image: linear-gradient(-90deg, #ff7416, #ff3c15 98%);
}

.cartview-cartmask {
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

.cartview-cartbody {
  font-size: 14px;
  position: fixed;
  z-index: 101;
  bottom: 50px;
  left: 0;
  width: 100%;
  opacity: 1;
  background-color: #ffffff;
}

.cartview-cartheader {
  line-height: 40px;
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  color: #666666;
  border-bottom: 1px solid #dddddd;
  background-color: #eceff1;
}

.cartview-cartheader > span {
  display: flex;
  align-items: center;
  flex: 1;
}

.cartview-cartheader > button {
  font-size: 14px;
  display: flex;
  align-items: center;
  flex: none;
  text-decoration: none;
  color: #666666;
  border: none;
  outline: none;
  background: none;
}

.cartview-cartheader > button i {
  font-size: 18px;
  display: inline-block;
  margin-right: 4px;
}

.entityList-cartbodyScroller {
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 80vw;
}

.entityList-entityrow {
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 10px;
  border-bottom: 1px solid #cccccc;
}

.entityList-entityrow > h4 {
  line-height: normal;
  flex: 5.5;
}

.entityList-entityrow > h4 > span {
  font-style: normal;
  display: inline-block;
  overflow: hidden;
  max-width: 150px;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.entityList-entitytotal {
  font-weight: 700;
  flex: 2.5;
  text-align: left;
  white-space: nowrap;
  color: rgb(255, 83, 57);
}

.entityList-entitytotal::before {
  font-size: 14px;
  content: "\A5";
  color: currentColor;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
