import mock from "mockjs";

export default [
  {
    url: "/api/v1/user/captcha",
    method: "get",
    response: () => {
      const id = "1234";
      const image = mock.Random.image("100x100", "#894FC4", "#FFF", "png", id);
      return {
        stateCode: 200,
        message: "ok",
        data: { image, id },
      };
    },
  },
];
