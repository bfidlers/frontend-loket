import Component from '@ember/component';
export default Component.extend({

    init() {
        this._super(...arguments);
    },

    actions: {
        addUrlField() {
            this.urls.pushObject({protocol: null, body: null});
        }
    }
});
