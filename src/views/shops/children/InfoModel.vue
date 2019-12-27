<template>
  <transition name="fade">
    <div class="info-model" v-show="showInfoModel">
      <div class="brief-modal">
        <h2>
          <i v-if="rst.is_premium">品牌</i>
          <span>{{ rst.name }}</span>
        </h2>
        <ul>
          <li>
            <h3>{{ rst.rating }}</h3>
            <p>评分</p>
          </li>
          <li>
            <h3>{{ rst.recent_order_num }}</h3>
            <p>月售</p>
          </li>
          <li v-if="rst.delivery_mode">
            <h3>蜂鸟转送</h3>
            <p>约{{ rst.order_lead_time }}分钟</p>
          </li>

          <li>
            <h3>¥{{ rst.float_delivery_fee }}元</h3>
            <p>配送费</p>
          </li>
          <li>
            <h3>{{ (rst.distance / 1000).toFixed(1) }}km</h3>
            <p>距离</p>
          </li>
        </ul>
        <h3 class="promotion">
          <span>公告</span>
        </h3>
        <p class="brief-modal-yx">{{ rst.promotion_info }}</p>
      </div>
      <!-- x号 -->
      <div @click="$emit('modelClose')" class="brief-modal-close">
        <van-icon class="brief-modal-close-icon" name="close" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "InfoModel",
  props: {
    rst: {
      type: Object,
      default() {
        return {};
      }
    },
    showInfoModel: {
      type: Boolean,
      default() {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.info-model {
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.brief-modal {
  position: relative;
  z-index: 100;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  box-sizing: border-box;
  width: 80%;
  max-height: 85.333333vw;
  padding: 7.066667vw 6.666667vw 7.466667vw;
  border-radius: 1.066667vw;
  background: #ffffff;
}

.brief-modal h2 {
  font-size: 16px;
  font-weight: bolder;
  line-height: 6.666667vw;
  text-align: center;
  color: #333333;
}

.brief-modal h2 i {
  font-size: 13px;
  font-weight: 700;
  font-style: normal;
  position: relative;
  top: -1px;
  margin-right: 10px;
  padding: 4px 5px;
  color: #6a3709;
  background-image: linear-gradient(90deg, #fff100, #ffe339);
}

.brief-modal ul {
  display: flex;
  margin: 5.066667vw -6.666667vw 0;
}

.brief-modal ul li {
  flex: 1;
  text-align: center;
}

.brief-modal ul li h3 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 1.6vw;
  color: #333333;
}

.brief-modal ul li p {
  font-size: 12px;
  color: #999999;
}

.brief-modal .promotion {
  position: relative;
  width: 20.266667vw;
  margin: 4.8vw auto 2.666667vw;
  text-align: center;
  background-image: linear-gradient(90deg, #ffffff, #333333 50%, #ffffff);
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100% 1px;
}

.brief-modal .promotion span {
  font-size: 14px;
  padding: 0 1.066667vw;
  color: #999999;
  background-color: #ffffff;
}

.brief-modal-yx {
  font-size: 14px;
  line-height: 1.54;
  overflow-y: auto;
  max-height: 26.666667vw;
  color: #333333;
}

.brief-modal-close {
  margin-top: 20px;
}

.brief-modal-close .brief-modal-close-icon {
  font-size: 30px;
  color: #ffffff;
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
