<template>
<section>
    <v-card
    class="ma-12"
    elevation="2"
    loading
    v-show="taskListIsLoading"
    >
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
            </tbody>
        </table>
    </v-card>
    <v-card
    class="ma-12"
    elevation="2"
    v-show="!taskListIsLoading"
    >
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
                            :ref="'taskContentTextArea' + task.id"/>
                </td>
                <td>{{ task.person_in_charge }}</td>
                <td style="display: flex;">
                    <v-btn
                    v-show="editTask.id !== task.id"
                    v-on:click="editMode(index)"
                    class="mx-1"
                    color="blue"
                    width="40"
                    min-width="40"
                    heiht="40"
                    dark
                    >
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>

                    <v-btn
                    v-show="editTask.id === task.id"
                    v-on:click="editModeFinish()"
                    class="mx-1"
                    width="40"
                    min-width="40"
                    heiht="40"
                    style="padding: 5px;"
                    >
                        <v-icon>mdi-check</v-icon>
                    </v-btn>

                    <v-btn
                    v-show="editTask.id === task.id"
                    v-on:click="editTask = {}"
                    class="mx-1"
                    width="40"
                    min-width="40"
                    heiht="40"
                    style="padding: 5px;"
                    >
                        <v-icon>mdi-cancel</v-icon>
                    </v-btn>

                    <v-btn
                    v-on:click="deleteTask(task.id, index)"
                    class="mx-1"
                    width="40"
                    min-width="40"
                    heiht="40"
                    color="red"
                    dark
                    >
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </td>
            </tr>
            </tbody>
        </table>

        <fixedAddButton/>
    </v-card>
</section>
</template>

<style scoped>
.tasklist_sort {
    cursor: pointer;
}
.tasklist_sort:hover {
    opacity: 0.8;
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
    import fixedAddButton from './fixedAddButton.vue'

    export default {
        data: function () {
            return {
                tasks: [],
                editTask: {},
                sort: {
                    key: "",
                    asc: true
                },
                taskListIsLoading: true,
            }
        },
        methods: {
            getTasks() {
                return new Promise((resolve) => {
                    this.$axios.get('/api/tasks')
                        .then((res) => {
                            this.tasks = res.data;
                            resolve()
                        });
                })
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

                let ref = 'taskContentTextArea' + this.tasks[index].id
                console.log(this.$refs[ref][0])
                this.adjustHeight(this.$refs[ref][0])
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
            adjustHeight(ref) {
                const resetHeight = new Promise(function(resolve) {
                    resolve(ref.style.height = 'auto')
                });
                resetHeight.then(function(){
                    ref.style.height = (ref.scrollHeight + 10) + 'px'
                });
            }
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
            }
        },
        mounted() {
            this.getTasks()
                .then(()=> {
                    this.taskListIsLoading = false;
                });
        },
        components: {
            fixedAddButton
        },
    }
</script>