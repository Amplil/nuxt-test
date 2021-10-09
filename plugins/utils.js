import Vue from 'vue'

Vue.filter('formatCurrency',(value)=> { // カンマ区切り
    return '¥' + String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
})

let cartItems=[]

export default (context, inject) => {
    inject('cartItems', cartItems)
}