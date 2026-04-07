import FormRecipient from "./generic/FormRecipient.js";

export default {
    name: 'SendButtons',
    components: {
        FormRecipient
    },
    data() {
        return {
            phone: '',
            type: window.TYPEUSER,
            loading: false,
            title: '',
            message: '',
            footer: '',
            buttons: [
                { button_id: 'btn1', button_text: 'Button 1' }
            ],
        }
    },
    computed: {
        phone_id() {
            return this.phone + this.type;
        }
    },
    methods: {
        openModal() {
            $('#modalSendButtons').modal({
                onApprove: function () {
                    return false;
                }
            }).modal('show');
        },
        isValidForm() {
            if (this.type !== window.TYPESTATUS && !this.phone.trim()) {
                return false;
            }
            if (!this.message.trim()) {
                return false;
            }
            if (this.buttons.length === 0) {
                return false;
            }
            if (this.buttons.some(b => !b.button_id.trim() || !b.button_text.trim())) {
                return false;
            }
            return true;
        },
        async handleSubmit() {
            if (!this.isValidForm() || this.loading) {
                return;
            }
            try {
                let response = await this.submitApi()
                window.showSuccessInfo(response)
                $('#modalSendButtons').modal('hide');
            } catch (err) {
                window.showErrorInfo(err)
            }
        },
        async submitApi() {
            this.loading = true;
            try {
                const payload = {
                    phone: this.phone_id,
                    title: this.title,
                    message: this.message,
                    footer: this.footer,
                    buttons: this.buttons
                }
                const response = await window.http.post(`/send/buttons`, payload)
                this.handleReset();
                return response.data.message;
            } catch (error) {
                if (error.response) {
                    throw new Error(error.response.data.message);
                }
                throw new Error(error.message);
            } finally {
                this.loading = false;
            }
        },
        handleReset() {
            this.phone = '';
            this.type = window.TYPEUSER;
            this.title = '';
            this.message = '';
            this.footer = '';
            this.buttons = [{ button_id: 'btn1', button_text: 'Button 1' }];
        },
        addButton() {
            const nextId = this.buttons.length + 1;
            this.buttons.push({ button_id: 'btn' + nextId, button_text: 'Button ' + nextId })
        },
        deleteButton(index) {
            this.buttons.splice(index, 1)
        }
    },
    template: `
    <div class="blue card" @click="openModal()" style="cursor: pointer">
        <div class="content">
            <a class="ui blue right ribbon label">New</a>
            <div class="header">Send Buttons</div>
            <div class="description">
                Send a message with interactive buttons
            </div>
        </div>
    </div>
    
    <div class="ui small modal" id="modalSendButtons">
        <i class="close icon"></i>
        <div class="header">Send Buttons</div>
        <div class="content">
            <form class="ui form">
                <FormRecipient v-model:type="type" v-model:phone="phone"/>
                
                <div class="field">
                    <label>Title (Optional)</label>
                    <input v-model="title" type="text" placeholder="Title for the button message">
                </div>
                <div class="field">
                    <label>Message</label>
                    <textarea v-model="message" placeholder="Main message body" rows="3"></textarea>
                </div>
                <div class="field">
                    <label>Footer (Optional)</label>
                    <input v-model="footer" type="text" placeholder="Footer text">
                </div>
                <div class="field">
                    <label>Buttons (Max 3)</label>
                    <div style="display: flex; flex-direction: column; gap: 10px">
                        <div class="ui action input" v-for="(btn, index) in buttons" :key="index">
                            <input type="text" v-model="btn.button_id" placeholder="ID" style="width: 30%">
                            <input type="text" v-model="btn.button_text" placeholder="Label">
                            <button class="ui icon button" @click.prevent="deleteButton(index)">
                                <i class="trash icon"></i>
                            </button>
                        </div>
                        <button v-if="buttons.length < 3" class="ui mini primary button" @click.prevent="addButton">
                            <i class="plus icon"></i> Add Button
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="actions">
            <button class="ui approve positive right labeled icon button" 
                :class="{'loading': loading, 'disabled': !isValidForm() || loading}"
                @click.prevent="handleSubmit">
                Send <i class="send icon"></i>
            </button>
        </div>
    </div>
`
}
