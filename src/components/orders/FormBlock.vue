<template>
  <div class="formblock">
    <div class="label-wrap">{{ label }}</div>
    <div class="input-group-wrap">
      <div class="input-wrap">
        <input :placeholder="placeholder" :type="type" :value="value" @change="$emit('change', $event.target.value)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormBlock",
  props: {
    type: {
      type: String,
      default: "text"
    },
    label: String,
    value: String,
    placeholder: String
  }
};
</script>

<style scoped>
.formblock {
  display: flex;
  border-bottom: 1px solid #dddddd;
  background-color: #ffffff;
}

.formblock:last-child {
  border-bottom: 0;
}

.formblock .label-wrap {
  font-weight: 700;
  line-height: 48px;
  display: block;
  flex-basis: 17%;
  height: 48px;
  color: #333333;
}

.input-group-wrap {
  flex: 1;
}

.input-wrap {
  display: flex;
  align-items: center;
  flex: 1 1 0;
  height: 48px;
}

.input-wrap input {
  font-size: 16px;
  line-height: 48px;
  display: block;
  flex: 1;
  height: 48px;
  padding-right: 15px;
  padding-left: 0;
  color: #333333;
  border: 0;
  outline: none;
  background: none;
}

.input-wrap textarea {
  font-size: 16px;
  line-height: 48px;
  flex: 1;
  padding-right: 15px;
  padding-left: 0;
  color: #333333;
  border: none;
  outline: none;
}

.input-wrap i {
  font-size: 30px;
  display: inline-block;
  margin-right: 15px;
  color: rgb(102, 102, 102);
}
</style>
