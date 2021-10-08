<template>
  <div>
    <div id="total">小計:{{total | formatCurrency}}円</div>
    <div id="goods_list">
      <div v-for="(item, index) in citems" class="item col-xs-3">
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
  props: ['citems'],
  computed: {
    total: function () {
      let total = 0;
      for(let id in this.citems){
        total += (this.citems[id].price * this.citems[id].quantity);
      }
      return total;
    }
  },
  methods: {
    delete_cart(del_list) { // カートから削除
      /*
      del_list.forEach(id=>{
        delete this.citems[id];
      });
      */
      axios.post('delete_cart.php',{
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
