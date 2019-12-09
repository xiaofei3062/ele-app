<template>
  <div :class="{'open':isSort || isScreen}" @click.self="hideView" style="overflow: auto">
    <!-- 导航 -->
    <div class="filter_wrap" v-if="Object.keys(filterData).length!==0">
      <div class="filter">
        <div
          :class="{'filter-bold':currentFilter===index}"
          :key="index"
          @click="filterSort(index)"
          class="filter-nav"
          v-for="(item,index) in filterData.navTab">
          <span>{{item.name}}</span>
          <i :class="'fa fa-'+item.icon" v-if="item.icon" />
        </div>
      </div>
    </div>
    <!-- 排序 -->
    <div class="filter-extend" v-if="isSort">
      <ul>
        <li
          :key="index"
          @click="selectSort(item,index)"
          v-for="(item,index) in filterData.sortBy">
          <span :class="{'selectName':currentSort===index}">{{item.name}}</span>
          <i class="fa fa-check" v-show="currentSort===index" />
        </li>
      </ul>
    </div>
    <!-- 筛选 -->
    <div class="filter-extend2" v-if="isScreen">
      <div class="filter-sort">
        <div :key="index" class="morefilter" v-for="(screen,index) in filterData.screenBy">
          <p class="title">{{screen.title}}</p>
          <ul>
            <li
              :class="{'selected':item.select}"
              :key="i"
              @click="selectScreen(item,screen)"
              v-for="(item,i) in screen.data">
              <img :src="item.icon" alt="" v-if="item.icon">
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="morefilter-btn">
        <span :class="{'edit':edit}" @click="clearFilter" class="morefilter-clear">清空</span>
        <span @click="filterOk" class="morefilter-ok">确定</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FilterView",
    data() {
      return {
        currentFilter: 0,
        isSort: false,
        currentSort: 0,
        isScreen: false
      };
    },
    props: {
      filterData: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      edit() {
        let edit = false;
        this.filterData.screenBy.forEach(screen => {
          screen.data.forEach(item => {
            if (item.select) {
              edit = true;
            }
          });
        });
        return edit;
      }
    },
    methods: {
      // 导航排序
      filterSort(index) {
        this.currentFilter = index;
        if (index === 0) {
          this.isSort = true;
          this.isScreen = false;
          this.$emit("searchFixed", true);
        } else if (index === 1) {
          // 更新数据
          this.$emit("update", { condition: this.filterData.navTab[1].condition });
          this.hideView();
        } else if (index === 2) {
          // 更新数据
          this.$emit("update", { condition: this.filterData.navTab[2].condition });
          this.hideView();
        } else if (index === 3) {
          this.isScreen = true;
          this.isSort = false;
          this.$emit("searchFixed", true);
        } else {
          this.hideView();
        }
      },
      hideView() {
        this.isSort = false;
        this.isScreen = false;
        this.$emit("searchFixed", false);
      },
      // 选项排序
      selectSort(item, index) {
        this.currentSort = index;
        this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
        this.hideView();

        // 更新数据
        this.$emit("update", { condition: item.code });
      },
      // 筛选排序
      selectScreen(item, screen) {
        if (screen.id !== "MPI") {
          // 单选
          screen.data.forEach(ele => {
            ele.select = false;
          });
        }
        // 多选
        item.select = !item.select;
      },
      // 清空选项
      clearFilter() {
        this.filterData.screenBy.forEach(screen => {
          screen.data.forEach(item => {
            item.select = false;
          });
        });
      },
      // 确定按钮
      filterOk() {
        let str = "";
        const screenData = {
          MPI: "",
          offer: "",
          per: ""
        };
        this.filterData.screenBy.forEach(screen => {
          screen.data.forEach((item, index) => {
            if (item.select) {
              if (screen.id !== "MPI") {
                // 单条筛选
                screenData[screen.id] = item.code;
              } else {
                // 多条筛选
                str += item.code + ",";
                screenData[screen.id] = str;
              }
            }
          });
        });
        // console.log(str);
        this.$emit("update", { condition: screenData });
        this.hideView();
      }
    }
  };
</script>

<style scoped>
  .filter_wrap {
    position: sticky;
    z-index: 10;
    top: 54px;
    width: 100%;
    background: #ffffff;
  }

  .filter {
    line-height: 10.4vw;
    position: relative;
    z-index: 101;
    display: flex;
    justify-content: space-around;
    height: 10.666667vw;
    border-bottom: 1px solid #dddddd;
  }

  .filter-nav {
    font-size: 14px;
    flex: 1;
    text-align: center;
    white-space: nowrap;
    color: #666666;
  }

  .filter-nav i {
    width: 1.6vw;
    height: 0.8vw;
    margin-bottom: 0.533333vw;
    margin-left: 1.333333vw;
    fill: #333333;
    will-change: transform;
  }

  .filter-bold {
    font-weight: 600;
    color: #333333;
  }

  .open {
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease-in-out;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .filter-extend, .filter-extend2 {
    position: absolute;
    z-index: 4;
    top: 24.533333vw;
    left: 0;
    width: 100%;
    padding-top: 2.133333vw;
    color: #333333;
    background-color: #ffffff;
  }

  .filter-extend li, .filter-extend2 li {
    line-height: 10.666667vw;
    position: relative;
    overflow: hidden;
  }

  .filter-extend li {
    padding-left: 12px;
  }

  .fa-check {
    line-height: 10.666667vw;
    float: right;
    margin-right: 3.733333vw;
    color: #009eef;
  }

  .selectName {
    color: #009eef;
  }

  /* 筛选 */
  .filter-sort {
    line-height: normal;
    padding: 0 2.666667vw;
    background: #ffffff;
  }

  .morefilter {
    overflow: hidden;
    margin: 2.666667vw 0;
  }

  .morefilter .title {
    font-size: 14px;
    margin-bottom: 2vw;
    color: #666666;
  }

  .morefilter ul {
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .morefilter li {
    line-height: 9.333333vw;
    box-sizing: border-box;
    width: 30%;
    height: 9.333333vw;
    margin: 0.8vw 1%;
    text-align: center;
    background: #fafafa;
  }

  .morefilter li img {
    width: 3.466667vw;
    height: 3.466667vw;
    margin-right: 0.8vw;
    vertical-align: middle;
  }

  .morefilter li span {
    margin-left: 2%;
    vertical-align: middle;
  }

  .morefilter-btn {
    line-height: 11.466667vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    background-color: #fafafa;
    box-shadow: 0 -0.266667vw 0.533333vw 0 #ededed;
  }

  .morefilter-btn span {
    font-size: 14px;
    flex: 1;
    text-align: center;
    text-decoration: none;
  }

  .morefilter-clear {
    color: #dddddd;
    background: #ffffff;
  }

  .morefilter-ok {
    color: #ffffff;
    border: 0.133333vw solid #00d762;
    background: #00d762;
  }

  .selected {
    color: #3190e8 !important;
    background-color: #edf5ff !important;
  }

  .edit {
    color: #333333 !important;
  }
</style>
