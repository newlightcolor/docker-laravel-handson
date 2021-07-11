<template>
<section>
    <v-data-table
        loading
        loading-text="タスクをロード中..."
        hide-default-footer
        :headers="headers"
        :items="[{},{},{},{},{}]"
        class="elevation-2"
        v-show="taskListIsLoading"
    >
    </v-data-table>
    <v-data-table
        :headers="headers"
        :items="tasks"
        :items-per-page="5"
        :footer-props="{
           'items-per-page-text':'表示数',
           'items-per-page-options': ['10', '30', '50', '100']
        }"
        class="elevation-2"
        v-show="!taskListIsLoading"
    >
        <template v-slot:item.actions="{ item }">
            <v-icon
                @click="editTask(item)"
            >mdi-pencil</v-icon>
            <v-icon
                @click="deleteTask(item)"
            >mdi-delete</v-icon>
        </template>
        <template v-slot:item.content="{ item }">
            <div>
                {{item.content}}
            </div>
        </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500">
        <v-card>
            <v-card-title>
                <span class="text-h5">Edit Task</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col
                        cols="6"
                        >
                            <v-text-field
                            v-model="editTaskItem.title"
                            label="Title"
                            />
                        </v-col>
                        <v-col
                        cols="6"
                        >
                            <v-text-field
                            v-model="editTaskItem.person_in_charge"
                            label="Person In Charge"
                            />
                        </v-col>
                        <v-col
                        cols="12"
                        >
                            <v-textarea
                            v-model="editTaskItem.content"
                            label="Content"
                            />
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="editCancelTask"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="editFinishTask"
                >
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <fixedAddButton/>
</section>
</template>

<style scoped>
.v-data-table td div{
    max-width: 500px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
                headers: [
                    {text: '#', value: 'id', width: '60'},
                    {text: 'title', value: 'title', width: '80'},
                    {text: 'content', value: 'content'},
                    {text: 'person', value: 'person_in_charge'},
                    {text: '', value: 'actions', width: '80'}
                ],
                tasks: [],
                editTaskItem: {},
                editTaskItemIndex: -1,
                sort: {
                    key: "",
                    asc: true
                },
                dialog: false,
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
            deleteTask(task) {
                alert(task.id)
            },
            catchTask(task) {
                this.tasks.push(task)
            },
            editTask(task){
                this.editTaskItemIndex = this.tasks.indexOf(task)
                this.editTaskItem = task
                this.dialog = true
            },
            editFinishTask(){
                this.$axios.put('/api/tasks/'+ this.editTaskItem.id, this.editTaskItem)
                    .then(() => {
                        alert('koushin')
                    }
                )
                this.tasks[this.editTaskItem.index] = this.editTaskItem
                this.editTaskItem = {}
            },
            editCancelTask(){
                this.editTaskItem = {}
                this.dialog = false
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

        watch: {
            dialog (val) {
                val || this.editCancelTask()
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