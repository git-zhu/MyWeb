/** @type {import('next').NextConfig} */
const nextConfig = {
  // 生成纯静态文件，适合部署到静态托管
  output: 'export',
  // 静态托管上没有 Next 图片优化服务，关闭优化，直接输出原图地址
  images: {
    unoptimized: true,
  },
};

export default nextConfig;


