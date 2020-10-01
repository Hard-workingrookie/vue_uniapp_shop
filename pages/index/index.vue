<template>
	<view class="container">
		<view class="searchIpt"  @click='goSearch'><text class="placeholder">请输入搜索内容...</text> </view>
			<!-- <uni-search-bar @confirm="search" @input="input"></uni-search-bar> -->
			<!--轮播图 -->
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper class="swiper" indicator-dots="true" autoplay="true" interval="2000" duration="500">
							<swiper-item v-for="item in swiperdata" :key="item.goods_id">
								<view class="swiper-item uni-bg-red">
									<image :src="item.image_src" mode="scaleToFill"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
			<!--  导航 -->
			<view class="catitems">
				<view class="catitem_list" v-for="item in catitems" :key='item.name'>
					<image class="catitems_img" :src="item.image_src" mode="scaleToFill"></image>
				</view>
			</view>
			<!-- 楼层 -->
			<floordata />
		</view>
</template>

<script>
	import floordata from '../../components/floordata/floordata.vue'
	export default {
		data() {
			return {
				swiperdata: [],
				catitems: []
			}
		},
		components: {
			floordata
		},
		methods: {
			getSwiperdata() {
				this.$request('home/swiperdata', {}).then(res => {
					this.swiperdata = res.message
				})
			},
			getCatitems() {
				this.$request('home/catitems', {}).then(res => {
					this.catitems = res.message
				})
			},
			goSearch(){
				uni.navigateTo({
				    url: '/pages/seach/seach'
				});
			}
		},
		onLoad() {
			this.getSwiperdata();
			this.getCatitems();
		},

	}
</script>

<style lang="scss">
	.searchIpt {
		height: 50rpx;
		margin: 10px;
		width: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #eee;
		border-radius: 20px;
		.placeholder{
			font-size: 10px;
			color: #555;
		}
	}

	/*  导航 */
	.catitems {
		padding-top: 10px;
		width: 100%;
		display: flex;
	}

	.catitem_list {
		flex: 1;
	}

	.catitems_img {
		width: 60px;
		height: 60px;
	}
</style>
