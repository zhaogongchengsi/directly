<template>
  <div
    class="w-full h-screen relative dark:bg-#232324 flex items-center justify-center login-page"
  >
    <div
      class="flex text-black border-box p-10 dark:text-white rounded-md border-1 border-black dark:border-white hover:shadow-md"
    >
      <div class="flex items-center justify-center mr-20">
        <img src="/bg1.png" alt="" />
      </div>
      <div class="w-180">
        <a-form
          size="large"
          :model="form"
          :label-col-props="{ span: 3 }"
          :wrapper-col-props="{ span: 21 }"
          @submit="handleSubmit"
        >
          <a-form-item field="account" label="账号">
            <a-input v-model="form.account" placeholder="请输入账号" />
          </a-form-item>
          <a-form-item field="password" label="密码">
            <a-input v-model="form.password" placeholder="请输入密码" />
          </a-form-item>
          <a-form-item field="captcha" label="验证码">
            <div class="flex w-full">
              <a-input
                class="flex-1"
                v-model="form.captcha"
                placeholder="请输入验证码"
              />
              <div
                class="w-30 flex items-center justify-center cursor-pointer cap-bg"
                @click="captcha"
              >
                <a-spin class="h-full" :loading="captchaImg.image === ''">
                  <img class="h-full" :src="captchaImg.image" alt="" />
                </a-spin>
              </div>
            </div>
          </a-form-item>
          <a-form-item>
            <a-button
              html-type="submit"
              type="primary"
              long
              :loading="btnLading"
            >
              <div class="flex items-center">
                <div class="icon i-tabler-login w-6 h-6"></div>
                <span class="m-3">登录</span>
              </div>
            </a-button>
          </a-form-item>
        </a-form>
        <a-row>
          <a-col :span="3"> </a-col>
          <a-col :span="21">
            <a-divider orientation="center">其他方式</a-divider>
            <div class="flex justify-center mt-10">
              <div class="i-tabler-brand-wechat icon w-10 h-10"></div>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="fixed right-0 top-0 login-mode-card">
      <Mode></Mode>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getCaptcha } from "@/api/user";
import Mode from "@/layouts/mode.vue";
import { useUserStore } from "@/store";
import { onMounted, reactive, ref } from "vue";
const userStore = useUserStore();
const btnLading = ref(false);

const captchaImg = reactive({
  id: "",
  image: "",
});

const form = reactive({
  account: "",
  password: "",
  remember: true,
  captcha: "",
});

const captcha = () => {
  captchaImg.image = "";
  getCaptcha<{ id: string; image: string }>({ width: 100, height: 30 })
    .then((res) => {
      captchaImg.id = res.id;
      captchaImg.image = res.image;
    })
    .catch((message) => {
      console.log(message);
    });
};

onMounted(() => {
  captcha();
});

const handleSubmit = async (data: any) => {
  if (data.errors) {
    console.log(data.errors);
    return;
  }

  btnLading.value = true;

  const islogin = await userStore.login({
    ...data.values,
    captcha: {
      text: data.values.captcha,
      id: captchaImg.id,
    },
  });

  btnLading.value = false;

  console.log(islogin);
};
</script>
<style lang="scss" scoped>
.login-mode-card {
  border-radius: 0% 100% 0% 100% / 1% 0% 100% 99%;
  width: 60px;
  height: 60px;
  background-color: #08aeea;
  background-image: linear-gradient(0deg, #08aeea 0%, #2af598 100%);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 10px;
}

.cap-bg {
  background-color: var(--color-fill-2);
}
</style>
