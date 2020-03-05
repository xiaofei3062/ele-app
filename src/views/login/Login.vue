<template>
  <div class="login">
    <div class="logo">
      <img alt="" src="@/assets/logo.jpg" />
    </div>
    <!-- 手机号 -->
    <input-group
      :btn-title="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getCode"
      maxlength="11"
      placeholder="请输入手机号"
      type="num"
      v-model="phone"
    />
    <!-- 验证码 -->
    <input-group
      :error="errors.code"
      maxlength="6"
      placeholder="请输入验证码"
      type="num"
      v-model="code"
    />
    <!-- 用户服务协议 -->
    <div class="login_des">
      <p>
        新用户登录即自动注册，表示已同意
        <span>《用户服务协议》</span>
      </p>
    </div>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <button :disabled="isClick" @click="btnLogin">登录</button>
    </div>
  </div>
</template>

<script>
import InputGroup from "@/components/InputGroup";

export default {
  name: "Login",
  data() {
    return {
      phone: "",
      code: "",
      errors: {},
      btnTitle: "获取验证码",
      disabled: false
    };
  },
  computed: {
    isClick() {
      return !this.phone || !this.code;
    }
  },
  components: { InputGroup },
  methods: {
    // 获取验证码
    getCode() {
      if (this.validatePhone()) {
        this.validateBtn();
      }
    },
    // 点击登录
    btnLogin() {
      // 清空错误
      this.errors = {};
      // 存用户id
      localStorage.setItem("ele_login", "5cd437fef7a6970017c415fe");
      this.$notify({
        type: "success",
        message: "登录成功，正在跳转至首页",
        duration: 2000,
        onClose: () => {
          this.$router.replace("/");
        }
      });
    },
    // 验证手机号
    validatePhone() {
      if (!this.phone) {
        this.errors = {
          phone: "手机号码不能为空"
        };
        return false;
      } else if (!/^1[3-9]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: "请填写正确的手机号码"
        };
        return false;
      } else {
        this.errors = {};
        return true;
      }
    },
    // 验证码倒计时
    validateBtn() {
      let time = 60;
      let timer = setInterval(() => {
        time--;
        this.btnTitle = `${time} 秒后重试`;
        this.disabled = true;
        if (time === 0) {
          time = 0;
          clearInterval(timer);
          this.btnTitle = "获取验证码";
          this.disabled = false;
        }

        if (time === 59) {
          this.$notify({
            type: "success",
            message: "验证码获取成功,请点击登录",
            duration: 3000
          });
          this.code = this.randomCode();
        }
      }, 1000);
    },
    // 000000-999999随机验证码
    randomCode() {
      return Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");
    }
  }
};
</script>

<style scoped>
.login {
  font-size: 14px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 30px;
  background: #ffffff;
}

.logo {
  text-align: center;
}

.logo img {
  width: 150px;
}

.text_group,
.login_des,
.login_btn {
  margin-top: 20px;
}

.login_des {
  line-height: 22px;
  color: #aaaaaa;
}

.login_des span {
  color: #4d90fe;
}

.login_btn button {
  font-size: 15px;
  width: 100%;
  height: 40px;
  color: white;
  border: none;
  border-radius: 4px;
  outline: none;
  background-color: #48ca38;
}

.login_btn button[disabled] {
  background-color: #8bda81;
}
</style>
