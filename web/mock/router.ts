export default [
  {
    url: "/api/v1/router/routers",
    method: "get",
    response: () => {
      return {
        stateCode: 200,
        message: "ok",
        data: [{}],
      };
    },
  },
];
