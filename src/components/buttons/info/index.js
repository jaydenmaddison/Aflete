const button = theme => {
  switch (theme) {
    case 1:
      return require("./t1").default;
      break;
    case 2:
      return require("./t2").default;
      break;
    case 3:
      return require("./t3").default;
      break;
    case 4:
      return require("./t4").default;
      break;
    case 5:
      return require("./t5").default;
      break;
    case 6:
      return require("./t6").default;
      break;
    default:
      return require("./default").default;
      break;
  }
};

export default button;
