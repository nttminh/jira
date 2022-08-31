import createCache from "@emotion/cache";

const createEmotionCache = () => {
  // setting prepend to true because
  // It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
  return createCache({ key: "css", prepend: true });
};

export default createEmotionCache;
