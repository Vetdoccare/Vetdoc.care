/**
 * Next.js config: keep default exportable settings.
 * If you host at https://<user>.github.io/<repo>, set `basePath` and `assetPrefix` to '/<repo>'.
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use static export
  output: 'export',
  // Uncomment and set when deploying to a project page (not a user/organization root site)
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name/',
}

module.exports = nextConfig
