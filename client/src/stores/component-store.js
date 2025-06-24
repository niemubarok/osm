import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user-store'

const userStore = useUserStore()

const linksData = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    link: '/',
    roles: [0],
    submenu: false
  },
  // {
  //   title: 'SHE',
  //   caption: '',
  //   icon: 'health_and_safety',
  //   link: 'https://shesig.sig.id/',
  //   roles: [0],
  //   external: true,
  //   submenu: false
  // },
  {
    title: 'SOT',
    caption: '',
    icon: 'camera',
    // link: 'https://shesig.sig.id/',
    link: '/sot',
    roles: [0],
    submenu: true,
    external: false,
    children: [
      {
        title: 'SOT Dashboard',
        caption: '',
        icon: 'dashboard',
        link: '/sot',
        roles: [0]
      },
      {
        title: 'Findings',
        caption: '',
        icon: 'list',
        link: '/sot/findings',
        roles: [0]
      },
      {
        title: 'Groups ',
        caption: '',
        icon: 'group',
        link: '/sot/group',
        roles: [0]
      }
    ]
  },
  {
    title: 'Profile',
    caption: '',
    icon: 'person',
    link: '/profile',
    roles: [0],
    submenu: false
  },
  {
    title: 'Participants',
    caption: '',
    icon: 'groups',
    link: '/participants/list',
    roles: [1, 2],
    submenu: true,
    children: [
      {
        title: 'List',
        caption: '',
        icon: 'list',
        link: '/participants/list',
        roles: [1, 2]
      },
      {
        title: 'Card View',
        caption: '',
        icon: 'groups',
        link: '/participants',
        roles: [1, 2]
      }
      // {
      //   title: 'Groups ',
      //   caption: '',
      //   icon: 'group',
      //   link: '/sot/group',
      //   roles: [0]
      // }
    ]
  },
  {
    title: 'Attendances',
    caption: '',
    icon: 'fact_check',
    link: '/attendances',
    roles: [1, 2],
    submenu: false
  },
  {
    title: 'Meeting Seats',
    caption: '',
    icon: 'airline_seat_recline_normal',
    link: '/seats',
    roles: [1, 2],
    submenu: false
  },
  {
    title: 'Vehicles',
    caption: '',
    icon: 'directions_car',
    link: '/vehicles',
    roles: [1, 2],
    submenu: false
  },
  {
    title: 'Settings',
    caption: '',
    icon: 'settings',
    link: '/settings',
    roles: [1],
    submenu: false

  },
  {
    title: 'Logout',
    caption: '',
    icon: 'logout',
    isFunction: true,

    roles: [0],
    submenu: false
  }
]

export const useComponentStore = defineStore('Component', {
  state: () => ({
    seamless: ref(false),
    step: 1,
    leftDrawerOpen: false,
    showHeader: ref(true),
    essentialLinks: linksData,
    drawer: false,
    miniState: ref(false),
    tambahText: '',
    searchValue: ref(''),
    autofocus: false,
    loaded: false,
    isShowSearchBox: false,
    filterValue: ref(''),
    attendancesSearchModel: ref(''),
    meetingSeatsSearchModel: ref(''),
    participantsSearchModel: ref('dsdaer'),
    currentPage: ref(''),
    searchModels: {
      participants: ref(''),
      seats: ref(''),
      attendances: ref(''),
      vehicles: ref(''),
      findings: ref('')
    }
  }),

  getters: {
    // eslint-disable-file space-before-function-paren
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
