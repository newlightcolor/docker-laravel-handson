<template>
    <div class="container">
        <postTaskForm style="margin-bottom: 15px" v-on:catchTask="catchTask"></postTaskForm>

        <table class="table table-hover">
            <thead class="thead-light">
            <tr>
                <th scope="col" class="tasklist_sort" @click="sortBy('id')"># {{ sort.key === 'id'? (sort.asc? '▲': '▼' ): '' }}</th>
                <th scope="col" class="tasklist_sort" @click="sortBy('title')">Title {{ sort.key === 'title'? (sort.asc? '▲': '▼' ): '' }}</th>
                <th scope="col" class="tasklist_sort" @click="sortBy('content')">Content {{ sort.key === 'content'? (sort.asc? '▲': '▼' ): '' }}</th>
                <th scope="col" class="tasklist_sort" @click="sortBy('person_in_charge')">Person In Charge {{ sort.key === 'person_in_charge'? (sort.asc? '▲': '▼' ): '' }}</th>
                <th scope="col" style="width: 120px"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(task, index) in sort_tasks" :key="task.id">
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
                    <button class="btn task-btn btn-success" v-show="editTask.id !== task.id" v-on:click="editMode(index)"><fa-icon icon="pen"/></button>
                    <button class="btn task-btn btn-primary" v-show="editTask.id === task.id" v-on:click="editModeFinish()" style="padding: 5px;"><fa-icon icon="check"/></button>
                    <button class="btn task-btn btn-danger" v-on:click="deleteTask(task.id, index)"><fa-icon icon="trash-alt"/></button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.tasklist_sort {
    cursor: pointer;
}
.tasklist_sort:hover {
    opacity: 0.8;
}

.task-btn {
    height: 40px;
    width: 40px;
    margin: 2px;
}

.v-enter {
  opacity: 0;
}
.v-enter-to {
  opacity: 1;
}
.v-enter-active {
  transition: all 500ms;
}
</style>

<script>
    import postTaskForm from './TaskCreateComponent.vue'

    export default {
        data: function () {
            return {
                tasks: [],
                editTask: {},
                sort: {
                    key: "",
                    asc: true
                }
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
            sortBy(sort_key) {
                if(this.sort.key === sort_key){
                    if(this.sort.asc === false){
                        this.sort.key = ""
                        this.sort.asc = true
                    }else{
                        this.sort.key = sort_key
                        this.sort.asc = false
                    }
                }else{
                    this.sort.key = sort_key
                    this.sort.asc = true
                }
            },
        },
        computed: {
            sort_tasks() {
                let task_list = this.tasks.slice();

                if(this.sort.key != ""){
                    task_list.sort((a,b) => {
                        if(this.sort.asc === true){
                            if(a[this.sort.key] < b[this.sort.key]) return -1;
                            if(a[this.sort.key] > b[this.sort.key]) return 1;
                        }else{
                            if(a[this.sort.key] > b[this.sort.key]) return -1;
                            if(a[this.sort.key] < b[this.sort.key]) return 1;
                        }
                        return 0;
                    });
                }

                return task_list;
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