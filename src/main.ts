import { createApp, markRaw } from 'vue'

// import pinia
import { createPinia } from "pinia"

import './style.css'
import App from './App.vue'

// import routes
import router from './router'

// import axios
import axios from "axios"
import VueAxios from "vue-axios"

// import fontawesome core
import { library } from "@fortawesome/fontawesome-svg-core"

// import fontawesome icon component
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

// import fontawesome solid icon
import {
<<<<<<< Updated upstream
    faUser
=======
    faUser as fasUser,
    faPlus,
    faMagnifyingGlass,
    faHouse,
    faArrowTrendUp,
    faArrowLeftLong,
    faGear
>>>>>>> Stashed changes
} from "@fortawesome/free-solid-svg-icons"

// import fontawesome regular icon


// import fontawesome brand icon


// add fontawesome icon from library
library.add(
<<<<<<< Updated upstream
    faUser
=======
    faUser,
    fasUser,
    faPlus,
    faBell,
    faMagnifyingGlass,
    faCreditCard,
    faHouse,
    faArrowTrendUp,
    faArrowLeftLong,
    faGear
>>>>>>> Stashed changes
)

// inisialize pinia
const pinia = createPinia()
pinia.use(({ store }) => {
    store.router = markRaw(router)
})

createApp(App)
.use(router)
.use(pinia)
.use(VueAxios, axios)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')
