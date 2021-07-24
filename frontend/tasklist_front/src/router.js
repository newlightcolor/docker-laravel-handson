import Vue from 'vue'
import Router from 'vue-router'
import TaskListComponent from "./components/TaskListComponent";
import TaskCreateComponent from "./components/TaskCreateComponent";
import TaskDetailComponent from "./components/TaskDetailComponent";
import TaskEditComponent from "./components/TaskEditComponent";
import UserRegisterComponent from "./components/UserRegisterComponent.vue";
import LoginPageComponent from "./components/LoginPageComponent.vue";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'task.list',
            component: TaskListComponent
        },
        {
            path: '/tasks/list',
            name: 'task.list',
            component: TaskListComponent
        },
        {
            path: '/tasks/create',
            name: 'task.create',
            component: TaskCreateComponent
        },
        {
            path: '/tasks/:taskId',
            name: 'task.show',
            component: TaskDetailComponent,
            props: true
        },
        {
            path: '/tasks/:taskId/edit',
            name: 'task.edit',
            component: TaskEditComponent,
            props: true
        },
        {
            path: '/user/register',
            component: UserRegisterComponent,
        },
        {
            path: '/login',
            component: LoginPageComponent,
        },
    ]
})