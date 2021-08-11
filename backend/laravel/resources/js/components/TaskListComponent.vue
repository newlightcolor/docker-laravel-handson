<template>
    <div class="container">
        <postTaskForm style="margin-bottom: 15px" v-on:catchTask="catchTask"></postTaskForm>

        <table class="table table-hover">
            <thead class="thead-light">
            <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Content</th>
                <th scope="col">Person In Charge</th>
                <th scope="col">Show</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(task, index) in tasks" :key="index">
                <th scope="row">{{ task.id }}</th>
                <td>{{ task.title }}</td>
                <td style="word-break: break-all">{{ task.content }}</td>
                <td>{{ task.person_in_charge }}</td>
                <td>
                    <router-link v-bind:to="{name: 'task.show', params: {taskId: task.id }}">
                        <button class="btn btn-primary">Show</button>
                    </router-link>
                </td>
                <td>
                    <router-link v-bind:to="{name: 'task.edit', params: {taskId: task.id }}">
                        <button class="btn btn-success">Edit</button>
                    </router-link>
                </td>
                <td>
                    <button class="btn btn-danger" v-on:click="deleteTask(task.id, index)">Delete</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import postTaskForm from './TaskCreateComponent.vue'

    export default {
        data: function () {
            return {
                tasks: []
            }
        },
        methods: {
            getTasks() {
                axios.get('/api/tasks')
                    .then((res) => {
                        this.tasks = res.data;
                    });
            },
            deleteTask(id, index) {
                this.tasks.splice(index, 1)
                axios.delete('/api/tasks/' + id);
            },
            catchTask(task) {
                this.tasks.push(task)
            }
        },
        mounted() {
            this.getTasks();
        },
        components: {
            postTaskForm
        }
    }
</script>