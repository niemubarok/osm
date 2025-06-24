const routes = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('src/pages/IndexPage.vue'),
        meta: {
          showSidebar: true,
          showHeader: true,
          showFooter: true,
          showSearchBar: false,
          title: 'Dashboard',
          roles: [0]

        }
      },
      {
        path: '/sot',
        name: 'sot',
        component: () => import('src/pages/SotPage.vue'),
        meta: {
          showSidebar: true,
          showHeader: true,
          showFooter: false,
          showSearchBar: false,
          title: 'SOT',
          roles: [0]

        }
      },
      {
        path: '/sot/findings',
        name: 'sot list',
        component: () => import('src/pages/SotListPage.vue'),
        meta: {
          showSidebar: true,
          showHeader: true,
          showFooter: false,
          showSearchBar: true,
          searchModel: 'findings',
          title: 'SOT',
          roles: [0]

        }
      },
      {
        path: '/sot/group',
        name: 'sot group',
        component: () => import('src/pages/SotGroupPage.vue'),
        meta: {
          showSidebar: true,
          showHeader: true,
          showFooter: false,
          showSearchBar: false,
          title: 'SOT Group',
          roles: [0]

        }
      },
      {
        path: '/login',
        name: 'login',
        meta: {
          showSidebar: false,
          showHeader: false,
          showFooter: false,
          showSearchBar: false,
          title: 'Login',
          roles: [0]
        },
        component: () => import('src/pages/LoginPage.vue')
      },
      {
        path: '/profile/:username?',
        name: 'profile',
        meta: {
          showSidebar: true,
          showHeader: true,
          showFooter: false,
          showSearchBar: false,
          title: 'profile',
          roles: [0]

        },
        component: () => import('src/pages/ProfilePage.vue')
      },
      {
        path: '/participants',
        name: 'participants',
        meta: {
          showSidebar: true,
          showHeader: true,
          showFooter: false,
          showSearchBar: true,
          searchModel: 'participants',
          title: 'participants',
          roles: [1, 2],
          permission: 'read'

        },
        component: () => import('src/pages/ParticipantsPage.vue')
      },
      {
        path: '/participants/list',
        name: 'participants list',
        meta: {
          showSidebar: true,
          showHeader: true,
          showFooter: false,
          showSearchBar: true,
          searchModel: 'participants',
          title: 'participants',
          roles: [1, 2],
          permission: 'read'

        },
        component: () => import('src/pages/ParticipantsTablePage.vue')
      },
      {
        path: '/attendances',
        name: 'attendances',
        meta: {
          showSidebar: true,
          showHeader: true,
          showFooter: false,
          showSearchBar: true,
          searchModel: 'attendances',
          title: 'attendances',
          roles: [1, 2]
        },
        component: () => import('src/pages/AttendancesPage.vue')
      },
      {
        path: '/participant/:username',
        name: 'participantDetail',
        meta: {
          showSidebar: true,
          showHeader: true,
          showFooter: false,
          showSearchBar: false,
          title: 'participant detail',
          roles: [1, 2]
        },
        component: () => import('src/pages/ParticipantDetailPage.vue')
      },
      {
        path: '/seats',
        name: 'seats',
        meta: {
          showSidebar: true,
          showHeader: true,
          showFooter: false,
          showSearchBar: true,
          searchModel: 'seats',
          title: 'meeting seats',
          roles: [1, 2]
        },
        component: () => import('src/pages/MeetingSeatsPage.vue')
      },
      {
        path: '/vehicles',
        name: 'vehicles',
        meta: {
          showSidebar: true,
          showHeader: true,
          showFooter: false,
          showSearchBar: true,
          searchModel: 'vehicles',
          title: 'vehicles',
          roles: [1, 2]
        },
        component: () => import('src/pages/VehiclesPage.vue')
      },
      {
        path: '/settings',
        name: 'settings',
        meta: {
          showSidebar: true,
          showHeader: true,
          showFooter: false,
          showSearchBar: false,
          title: 'meeting settings',
          roles: [1]

        },
        component: () => import('src/pages/SettingsPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/ErrorNotFound.vue')
  }
]

export default routes
