import i18n from '@/lang'
const app = {
  state: {
    sidebar: {
      opened: !+localStorage.getItem('sidebarStatus')
    },
    theme: '',
    language: ''
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        localStorage.setItem('sidebarStatus', 1)
      } else {
        localStorage.setItem('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    SET_THEME: (state, theme) => {
      localStorage.setItem('theme', theme)
      state.theme = theme
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      localStorage.setItem('language', language)
    }
  },
  getters: {
    getTheme: state => {
      if (!state.theme) {
        state.theme = localStorage.getItem('theme') || process.env.APP_COLOR
      }
      return state.theme
    },
    getLanguage: state => {
      if (!state.language) {
        state.language = localStorage.getItem('language') || process.env.APP_LANG
      }
      document.getElementById('app').setAttribute('class', state.language)
      i18n.locale = state.language
      return state.language
    }
  },
  actions: {
    toggleSideBar ({
      commit
    }) {
      commit('TOGGLE_SIDEBAR')
    },
    setTheme ({
      commit
    }, theme) {
      commit('SET_THEME', theme)
    },
    setLanguage ({
      commit
    }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
}

export default app
