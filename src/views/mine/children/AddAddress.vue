<template>
  <div class="addAddress">
    <my-header :is-left="true" title="新增收货地址" />
    <div class="viewbody">
      <van-cell-group>
        <van-field
          clickable
          maxlength="10"
          v-model="addressInfo.name"
          clearable
          label="联系人"
          placeholder="请输入联系人"
          required
        />
        <van-field
          clickable
          maxlength="11"
          v-model="addressInfo.phone"
          clearable
          label="手机号"
          placeholder="请输入手机号"
          required
          type="number"
        />
        <van-field
          required
          right-icon="arrow"
          maxlength="100"
          clickable
          v-model="addressInfo.address"
          autosize
          rows="1"
          label="地址"
          placeholder="请输入地址"
          type="textarea"
        />
        <van-field
          required
          right-icon="edit"
          maxlength="100"
          clickable
          v-model="addressInfo.num"
          autosize
          rows="1"
          label="门牌号"
          placeholder="请输入门牌号"
          type="textarea"
        />
        <van-cell class="cell-tag">
          <span>标签</span>
          <span class="tags">
            <van-tag
              plain
              @click="tagClick(index)"
              :color="index === currentTag ? '#009eef' : ''"
              class="tags-item"
              v-for="(item, index) in tagList"
              :key="index"
              size="large"
            >
              {{ item }}
            </van-tag>
          </span>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { areaList } from "@/area";
import MyHeader from "@/components/MyHeader";
import FormBlock from "@/components/orders/FormBlock";

export default {
  name: "AddAddress",
  components: { FormBlock, MyHeader },
  data() {
    return {
      areaList,
      addressInfo: {
        name: "",
        phone: "",
        address: "",
        num: "",
        tag: ""
      },
      tagList: ["家", "学校", "公司"],
      currentTag: 0
    };
  },
  methods: {
    tagClick(index) {
      this.currentTag = index;
      this.addressInfo.tag = this.tagList[index];
    }
  }
};
</script>

<style scoped>
.addAddress {
  width: 100%;
  height: 100%;
  padding-top: 54px;
}

.viewbody {
  overflow: auto;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}

/deep/ .van-icon {
  font-size: 20px;
}

/deep/ .van-cell {
  border-bottom: 1px solid #dddddd;
}

/deep/ .van-cell:last-child {
  border-bottom: 0;
}

.cell-tag {
  height: 50px;
  padding-top: 14px;
}

.tags {
  margin-left: 64px;
}

.tags .tags-item {
  margin-right: 10px;
}

/* 确定按钮 */
.form-button-wrap {
  display: flex;
  padding: 5.333333vw 4vw;
}

.form-button-wrap .form-button {
  font-size: 1.1rem;
  font-weight: 500;
  line-height: 5.066667vw;
  flex: 1;
  padding: 3.333333vw 0;
  text-align: center;
  color: #ffffff;
  border: none;
  border-radius: 0.533333vw;
  background: #00d762;
}
</style>
