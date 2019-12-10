<template>
  <div class="login">
    <div class="logo">
      <img alt="" src="@/assets/logo.jpg">
    </div>
    <!-- 手机号 -->
    <input-group :btn-title="btnTitle"
                 :disabled="disabled"
                 :error="errors.phone"
                 @btnClick="getCode"
                 maxlength="11"
                 placeholder="请输入手机号"
                 type="num"
                 v-model="phone"
    />
    <!-- 验证码 -->
    <input-group :error="errors.code"
                 maxlength="6"
                 placeholder="请输入验证码"
                 type="num"
                 v-model="code" />
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
      getCode() {
        if (this.validatePhone()) {
          this.validateBtn();
          // 发送网络请求
          axios.post("/api/posts/sms_send", {
            tpl_id: "183730",
            key: "78b924d20318d1b59e08ee3a8601ea78",
            phone: this.phone
          }).then(res => {
            // console.log(res);
          }).catch(err => {
            console.log(err);
          });
        }
      },
      // 点击登录
      btnLogin() {
        // 清空错误
        this.errors = {};
        // 发送请求
        axios.post("/api/posts/sms_back", {
          phone: this.phone,
          code: this.code
        }).then(res => {
          // 540666默认验证码
          console.log(res);
          if (res.msg === "验证成功") {
            localStorage.setItem("ele_login", "登录成功");
            this.$notify({
              type: "success",
              message: "登录成功，正在跳转至首页",
              duration: 2000,
              onClose: () => {
                this.$router.push("/").catch(err => {});
              }
            });
          }
        }).catch(err => {
          this.errors = {
            code: err.response.data.msg
          };
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
        }, 1000);
      }
    }
  };
</script>

<style scoped>
  .login {
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
    font-size: 14px;
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
