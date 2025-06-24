import { boot } from 'quasar/wrappers'
import ls from 'localstorage-slim'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  ls.config.encrypt = true
  // ls.config.ttl = 1000 * 60 * 60 * 24 * 2;
  ls.config.ttl = Date.now() + 30 * 1000
})
