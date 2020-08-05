const { registerRoute } = workbox.routing
// const { CacheableResponsePlugin } = workbox.cacheableResponse
const { PrecacheController, precacheAndRoute } = workbox.precaching
const { NetworkFirst, CacheFirst, StaleWhileRevalidate } = workbox.strategies
// const { ExpirationPlugin } = workbox.expiration
// const thirdPartyDependencies = new PrecacheController()

self.__WB_DISABLE_DEV_LOGS
precacheAndRoute(
  [
    ...self.__precacheManifest,
    {
      url:
        'https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,500;1,500&family=Roboto+Condensed:wght@300;400&family=Roboto:wght@400;500&display=swap',
      revision: null
    },
    {
      url:
        'https://fonts.gstatic.com/s/firasans/v10/va9B4kDNxMZdWfMOD5VnZKveRhf6Xl7Glw.woff2',
      revision: null
    },
    {
      url:
        'https://fonts.gstatic.com/s/firasans/v10/va9f4kDNxMZdWfMOD5VvkrA6Qif4VFnklULW.woff2',
      revision: null
    },
    {
      url:
        'https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=296&q=80',
      revision: null
    }
  ] || []
)

registerRoute(
  ({ url }) =>
    url.pathname.startsWith('/api/employees') ||
    url.pathname.startsWith('/employees'),
  new StaleWhileRevalidate({
    cacheName: 'employee-cache'
  })
)

registerRoute(
  ({ url }) =>
    url.pathname.startsWith('/api/customers') ||
    url.pathname.startsWith('/customers'),
  new StaleWhileRevalidate({
    cacheName: 'customer-cache'
  })
)
