import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/api/auth/login'

  async handle(ctx: HttpContext, next: NextFn, options?: { guards?: ("web")[] }) {
    if (ctx.request.method() === 'OPTIONS') {
      return ctx.response.status(200).send('')
    }

    try {
      // Use session guard by default or specified guards
      const guards = options?.guards || ['web']
      await ctx.auth.authenticateUsing(guards)
      return next()
    } catch (error) {
      return ctx.response.status(401).json({ 
        error: 'Unauthorized',
        message: 'Please login to access this resource'
      })
    }
  }
}
