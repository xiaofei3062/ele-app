<template>
  <div class="addAddress">
    <!-- 头部 -->
    <my-header
      :is-left="true"
      :title="title"
      @click="$router.replace({ name: 'myAddress', params: { isGetData: 'false' } })"
    />

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
              :color="item === addressInfo.sex ? '#009eef' : ''"
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
          v-model="addressInfo.bottom"
        />
        <van-cell class="cell-tag">
          <span>标签</span>
          <span class="tags">
            <van-tag
              :color="item === addressInfo.tag ? '#009eef' : ''"
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

      <!-- 编辑/删除 -->
      <div class="btns" v-if="isDelete">
        <van-button @click="handleAddress" class="btns-item" color="#009eef" round size="large">
          编辑
        </van-button>
        <van-button @click="deleteAddress" class="btns-item" round size="large" type="danger">
          删除
        </van-button>
      </div>

      <!-- 保存/清空 -->
      <div class="btns" v-else>
        <van-button @click="handleAddress" class="btns-item" color="#009eef" round size="large">
          保存
        </van-button>
        <van-button @click="clearAddress" class="btns-item" round size="large" type="danger">
          清空
        </van-button>
      </div>
    </div>

    <!-- 搜索地址 -->
    <address-search :is-search="isSearch" @close="isSearch = false" @selectAddress="selectAddress" />
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import AddressSearch from "@/components/orders/AddressSearch";

export default {
  name: "AddAddress",
  components: { AddressSearch, MyHeader },
  data() {
    return {
      title: "",
      addressInfo: {
        name: "",
        phone: "",
        address: "",
        bottom: "",
        tag: "",
        sex: ""
      },
      tagList: ["家", "学校", "公司"],
      sexList: ["先生", "女士"],
      isSearch: false,
      isDelete: false
    };
  },
  activated() {
    this.acceptAddress();
  },
  methods: {
    // 性别点击
    sexClick(index) {
      this.addressInfo.sex = this.sexList[index];
    },
    // 标签点击
    tagClick(index) {
      this.addressInfo.tag = this.tagList[index];
    },
    // 点击选择地址
    selectAddress(item) {
      this.addressInfo.address = item.district + item.address + item.name;
      this.isSearch = false;
    },
    // 保存/编辑
    handleAddress() {
      // 手机号正则
      const reg = /^1[3-9]\d{9}$/;

      // 表单验证
      if (!this.addressInfo.name) {
        this.$toast("请输入联系人");
      } else if (!this.addressInfo.sex) {
        this.$toast("请选择您的身份");
      } else if (!this.addressInfo.phone) {
        this.$toast("请输入手机号");
      } else if (!reg.test(this.addressInfo.phone)) {
        this.$toast("请输入正确的手机号");
      } else if (!this.addressInfo.address) {
        this.$toast("请选择地址");
      } else if (!this.addressInfo.bottom) {
        this.$toast("请输入门牌号");
      } else if (!this.addressInfo.tag) {
        this.$toast("请选择标签");
      } else {
        // isDelete为真 发送修改请求
        if (this.isDelete === true) {
          this.editAddress(this.addressInfo);
        } else {
          // isDelete为假 发送保存请求
          this.saveAddress(this.addressInfo);
        }
      }
    },
    // 保存地址
    saveAddress(val) {
      axios
        .post("/api/user/add_address/" + localStorage.getItem("ele_login"), val)
        .then(res => {
          // 提交数据成功后清空表单
          this.clearAddress();
          this.$router.push("/myAddress");
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 清空表单
    clearAddress() {
      this.addressInfo.name = "";
      this.addressInfo.phone = "";
      this.addressInfo.address = "";
      this.addressInfo.bottom = "";
      this.addressInfo.tag = "";
      this.addressInfo.sex = "";
    },
    // 接收传过来的编辑地址数据
    acceptAddress() {
      this.title = this.$route.query.title || "新增收货地址";
      const address = sessionStorage.getItem("edit_address");
      if (address) {
        this.isDelete = true;
        this.addressInfo = JSON.parse(address);
      } else {
        // 没有缓存则清空数据
        this.isDelete = false;
        this.clearAddress();
      }
    },
    // 编辑地址
    editAddress(address) {
      axios
        .post(`/api/user/edit_address/${localStorage.ele_login}/${address._id}`, address)
        .then(res => {
          // console.log(res);
          this.$toast({
            message: "修改地址成功",
            onClose: () => {
              this.$router.push("/myAddress");
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 删除地址
    deleteAddress() {
      this.$dialog
        .confirm({
          title: "温馨提示",
          message: "您确定要删除该地址吗？"
        })
        .then(() => {
          axios
            .delete(`/api/user/address/${localStorage.ele_login}/${this.addressInfo._id}`)
            .then(res => {
              this.clearAddress();
              sessionStorage.removeItem("edit_address");
              this.isDelete = false;
              this.$toast({
                message: "删除地址成功",
                onClose: () => {
                  this.$router.push("/myAddress");
                }
              });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          return false;
        });
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
