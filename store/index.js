import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		cartGoods:[],
	},
    mutations: {
		addCart(state, goodInfo){
			state.cartGoods=state.cartGoods.concat(goodInfo);
		},
		subGood(state,id){
			state.cartGoods.some(item=>{
				if(item.goods_id==id)
				{
					item.goods_number--
				}
				return true
			})
		},
		addGood(state,id){
			state.cartGoods.some(item=>{
				if(item.goods_id==id)
				{
					item.goods_number++
				}
				return true
			})
		},
		
	},
    actions: {}
})
export default store