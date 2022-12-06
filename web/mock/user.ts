import mock from 'mockjs'

export default [
  {
    url: "/api/v1/user/captcha",
    method: "get",
    response: () => {
      return {
        state: 0,
        message: "ok",
        data: { success: true },
      };
    },
  },
];
