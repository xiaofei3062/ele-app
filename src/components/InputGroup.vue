<template>
  <div class="text_group">
    <!-- 组件容器 -->
    <div :class="{ 'is-invalid': error }" class="input_group">
      <input
        :maxlength="maxlength"
        :name="name"
        :placeholder="placeholder"
        :type="type"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
      <!-- 输入框后面的按钮 -->
      <button :disabled="disabled" @click="$emit('btnClick')" v-if="btnTitle">
        {{ btnTitle }}
      </button>
    </div>
    <!-- 错误提醒 -->
    <div class="invalid-feedback" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  name: "InputGroup",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: String,
    placeholder: String,
    name: String,
    btnTitle: String,
    disabled: Boolean,
    error: String,
    maxlength: {
      type: String,
      default: "11"
    }
  }
};
</script>

<style scoped>
.input_group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 4px;
}

.input_group input {
  width: 60%;
  height: 100%;
  border: none;
  outline: none;
}

.input_group button {
  border: none;
  outline: none;
  background: #ffffff;
}

.input_group button[disabled] {
  color: #aaaaaa;
}

.is-invalid {
  border: 1px solid red;
}

.invalid-feedback {
  padding-top: 5px;
  color: red;
}
</style>
