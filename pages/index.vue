<template>
    <div id="app" v-cloak>
    <div class="container">
    <div class="row">
        <div class="col">
            <div class="header">いろいろな商品を比較！</div>
            <!-- <p><a href="price_comparison_cart.php" target="_blank" rel="noopener noreferrer">カートを見る</a></p> -->
            <!--<form method='post' action=''>-->
            <form action method="get">
                <div class="input-group">
                    <input v-bind:value="keyword" v-model="keyword" type='text' id='searchtextbox' class="form-control" placeholder='キーワードで探す' name="keyword">
                    <!--<button class="btn btn-primary">検索</button>-->
                    <span class="input-group-btn">
                        <!--<input class="btn btn-secondary" id="searchbtn" type="submit" value="Go">-->
                        <button class="btn btn-secondary" id="searchbtn" type="submit"><i class="fas fa-search"></i></button>
                    </span>
                    <span class="btn btn-light"><a href="price_comparison_cart.html" target="_blank"><i class="fas fa-shopping-cart"></i>カートを見る</a></span>
                </div>
                <div class="select">
                    <div id="shop-select">
                        <label v-for="(value, name) :key='name' in shop_item" @click="searchbtn_click">
                            <input type="checkbox" v-bind:value="name" v-model="shop_disp" name="shop[]">{{value}}
                        </label>
                    </div>
                    <select id="order-select" name="order" v-model="order" v-on:change="searchbtn_click">
                        <option v-for="(value, name) :key='name' in order_str" v-bind:value="name">{{value}}</option>
                    </select>
                    <label>
                        <input type="checkbox" v-bind:value="true" v-model="tr_on" name="tr_on">翻訳機能
                        <span v-show="tr_on">翻訳した検索ワード：{{tr_keyword}} {{tr_busy ? "翻訳中" : "翻訳済み"}}</span>
                    </label>
                </div>
                <!--<input type="hidden" name="kind" value="change_items">-->
            </form>
            <!--</form>-->
            <div v-if="errored">
                <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
            </div>
            <div v-else>
                <transition v-if="loading" id="loading" name="fade">
                    <div class="d-flex justify-content-center m-5">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </transition>
                <!--<div v-show="item_list" id="item-list" class="row">-->
                <div id="item-list" class="row">
                    <div v-for="item in items" class="item col-xs-3">
                        <a v-bind:href="item.url" target="_blank">
                            <div class="img-block">
                                <img v-bind:src="item.image">
                            </div>
                            <div class="pos-left">[{{shop_item[item.shop]}}] {{item.title}}</div>
                            <div class="pos-left a-price">{{item.price | formatCurrency}}</div>
                        </a>
                        <div class="input-group-btn">
                            <select v-model="item.quantity" v-on:change="cart_update(item)">
                                <option v-for="i in 10" v-bind:value="i">{{i}}</option>
                            </select>
                            <button @click="cart_update(item)" class="btn add_goods" v-bind:value="item.item_id">
                                {{(typeof cartItems[item.item_id]==="undefined") ?  'カートに入れる' : '追加済み'}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-3">
            <!-- カートの中身と合計 -->
            <cart_detail :citems="cartItems" v-show="cartItems.length!==0"></cart_detail>
            <!-- サイドバー広告 -->
            <div class="sidebar_fixed">
                <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client="ca-pub-2661815267943239"
                    data-ad-slot="9624100506"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                <ins class="adsbygoogle"
                    style="display:block"
                    data-ad-client="ca-pub-2661815267943239"
                    data-ad-slot="9624100506"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
                <a href="https://hb.afl.rakuten.co.jp/hsc/215065c8.7b0eff9b.21506482.ec2625de/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiI1NyIsImJhbiI6IjE0NjY3OTgiLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"  >
                    <img src="https://hbb.afl.rakuten.co.jp/hsb/215065c8.7b0eff9b.21506482.ec2625de/?me_id=1&me_adv_id=1466798&t=pict" border="0" style="margin:2px" alt="" title="">
                </a>
            </div>
        </div>
    </div>
    </div>
    </div>
  </template>

<script>
//let shop_item ={rakuten:'楽天',amazon:'Amazon',ebay:'ebay'}; // 表示の順番
//let order_str = {'relevanceblender':'おすすめ順','review-rank':'人気順', 'price-asc-rank':'価格の安い順', 'price-desc-rank':'価格の高い順'}; // 表示の順番
//let order = 'relevanceblender';
//let shop_disp=['rakuten','ebay'];
//let item_data=[];

// "ReferenceError: window is not defined" って言われる
let v;
if (process.browser) {
  v = new URLSearchParams(window.location.search);
}
/*
let v_keyword=v.get('keyword');
let v_shop_disp=v.getAll('shop[]');
let v_order=v.get('order');
*/

import cart_detail from '~/components/cart_detail.vue'

export default {
  components: {
    cart_detail
  },
  data(){
    return{
      keyword:v.get('keyword'),
      shop_disp:v.getAll('shop[]'),
      order:v.get('order'),
      shop_item: {rakuten:'楽天',amazon:'Amazon',ebay:'ebay'}, // 表示の順番
      order_str: {'relevanceblender':'おすすめ順','review-rank':'人気順', 'price-asc-rank':'価格の安い順', 'price-desc-rank':'価格の高い順'}, // 表示の順番
      cartItems:[],
      //cart_component:false,
      //cart_text:'カートに入れる',
      items: [],
      loading: true,
      errored: false,
      item_list:false,
      tr_on:v.get('tr_on')==='true' ? true : false,
      tr_keyword:'',
      tr_busy:false
    }
  },
  mounted() {
    this.cart_update();
    // クエリフィルタ
    if(
      this.keyword!==null && 
      this.order!==null && 
      this.keyword!=='' && 
      this.order!=='' && 
      this.shop_disp.length!==0
    ){
      if(this.tr_on==true){
        this.trans(this.keyword,'ja','en',out=>{
          this.tr_keyword=out;
          this.serach_item();
        });
      }
      this.serach_item();
    }
    else{
      this.loading = false;
    }
  },
  methods: {
    cart_update(item={}){
      // 引数が何もないときphpのsessionのカート情報を呼び出すだけの機能になる
      //let cartItem={}
      if (item!=={}){
        //item.existence=true;
        /*
        cartItem={
          item_id:itemToAdd.item_id,
          image:itemToAdd.image,
          url:itemToAdd.url,
          title:itemToAdd.title,
          price:itemToAdd.price,
          shop:itemToAdd.shop,
          quantity:itemToAdd.quantity
        }
        */
        /*
        if (itemToAdd.existence === false) { // 新規商品の場合は商品を追加
          this.cartItems.push(Vue.util.extend({}, cartItem)); // 通常のオブジェクトからVueオブジェクトを作り、追加する
          //this.cart_text='追加済み';
          itemToAdd.existence=true;
        }
        */
      }
      axios.post('add_cart.php',{
        /*
        item_id:itemToAdd.item_id,
        image:itemToAdd.image,
        url:itemToAdd.url,
        title:itemToAdd.title,
        price:itemToAdd.price,
        shop:itemToAdd.shop,
        quantity:itemToAdd.quantity
        */
        item
      })
      .then(response => {
        this.cartItems = response.data
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        //this.cart_text='追加済み'
        //this.cart_component=(this.cartItems.length!==0 ? true : false); //カートにアイテムが入っている場合は表示
      })
    },
    searchbtn_click(){ // サーチボタンをクリックしてサブミット
      document.getElementById('searchbtn').click();
    },
    trans(input,source,target,tr_out_func){ // GASによる翻訳
      this.tr_busy=true;
      axios.get('https://script.google.com/macros/s/AKfycbwslso6KP1b4rBQfDcIrVBh7iJmGzdrvqBKq6s7nfBUTZPeCSlPNg-6-rLjSnnvmhxWYA/exec', {
        params: {
          text:input,
          source:source,
          target:target
        }
      })
      .then(response => {
        this.tr_busy=false;
        tr_out_func(response.data);
      })
    },
    trans_item(on){
      this.items.forEach(item => {
        if(item.shop==='ebay'){ // 海外ショップのアイテムの翻訳
          if(on){
            if(typeof item.title_ja==="undefined"){  // 変数が定義されているかどうか
              this.trans(item.title,'en','ja',out=>{
                item.title_ja=out;
                item.title_en=item.title;
                item.title=out;
              });
            }
            else{
              item.title=item.title_ja;
            }
          }
          else{
            if(typeof item.title_en!=="undefined"){  // 変数が定義されているかどうか
              item.title=item.title_en;
            }
          }
        }
      });
    },
    serach_item(){
      axios.get('price_comparison_ajax.php', {
        params: {
          keyword:this.keyword,
          shop:this.shop_disp,
          order:this.order,
          tr_keyword:this.tr_keyword
        }
      })
      .then(response => {
        this.items = response.data
        this.items.forEach(item => {
          item.quantity=1; // quantityプロパティを追加
          /*
          item.existence = false; // existence(カートにあるかどうか)プロパティを追加

          for(let cart_id in this.cartItems){
            if (cart_id === item.item_id) {
              item.existence = true;
            }
          }
          */
          /*
          this.cartItems.forEach(citem => {
            if (citem.item_id === item.item_id) {
              item.existence = true;
            }
          });
          */
        });
        this.trans_item(this.tr_on);
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
        this.item_list=true;
      })
    }
  },
  watch:{
    tr_on(value){
      this.trans_item(value);
    }
  },
  filters:{
    formatCurrency(value) { // カンマ区切り
      return '¥' + String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  },
}
</script>

<style>
</style>

