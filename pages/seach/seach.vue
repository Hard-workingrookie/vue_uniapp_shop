<template>
	<view class="container">
		<view class="searchGoods">
			<uni-search-bar @confirm="search" @input="input" @cancel='cancel' ></uni-search-bar>
			<view class="goodsItem" v-for="item in goods" :key='item.goods_id' @click="goDetail(item.goods_id)">
				<image class="goodImg" :src="item.goods_small_logo!=''?item.goods_small_logo:defaultImg" mode="aspectFill"></image>
				<view class="goodsInfo">
					<Text class="title">
						{{item.goods_name}}
					</Text>
					<text class="price">
						￥{{item.goods_price}}
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchGoods: [],
				goods:[],
				defaultImg: 'https://upload.jianshu.io/users/upload_avatars/2364940/1f3206d1-321e-484d-b6ab-24cf45702a47.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp'
			}
		},
		methods: {
			getData() {
				this.$request('goods/search', {}).then(res => {
					this.searchGoods = res.message.goods
				})
			},
			input(e){
				// console.log('input',e)
				this.searchGoods.some(item=>{
					if(item.goods_name.includes(e.value)){
						// console.log('匹配上了',item)
						this.goods.push(item)
					}else{
						// console.log('没有匹配上')
					}
				})
			},
			search(e){
				// console.log('search',e)
				this.searchGoods.some(item=>{
					if(item.goods_name.includes(e.value)){
						// console.log('匹配上了',item)
						this.goods.push(item)
					}else{
						// console.log('没有匹配上')
					}
				})
			},
			cancel(e){
				// console.log(e)
				this.goods=[]
			},
			goDetail(id){
				uni.navigateTo({
				    url: `/pages/detail/detail?id=${id}`
				});
			}
		},
		created() {

		},
		mounted() {
			this.getData()
		}

	}
</script>

<style lang="scss">
	.container {
		width: 100vw;

		.searchGoods {
			width: 100%;

			.goodsItem {
				width: 100%;
				display: flex;
				padding: 10px;
				box-sizing: border-box;
				border-bottom: 1px solid #eee;
				align-items: center;
				.goodImg {
					flex: 4;
					height: 130rpx;
				}

				.goodsInfo {
					flex: 8;
					padding: 0 0 0 10rpx;
					.title {
						font-size: 12px;
						line-height: 20px;
						height: 40px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.price {
						font-size: 14px;
						line-height: 20px;
						color: red;
					}
				}
			}
		}

	}
</style>
