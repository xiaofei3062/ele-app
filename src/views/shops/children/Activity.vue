<template>
  <div class="rst-activity">
    <div class="activity-txt">
      <span :style="{background: '#'+ activities[0].icon_color}">{{activities[0].icon_name}}</span>
      <span>{{activities[0].description}}</span>
    </div>
    <div @click="showSheet = true" class="activity-count">
      <span>{{activities.length}}个优惠</span>
      <i class="fa fa-caret-down" />
    </div>
    <!-- 优惠弹窗 -->
    <transition name="fade">
      <div class="act-model" v-show="showSheet">
        <div class="activity-sheet">
          <i @click="showSheet = false" class="fa fa-remove" />
          <h2>优惠活动</h2>
          <ul>
            <li :key="index" v-for="(item,index) in activities">
              <span :style="{background: '#'+ item.icon_color}">{{item.icon_name}}</span>
              <span>{{item.description}}</span>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: "Activity",
    data() {
      return {
        showSheet: false
      };
    },
    props: {
      activities: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  };
</script>

<style scoped>
  .rst-activity {
    font-size: 13px;
    line-height: 30px;
    display: flex;
    align-items: center;
    width: 80%;
    height: 30px;
    margin: 0 auto;
    color: #333333;
  }

  .rst-activity .activity-txt {
    overflow: hidden;
    flex: 1;
  }

  .activity-txt span:first-child {
    font-size: 13px;
    line-height: 20px;
    display: inline-block;
    height: 20px;
    margin-right: 5px;
    padding: 0 5px;
    color: #ffffff;
  }

  .activity-txt span:last-child {
    font-size: 13px;
    line-height: 20px;
    display: inline-block;
    width: 130px;
    height: 20px;
  }

  .activity-count {
    line-height: 20px;
    flex-shrink: 0;
    width: 70px;
    height: 20px;
    padding-right: 30px;
    text-align: right;
    white-space: nowrap;
    color: #999999;
  }

  .activity-count span {
    margin-right: 5px;
  }

  .act-model {
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

  .activity-sheet {
    position: absolute;
    z-index: 100;
    right: 0;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    padding: 20px 26px;
    background-color: #f5f5f5;
  }

  .activity-sheet h2 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
  }

  .activity-sheet ul {
    overflow-y: scroll;
    height: 50.8vw;
  }

  .activity-sheet ul li {
    font-size: 13px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .activity-sheet ul li span:first-child {
    line-height: 20px;
    display: inline-block;
    height: 20px;
    margin-right: 10px;
    padding: 0 5px;
    white-space: nowrap;
    color: #ffffff;
  }

  .activity-sheet ul li span:last-child {
    line-height: 20px;
    display: inline-block;
    flex: 1;
    height: 20px;
  }

  .act-model .fa-remove {
    font-size: 22px;
    position: absolute;
    z-index: 1002;
    top: 10px;
    right: 10px;
    color: #888888;
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
