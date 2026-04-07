import FormRecipient from "./generic/FormRecipient.js";

export default {
    name: 'SendTemplate',
    components: {
        FormRecipient
    },
    data() {
        return {
            phone: '',
            type: window.TYPEUSER,
            loading: false,
            namespace: '',
            template_id: '',
            language: '',
            title: '',
            message: '',
            footer: '',
        }
    },
    computed: {
        phone_id() {
            return this.phone + this.type;
        }
    },
    methods: {
        openModal() {
            $('#modalSendTemplate').modal({
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
            return true;
        },
        async handleSubmit() {
            if (!this.isValidForm() || this.loading) {
                return;
            }
            try {
                let response = await this.submitApi()
                window.showSuccessInfo(response)
                $('#modalSendTemplate').modal('hide');
            } catch (err) {
                window.showErrorInfo(err)
            }
        },
        async submitApi() {
            this.loading = true;
            try {
                const payload = {
                    phone: this.phone_id,
                    namespace: this.namespace,
                    template_id: this.template_id,
                    language: this.language,
                    title: this.title,
                    message: this.message,
                    footer: this.footer
                }
                const response = await window.http.post(`/send/template`, payload)
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
    },
    template: `
    <div class="blue card" @click="openModal()" style="cursor: pointer">
        <div class="content">
            <a class="ui blue right ribbon label">New</a>
            <div class="header">Send Template</div>
            <div class="description">
                Send a pre-formatted template message
            </div>
        </div>
    </div>
    
    <div class="ui small modal" id="modalSendTemplate">
        <i class="close icon"></i>
        <div class="header">Send Template</div>
        <div class="content">
            <form class="ui form">
                <FormRecipient v-model:type="type" v-model:phone="phone"/>
                
                <div class="field">
                    <label>Title (Optional)</label>
                    <input v-model="title" type="text" placeholder="Title">
                </div>
                <div class="field">
                    <label>Message</label>
                    <textarea v-model="message" placeholder="Main message body" rows="3"></textarea>
                </div>
                <div class="field">
                    <label>Footer (Optional)</label>
                    <input v-model="footer" type="text" placeholder="Footer">
                </div>
                <div class="field">
                    <label>Template ID (Optional)</label>
                    <input v-model="template_id" type="text" placeholder="Template ID for hydration">
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
