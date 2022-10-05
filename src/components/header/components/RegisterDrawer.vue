<template>
  <el-drawer
    v-model="isShow"
    :before-close="onClose"
    destroy-on-close
    :with-header="false"
    size="400px"
  >
    <div class="logo-title">
      <img src="@/assets/images/logo_new_128.png" style="width: 100px" />
      <h2>用户注册</h2>
    </div>
    <el-form
      ref="formRef"
      label-width="22%"
      :model="formData"
      :rules="rules"
      status-icon
      @keypress.enter="onSubmit(formRef)"
    >
      <el-form-item label="用户名" size="large" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入用户名"
          clearable
        />
      </el-form-item>
      <el-form-item label="密码" size="large" prop="password">
        <el-input
          type="password"
          v-model="formData.password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码" size="large" prop="rePassword">
        <el-input
          type="password"
          v-model="formData.rePassword"
          placeholder="请再次输入密码"
          show-password
        />
      </el-form-item>
      <el-button
        @click="onSubmit(formRef)"
        color="#6842ff"
        round
        class="login-btn"
      >
        注册
      </el-button>
    </el-form>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { register } from "../../../utils/loginAPIs";

const { isShow, closeHandle } = defineProps<{
  isShow: boolean;
  closeHandle: () => void;
}>();

const formData = reactive({
  name: "",
  password: "",
  rePassword: "",
});

const formRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  name: [{ required: true, message: "用户名不可为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不可为空", trigger: "blur" }],
  rePassword: [
    { required: true, message: "确认密码不可为空", trigger: "blur" },
    {
      validator: (_, val, cal) => {
        if (val !== formData.password) cal(new Error("两次密码输入不一致"));
        cal();
      },
      trigger: "blur",
    },
  ],
});

/**
 * 调用上层closeHandle()，同时清空输入框
 */
const onClose = () => {
  formData.name = "";
  formData.password = "";
  formData.rePassword = "";
  closeHandle();
};

const onSubmit = (form: FormInstance | undefined) => {
  if (!form) return;

  form.validate(async (valid) => {
    if (!valid) {
      ElMessage.error("请正确填写表单");
      return false;
    }

    const { name, password, rePassword } = formData;
    try {
      const res = await register({
        username: name,
        password,
        confirmedPassword: rePassword,
      });

      if (res) {
        ElMessage.success("注册成功");
        onClose();
      }
    } catch {
      ElMessage.error("注册失败，请重试");
    }
  });
};
</script>

<style scoped>
.logo-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
}

.login-btn {
  width: 50%;
  margin: 40px 25%;
  font-size: 16px;
}
</style>
