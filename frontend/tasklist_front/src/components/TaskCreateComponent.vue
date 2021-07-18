<template>
    <v-card>
        <form v-on:submit.prevent="submit">
            <div>
                <div class="">
                    <label for="title" class="col-form-label">Title</label>
                    <input type="text" class="form-control" id="title"
                        v-model="task.title">
                </div>
                <div class="">
                    <label class="">Person In Charge</label>
                    <select v-model="task.person_in_charge">
                        <option v-for="person in people" v-bind:key="person.id" v-bind:value="person.name">{{person.name}}</option>
                    </select>
                </div>
            </div>
            <div>
                <label>Content</label>
                <textarea id="content"
                    v-model="task.content">
                </textarea>
            </div>
            <div>
                <v-btn
                color="blue"
                dark
                >
                Submit
                </v-btn>
            </div>
        </form>
    </v-card>
</template>

<script>
    export default {
        data: function() {
            return {
                task: {},
                people: [
                    {id: 1, name: 'person1'},
                    {id: 2, name: 'person2'},
                    {id: 3, name: 'person3'},
                ]
            }
        },
        methods: {
            submit() {
                this.$axios.post('/tasks', this.task)
                    .then((res) => {
                        this.task.content = null
                        this.$emit('catchTask', res.data);
                    });
            }
        }
    }
</script>

<style scope>
.create_form_item {
}
</style>