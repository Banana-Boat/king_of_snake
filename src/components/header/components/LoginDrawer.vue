<template>
  <el-drawer
    v-model="isShow"
    :before-close="onClose"
    destroy-on-close
    :with-header="false"
    size="440px"
  >
    <div class="logo-title">
      <img src="@/assets/images/logo_128.png" style="width: 100px" />
      <h2>用户登录</h2>
    </div>
    <el-form
      ref="formRef"
      label-width="22%"
      :model="formData"
      :rules="rules"
      status-icon
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
      <el-button
        @click="onSubmit(formRef)"
        color="#6842ff"
        round
        class="login-btn"
        :loading="isLoginBtnLoading"
      >
        登录
      </el-button>
    </el-form>
    <div class="register-btn">
      <span style="font-style: italic; font-size: 16px">还没有账号？</span>
      <el-button
        @click="showRegisterDrawer"
        type="primary"
        style="font-size: 16px"
        link
      >
        立即注册
      </el-button>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { login } from "../../../utils/loginAPIs";

const { isShow, closeHandle, showRegisterDrawer } = defineProps<{
  isShow: boolean;
  closeHandle: () => void;
  showRegisterDrawer: () => void;
}>();

const formData = reactive({
  name: "",
  password: "",
});

const isLoginBtnLoading = ref(false);

const formRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  name: [{ required: true, message: "用户名不可为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不可为空", trigger: "blur" }],
});

/**
 * 调用上层closeHandle()，同时清空输入框
 */
const onClose = () => {
  formData.name = "";
  formData.password = "";
  closeHandle();
};

const onSubmit = (form: FormInstance | undefined) => {
  if (!form) return;

  form.validate(async (valid) => {
    if (!valid) {
      ElMessage.error("请正确填写表单");
      return false;
    }
    const { name, password } = formData;
    try {
      isLoginBtnLoading.value = true;
      const res = await login({ username: name, password });
      if (res) {
        ElMessage.success("登录成功，开始游戏吧！");
        onClose();
      }
    } catch {
      ElMessage.error("登录失败，请重试");
    } finally {
      isLoginBtnLoading.value = false;
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
  margin: 40px 25% 30px;
  font-size: 16px;
}

.register-btn {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
