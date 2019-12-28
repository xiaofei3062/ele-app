<template>
  <div class="addAddress">
    <!-- 头部 -->
    <my-header :is-left="true" title="新增收货地址" />

    <!-- 添加地址 -->
    <div class="viewbody">
      <!-- 表单 -->
      <van-cell-group>
        <van-field
          clearable
          clickable
          label="联系人"
          maxlength="10"
          placeholder="请输入联系人"
          required
          v-model="addressInfo.name"
        />
        <van-cell class="cell-tag">
          <span>标签</span>
          <span class="tags">
            <van-tag
              :color="index === currentTag ? '#009eef' : ''"
              :key="index"
              @click="sexClick(index)"
              class="tags-item"
              plain
              size="large"
              v-for="(item, index) in sexList"
            >
              {{ item }}
            </van-tag>
          </span>
        </van-cell>
        <van-field
          clearable
          clickable
          label="手机号"
          maxlength="11"
          placeholder="请输入手机号"
          required
          type="number"
          v-model="addressInfo.phone"
        />
        <van-field
          @click="isSearch = true"
          autosize
          clickable
          label="地址"
          maxlength="100"
          placeholder="请输入地址"
          required
          right-icon="arrow"
          rows="1"
          type="textarea"
          v-model="addressInfo.address"
        />
        <van-field
          autosize
          clickable
          label="门牌号"
          maxlength="100"
          placeholder="请输入门牌号"
          required
          right-icon="edit"
          rows="1"
          type="textarea"
          v-model="addressInfo.num"
        />
        <van-cell class="cell-tag">
          <span>标签</span>
          <span class="tags">
            <van-tag
              :color="index === currentTag2 ? '#009eef' : ''"
              :key="index"
              @click="tagClick(index)"
              class="tags-item"
              plain
              size="large"
              v-for="(item, index) in tagList"
            >
              {{ item }}
            </van-tag>
          </span>
        </van-cell>
      </van-cell-group>

      <!-- 保存/删除 -->
      <div class="btns">
        <van-button @click="handleSave" round class="btns-item" color="#009eef" size="large">保存</van-button>
        <van-button round class="btns-item" size="large" type="danger">删除</van-button>
      </div>
    </div>

    <!-- 搜索地址 -->
    <address-search :is-search="isSearch" @close="isSearch = false" @selectAddress="selectAddress" />
  </div>
</template>

<script>
import { areaList } from "@/area";
import MyHeader from "@/components/MyHeader";
import FormBlock from "@/components/orders/FormBlock";
import AddressSearch from "@/components/orders/AddressSearch";

export default {
  name: "AddAddress",
  components: { AddressSearch, FormBlock, MyHeader },
  data() {
    return {
      areaList,
      addressInfo: {
        name: "",
        phone: "",
        address: "",
        num: "",
        tag: "",
        sex: ""
      },
      tagList: ["家", "学校", "公司"],
      sexList: ["先生", "女士"],
      currentTag: -1,
      currentTag2: -1,
      isSearch: false
    };
  },
  methods: {
    // 性别点击
    sexClick(index) {
      this.currentTag = index;
      this.addressInfo.sex = this.sexList[index];
    },
    // 标签点击
    tagClick(index) {
      this.currentTag2 = index;
      this.addressInfo.tag = this.tagList[index];
    },
    // 点击选择地址
    selectAddress(item) {
      this.addressInfo.address = item.district + item.address;
      this.isSearch = false;
    },
    // 保存按钮
    handleSave() {
      console.log(this.addressInfo);
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
}

.tags {
  display: inline-block;
  margin-top: 3px;
  margin-left: 64px;
}

.tags .tags-item {
  margin-right: 10px;
}

/* 按钮 */
.btns {
  width: 100%;
  padding: 20px;
}

.btns .btns-item:first-child {
  margin-bottom: 20px;
}
</style>
