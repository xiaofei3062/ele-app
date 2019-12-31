<template>
  <div class="remark">
    <!-- 头部 -->
    <my-header :is-left="true" @click="$parent.isAddress = true" title="订单备注" />

    <!-- 内容 -->
    <div class="remark-box">
      <textarea maxlength="50" placeholder="请填写备注信息/选填" v-model="message"></textarea>
      <div class="tags">
        <template v-for="(tag, tagIndex) in tagList">
          <van-tag
            :color="tag.select ? '#009eef' : ''"
            :key="tagIndex"
            @click="tagClick(tag)"
            class="tag-item"
            size="large"
          >
            {{ tag.name }}
          </van-tag>
        </template>
        <template v-for="(item, index) in selectList">
          <van-tag
            :color="item.select ? '#009eef' : ''"
            :key="index"
            @click="selectClick(item)"
            class="tag-item"
            size="large"
          >
            {{ item.name }}
          </van-tag>
        </template>
      </div>
      <van-button @click="btnClick" color="#009eef" round size="large">确定</van-button>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";

export default {
  name: "Remark",
  data() {
    return {
      tagMsg: "",
      selectMsg: "",
      tagList: [
        { select: false, name: "不吃葱" },
        { select: false, name: "不吃蒜" },
        { select: false, name: "不吃辣" },
        { select: false, name: "少点辣" },
        { select: false, name: "多点辣" }
      ],
      selectList: [
        { select: false, name: "不要香菜" },
        { select: false, name: "不要洋葱" },
        { select: false, name: "多点葱花" },
        { select: false, name: "多放点醋" }
      ]
    };
  },
  computed: {
    message: {
      get() {
        const msg = this.tagMsg + this.selectMsg;
        // 截取最后一个逗号
        return msg.substr(0, msg.lastIndexOf("，"));
      },
      set(val) {
        return val;
      }
    }
  },
  methods: {
    selectClick(item) {
      item.select = !item.select;
      if (item.select) {
        this.selectMsg += item.name + "，";
      } else {
        const name = item.name + "，";
        this.selectMsg = this.selectMsg.replace(name, "");
      }
    },
    tagClick(tag) {
      // 点击的时候全部置为 false
      this.tagList.forEach(ele => {
        ele.select = false;
      });
      tag.select = true;
      this.tagMsg = tag.name + "，";
    },
    // 给父组件传参
    btnClick() {
      this.$parent.remarkInfo.remark = this.message;
      this.$parent.isAddress = true;
    }
  },
  components: { MyHeader }
};
</script>

<style scoped>
.remark {
  z-index: 10;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.remark-box {
  width: 100%;
  height: calc(100vh - 54px);
  padding: 20px 15px;
}

.remark-box textarea {
  font-size: 14px;
  width: 325px;
  height: 120px;
  padding: 10px;
  resize: none;
  color: #666666;
  border-radius: 3px;
}

.remark-box .tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 345px;
  margin: 15px 0;
}

.remark-box .tags .tag-item {
  margin-bottom: 15px;
}
</style>
