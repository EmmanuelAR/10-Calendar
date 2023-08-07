export const getEnvVariables = () => {
  import.meta.env;
  return {
    VITE_MODE: import.meta.env.VITE_MODE,
    ...import.meta.env,
  };
};
