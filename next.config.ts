import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
poweredByHeader:false,
images:{
  remotePatterns:[
    {
      protocol: 'https',
        hostname: '**',
        pathname: '/**',

    }
  ]
}
};

export default nextConfig;
