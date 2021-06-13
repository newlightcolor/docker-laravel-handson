<template>
    <div class="row justify-content-center card">
        <div style="margin: 20px;">
            <form v-on:submit.prevent="submit" class="row">
                <div class="col-12 row">
                    <div class="form-group row create_form_item col-5">
                        <label for="title" class="col-sm-5 col-form-label">Title</label>
                        <input type="text" class="col-sm-7 form-control" id="title"
                            v-model="task.title">
                    </div>
                    <div class="form-group row create_form_item col-5">
                        <label for="person-in-charge" class="col-sm-5 col-form-label">Person In Charge</label>
                        <select type="text" class="col-sm-7 form-control" id="person-in-charge" v-model="task.person_in_charge">
                            <option v-for="person in people" v-bind:key="person.id" v-bind:value="person.name">{{person.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row create_form_item col-12">
                    <label for="content" class="col-sm-2 col-form-label">Content</label>
                    <textarea type="text" class="col-sm-10 form-control" id="content"
                        v-model="task.content">
                    </textarea>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
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
                axios.post('/api/tasks', this.task)
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
    max-width: 100%;
}
</style>