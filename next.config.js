module.exports = {
  images: {
    loader: 'imgix',
    path: '',
    domains: ['api.pominkizal.ru'],
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false
    };
    return config;
  },
};