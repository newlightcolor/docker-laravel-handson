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
                <td scope="row">{{ task.id }}</td>
                <td>
                    <div v-show="editTask.id !== task.id">{{ task.title }}</div>
                    <input type="text" class="form-control-plaintext"
                            v-show="editTask.id === task.id"
                            v-model="editTask.title">
                </td>
                <td style="word-break: break-all" v-on:fucus="editMode(task.id)">
                    <div v-show="editTask.id !== task.id">{{ task.content }}</div>
                    <textarea type="text" class="form-control-plaintext"
                            v-show="editTask.id === task.id"
                            v-model="editTask.content"
                            style=""/>
                </td>
                <td>{{ task.person_in_charge }}</td>
                <td>
                    <router-link v-bind:to="{name: 'task.show', params: {taskId: task.id }}">
                        <button class="btn btn-primary">Show</button>
                    </router-link>
                </td>
                <td>
                    <button class="btn btn-success" v-show="editTask.id !== task.id" v-on:click="editMode(index)">Edit</button>
                    <button class="btn btn-success" v-show="editTask.id === task.id" v-on:click="editModeFinish()">End</button>
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
                tasks: [],
                editTask: {},
            }
        },
        methods: {
            getTasks() {
                this.$axios.get('/api/tasks')
                    .then((res) => {
                        this.tasks = res.data;
                    });
            },
            deleteTask(id, index) {
                this.tasks.splice(index, 1)
                this.$axios.delete('/api/tasks/' + id);
            },
            catchTask(task) {
                this.tasks.push(task)
            },
            editMode(index){
                this.editTask = this.tasks[index]
                this.editTask.index = index
            },
            editModeFinish(){
                this.$axios.put('/api/tasks/'+ this.editTask.id, this.editTask)
                    .then(() => {
                        alert('koushin')
                    }
                )
                this.tasks[this.editTask.index] = this.editTask
                this.editTask = {}
            },
        },
        mounted() {
            this.getTasks();
        },
        components: {
            postTaskForm
        },
    }
</script>