const path = require('path');
const { useBabelRc, override } = require('customize-cra');
module.exports = override((config) => {
  // we need the display names to NOT be mangled in order for our component library to work
  // it uses the display name of a component to map it to the correct style rules
  const updatedConfig = { ...config };

  // use our node_modules and avoid duplicate react errors from deps that also use react
  // when npm-linking
  const npmLinkPaths = {
    react: path.join(__dirname, 'node_modules/react'),
    'react-dom': path.join(__dirname, 'node_modules/react-dom'),
    'styled-components': path.join(__dirname, 'node_modules/styled-components'),
  };

  const defaultConfig = {
    components: path.resolve(__dirname, 'src/components/'),
    utils: path.resolve(__dirname, 'src/utils'),
  };

  if (process.env.REACT_APP_ENVIRONMENT === 'development') {
    Object.assign(defaultConfig, npmLinkPaths);
  }

  updatedConfig.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      ...defaultConfig,
    },
  };

  const terserConfigIdx = config.optimization.minimizer.findIndex(
    (opt) => opt && opt.constructor && opt.constructor.name === 'TerserPlugin',
  );
  if (terserConfigIdx > -1) {
    updatedConfig.optimization.minimizer[terserConfigIdx].options.terserOptions.keep_classnames = true;
    updatedConfig.optimization.minimizer[terserConfigIdx].options.terserOptions.keep_fnames = true;
  }
  useBabelRc();
  return updatedConfig;
});
