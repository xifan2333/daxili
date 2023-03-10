import { createRouter, createWebHashHistory } from "vue-router";
import cover from "../views/cover.vue"
import question from "../views/question.vue"
import settings from "../views/settings.vue"

const routes = [{
    path: '/',
    component: cover
},
{ 
    path: '/question',
    component: question
},
{
    path: '/settings',
    component: settings
}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router