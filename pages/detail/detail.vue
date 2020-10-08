<template>
	<view class="container">
		<view class="goodsInfo">
			<view class="goodImg">
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" autoplay="true" interval="2000" duration="500" @change='getCurrent' circular='true'>
								<swiper-item class="swiperList" v-for="item in detail.pics" :key='item.goods_id'>
									<view class="swiper-item uni-bg-red">
										<image class="goodBigImg" :src="item.pics_mid" mode="aspectFit">
										</image>
									</view>
								</swiper-item>
							</swiper>
							<text class="currentImg">{{currentNum}}/{{picTotal}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="goodsText">
				<Text class="price">
					￥ {{detail.goods_price}}
				</Text>
				<view class="goodsintroduce">
					<text class="goods_name">{{detail.goods_name}}</text>
					<view class="line">

					</view>
					<view class="collect">
						<uni-icons class="collect_icon" type="star" size="20"></uni-icons>
						<text class="collect_text">收藏</text>
					</view>
				</view>
			</view>
			<view class="uni-common-mt" style="background:#f1f1f1; padding: 30rpx 20rpx; box-sizing: border-box;">
				<view class="goods_detail_title">宝贝详情</view>
				<rich-text :nodes="detail.goods_introduce"></rich-text>
			</view>
		</view>
		<view class="buyBtns">
			<view class="contact custom_btn ">
				<uni-icons class="" type="headphones" size="20"></uni-icons>
				<text class="btn_text">联系客服</text>
			</view>
			<view class="share custom_btn">
				<uni-icons class="" type="redo" size="20"></uni-icons>
				<text class="btn_text">分享</text>
			</view>
			<view class="cart custom_btn" @click="goCart">
				<uni-icons class="" type="cart" size="20"></uni-icons>
				<text class="btn_text">购物车</text>
			</view>
			<view class="rightBtn">
				<view class="addCart" @click="addCart">
					加入购物车
				</view>
				<view class="nowBuy">
					立即购买
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				detail: [],
				id: '',
				currentNum: 1
			}
		},
		methods: {
			getData() {
				this.$request('goods/detail', {
					goods_id: this.id
				}).then(res => {
					console.log(res.message)
					this.detail = res.message
				})
			},
			getCurrent(e) {
				// console.log(e.detail.current)
				this.currentNum = e.detail.current + 1
			},
			addCart() {
				
					this.$store.commit('addCart',
						this.detail
					)
			},
			goCart(){
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			}



		},
		created() {

		},
		onLoad: function(option) {
			this.id = option.id
			console.log('id', this.id)
		},
		mounted() {
			this.getData()
		},
		computed: {
			...mapState(["cartGoods"]),
			picTotal() {
				if (this.detail.pics) {
					let total = this.detail.pics.length
					console.log(total)
					return total
				}

			}
		}

	}
</script>

<style lang="scss">
	.container {
		width: 100vw;

		.goodsInfo {
			width: 100%;

			.goodImg {
				.uni-padding-wrap {
					.page-section {
						.page-section-spacing {
							position: relative;

							.swiper {
								.swiperList {
									.swiper-item {
										.goodBigImg {}

									}
								}

							}

							.currentImg {
								position: absolute;
								right: 10px;
								bottom: 6px;
								z-index: 10;
								background-color: #AAAAAA;
								color: #fff;
								font-size: 12px;
								padding: 0 8px;
								border-radius: 8px;
							}
						}
					}
				}
			}

			.goodsText {
				.price {
					color: red;
				}

				.goodsintroduce {
					display: flex;
					align-items: center;

					.goods_name {
						flex: 1;
						font-size: 14px;
						line-height: 20px;
						height: 40px;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						padding: 10rpx 6px;
					}

					.line {
						height: 30px;
						width: 1px;
						background-color: #555;

					}

					.collect {
						width: 50px;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: column;

						.collect_icon {}

						.collect_text {
							font-size: 12px;
						}
					}
				}
			}

			.uni-common-mt {
				width: 100%;

				.goods_detail_title {
					height: 40px;
					line-height: 40px;
					font-size: 16px;
					color: red;
					text-align: center;
				}
			}
		}

		.buyBtns {
			display: flex;
			z-index: 20;
			width: 100%;
			background-color: #fff;
			height: 50px;
			position: fixed;
			bottom: 0;
			justify-content: space-between;
			align-items: center;
			padding-left: 2px;

			.custom_btn {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.btn_text {
					font-size: 12px;

				}
			}

			.rightBtn {
				width: 160px;
				height: 100%;
				display: flex;

				.addCart {
					background-color: #d9a140;
					height: 100%;
					width: 80px;
					color: #fff;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 14px;
				}

				.nowBuy {
					background-color: #e10000;
					color: #fff;
					height: 100%;
					width: 80px;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 14px;
					align-self: flex-end;
				}
			}


		}
	}
</style>
