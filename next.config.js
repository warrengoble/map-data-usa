module.exports = {
  webpack: (config, { defaultLoaders, isServer }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require("styled-jsx/webpack").loader,
          options: {
            type: "global"
          }
        }
      ]
    });

    const inlineImageLimit = 8192;

    config.module.rules.push({
      test: /\.(gif|png|jpe?g)$/i,
      use: [
        {
          loader: require.resolve("url-loader"),
          options: {
            limit: inlineImageLimit,
            fallback: require.resolve("file-loader"),
            publicPath: `/_next/static/images/`,
            outputPath: `${isServer ? "../" : ""}static/images/`,
            name: "[name]-[hash].[ext]"
          }
        }
      ]
    });

    return config;
  },
  target: "serverless"
};
