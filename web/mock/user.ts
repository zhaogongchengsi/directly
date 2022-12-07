import mock from "mockjs";

export default [
  {
    url: "/api/v1/user/captcha",
    method: "get",
    response: ({ query }) => {
      const id = mock.Random.word(4, 4);
      const image = mock.Random.image(
        `${query.width || 100}x${query.hright || 35}`,
        "#894FC4",
        "#FFF",
        "png",
        id
      );
      return {
        stateCode: 200,
        message: "ok",
        data: { image, id },
        err: `请求验证码成功`,
      };
    },
  },
];
