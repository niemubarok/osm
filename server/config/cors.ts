import { defineConfig } from '@adonisjs/cors'

/**
 * Configuration options to tweak the CORS policy. The following
 * options are documented on the official documentation website.
 *
 * https://docs.adonisjs.com/guides/security/cors
 */
const corsConfig = defineConfig({
  enabled: true,
  origin: [
    'https://osm.quickmix.biz.id',
    'https://sot-finding.vercel.app',
    'http://localhost:9000',
    'http://localhost:9200', 
    'http://localhost:4000',
    'http://127.0.0.1:4000',
  ],
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  headers: true,
  exposeHeaders: ['access-control-allow-origin', 'access-control-allow-credentials'],
  credentials: true,
  maxAge: 90,
})

export default corsConfig
