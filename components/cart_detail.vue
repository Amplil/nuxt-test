<template>
  <div>
    <div id="total">小計:{{total | formatCurrency}}円</div>
    <div id="goods_list">
      <div v-for="(item, index) in cartItems" :key='index' class="item col-xs-3">
        <div class="img-block">
          <img v-bind:src="item.image">
          <div>
            {{item.quantity}}個
            <button @click="delete_cart([index])"><i class="far fa-trash-alt"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['cartItems'],
  mounted() {
    console.log(this.cartItems);
  },
  computed: {
    total(){
      let total = 0;
      const cartItems=this.cartItems;
      for(let id in cartItems){
        total += (cartItems[id].price * cartItems[id].quantity);
      }

      return total;
    }
  },
  methods: {
    delete_cart(del_list) { // カートから削除
      /*
      del_list.forEach(id=>{
        delete this.$cartItems[id];
      });
      */
      $axios.post('delete_cart.php',{
        del_list
      })
      .then(response => {
        app.cartItems = response.data
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
};
</script>
