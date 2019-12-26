<template>
  <div class="goods">

    <!-- 商家推荐 -->
    <div
      :key="recommendIndex"
      class="recommend"
      v-for="(recommend,recommendIndex) in shopInfo.recommend">
      <p class="recommend-name">{{recommend.name}}</p>
      <div class="recommend-wrap">
        <ul>
          <li :key="index" v-for="(item,index) in recommend.items">
            <img :src="item.image_path" alt="">
            <div class="recommend-food">
              <p class="recommend-food-name">{{item.name}}</p>
              <p class="recommend-food-zm">月售：{{item.month_sales+" 单"}}</p>
              <p class="recommend-food-zm">好评率：{{item.satisfy_rate+"%"}}</p>
            </div>
            <div class="recommend-food-price">
              <p>¥{{item.activity.fixed_price}}</p>
              <!-- 加减组件 -->
              <cart-control :food="item" />
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 商品分类 -->
    <div class="menuview">

      <!-- 左侧分类列表 -->
      <div class="menu-wrapper" ref="menuScroll">
        <ul>
          <li
            :class="{'current':currentIndex === index}"
            :key="index"
            @click="selectMenu(index)"
            v-for="(item,index) in shopInfo.menu">
            <img :src="item.icon_url" alt v-if="item.icon_url">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>

      <!-- 右侧商品内容 -->
      <div class="foods-wrapper" ref="foodScroll">
        <ul>
          <li :key="index" class="food-list-hook" v-for="(item,index) in shopInfo.menu">
            <!-- 内容上 -->
            <div class="category-title">
              <strong>{{item.name}}</strong>
              <span>{{item.description}}</span>
            </div>
            <!-- 内容下 -->
            <div
              :key="i"
              class="fooddetails"
              v-for="(food,i) in item.foods">
              <!-- 左 -->
              <img :src="food.image_path" alt>
              <!-- 右 -->
              <div class="fooddetails-info">
                <h4>{{food.name}}</h4>
                <p class="fooddetails-des">{{food.description}}</p>
                <p class="fooddetails-sales">月售：{{food.month_sales+"份"}}<span style="margin: 0 8px" />好评率：{{food.satisfy_rate+"%"}}
                </p>
                <div class="fooddetails-price">
                  <span class="price">¥{{food.activity.fixed_price}}</span>
                  <!-- 加减组件 -->
                  <cart-control :food="food" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>

    <!-- 购物车 -->
    <shop-cart />

  </div>
</template>

<script>
  import CartControl from "./CartControl";
  import BScroll from "better-scroll";
  import ShopCart from "./ShopCart";

  export default {
    name: "Goods",
    components: { ShopCart, CartControl },
    data() {
      return {
        // 左侧滚动对象
        menuScroll: {},
        // 右侧滚动对象
        foodScroll: {},
        // 当前滚动位置
        scrollY: 0,
        // 列表高度
        listHeight: []
      };
    },
    mounted() {
      // 获取元素高度
      this.$nextTick(() => {
        this.initScroll();
        this.calcHeight();
      });
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
      // 根据右侧滚动高度动态赋值index
      currentIndex: {
        get() {
          for (let i = 0; i < this.listHeight.length; i++) {
            let height = this.listHeight[i];
            let height2 = this.listHeight[i + 1];

            // 判断是否在两个高度之间
            if (this.scrollY >= height && this.scrollY < height2) {
              return i;
            }
          }
          return 0;
        },
        set(val) {
          return val;
        }
      }
    },
    methods: {
      initScroll() {
        // 左侧
        this.menuScroll = new BScroll(this.$refs.menuScroll, {
          click: true
        });
        // 右侧
        this.foodScroll = new BScroll(this.$refs.foodScroll, {
          probeType: 3,
          click: true
        });

        // 监听右侧滚动事件
        this.foodScroll.on("scroll", pos => {
          // 取滚动高度绝对值
          this.scrollY = Math.abs(pos.y);
          // 滚动到指定元素
          const li = this.$refs.menuScroll.getElementsByTagName("li");
          if (this.currentIndex >= 6) {
            this.menuScroll.scrollToElement(li[this.currentIndex], 0);
          } else if (this.currentIndex < 6 && this.currentIndex >= 4) {
            this.menuScroll.scrollToElement(li[0], 0);
          }
        });
      },
      selectMenu(index) {
        this.currentIndex = index;
        // 滚动到指定元素
        const li = this.$refs.foodScroll.getElementsByClassName("food-list-hook");
        this.foodScroll.scrollToElement(li[index], 300);
      },
      // 动态计算右侧滚动高度
      calcHeight() {
        const foodList = Array.from(this.$refs.foodScroll.getElementsByClassName("food-list-hook"));
        let height = 0;
        this.listHeight.splice(0, 1, height);
        // 累加可视区域高度
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.offsetHeight;
          this.listHeight.splice(i + 1, 1, height);
        }
        // console.log(this.listHeight);
      }
    }
  };
</script>

<style scoped>
  .goods {
    position: relative;
    height: calc(100vh - 44px);
    padding-bottom: 60px;
  }

  .recommend {
    padding-top: 20px;
    background-color: #ffffff;
  }

  .recommend-name {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 10px;
    padding-left: 20px;
    color: #333333;
  }

  .recommend-wrap {
    display: flex;
    overflow-x: scroll;
    width: 100%;
  }

  .recommend-wrap ul {
    display: flex;
    padding-left: 20px;
  }

  .recommend-wrap ul li {
    width: 120px;
    margin-right: 10px;
  }

  .recommend-wrap li img {
    display: block;
    width: inherit;
    max-width: 100%;
  }

  .recommend-food .recommend-food-name {
    font-size: 12px;
    overflow: hidden;
    max-width: 110px;
    margin: 10px 0 5px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333333;
  }

  .recommend-food .recommend-food-zm {
    font-size: 12px;
    min-height: 1em;
    margin-bottom: 5px;
    color: #999999;
  }

  .recommend-food .recommend-food-zm:last-child {
    margin-bottom: 0;
  }

  .recommend-food-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 10px;
  }

  .recommend-food-price p {
    font-size: 16px;
    margin: 10px 0;
    color: #ff5339;
  }

  .menuview {
    display: flex;
    box-sizing: border-box;
    height: calc(100vh - 350px);
    background-color: #f8f8f8;
  }

  .menu-wrapper {
    overflow-y: hidden;
    width: 22%;
    background-color: #f8f8f8;
  }

  .menu-wrapper li {
    font-size: 13px;
    line-height: 1.2;
    padding: 10px;
    color: #666666;
    border-left: 3px solid transparent;
  }

  .menu-wrapper li img {
    width: 13px;
    max-width: 100%;
    height: 13px;
    margin-right: 5px;
    vertical-align: top;
  }

  .foods-wrapper {
    overflow-y: hidden;
    width: 78%;
    height: calc(100vh - 350px);
    background-color: #ffffff;
  }

  .category-title {
    display: flex;
    overflow: hidden;
    align-items: center;
    margin-bottom: 10px;
    padding: 10px;
  }

  .category-title strong {
    font-size: 14px;
    font-weight: 700;
    flex: none;
    margin-right: 5px;
    color: #666666;
  }

  .category-title span {
    font-size: 12px;
    overflow: hidden;
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #999999;
  }

  .fooddetails {
    display: flex;
    margin-bottom: 10px;
    padding: 0 10px;
  }

  .fooddetails img {
    flex: none;
    width: 95px;
    height: 95px;
    margin-right: 10px;
    outline: 1px solid #eeeeee;
  }

  .fooddetails-info {
    flex: 1;
    padding-bottom: 10px;
  }

  .fooddetails-info h4 {
    font-size: 14px;
    font-weight: 700;
    overflow: hidden;
    max-width: 170px;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #333333;
  }

  .fooddetails-des {
    font-size: 12px;
    overflow: hidden;
    max-width: 170px;
    margin: 6px 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #999999;
  }

  .fooddetails-sales {
    font-size: 12px;
    line-height: 1;
    min-height: 1em;
    color: #999999;
  }

  .fooddetails-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3.733333vw;
  }

  .fooddetails-price .price {
    font-size: 16px;
    line-height: 4.266667vw;
    display: flex;
    align-items: baseline;
    color: #ff5339;
  }

  /deep/ .menu-wrapper .current {
    font-weight: 600;
    border-left: 3px solid #009eef;
    background-color: #eeeeee;
  }
</style>
