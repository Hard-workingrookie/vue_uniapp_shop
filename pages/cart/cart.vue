<template>
	<view class="container">
		<view class="addAddress">
			<button class="add_Address_Btn clrBtn" type="default">添加收货地址</button>
		</view>
		<view class="cart">
			<view class="cart-title">
				购物车
			</view>
			<view class="cartList">
				<view class="cartItem" v-for="item in cartGoods" :key='item.goods_id'>
					<checkbox class="checkBtn" />
					<image class="goodsImg" :src="item.goods_small_logo" mode="widthFix" @click="goDetail(item.goods_id)"></image>
					<view class="goodsInfo">
						<view class="goodsName" @click="goDetail(item.goods_id)">
							{{item.goods_name}}
						</view>
						<view class="price_nums">
							<view class="price">
								￥ {{item.goods_price}}
							</view>
							<view class="nums">
								<button class="sub clrBtn" type="default" @click="subGood(item.goods_id)">-</button>
								<input class="uni-input" focus :placeholder="item.goods_number" />
								<button class='add clrBtn' type="default" @click="addGood(item.goods_id)">+</button>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 
			<view class="uni-list cartList">
				<checkbox-group @change="checkboxChange" cartItem>
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
						<view>
							<checkbox :value="item.value" :checked="item.checked" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</checkbox-group>
			</view> -->
			<view class="buyBox">
				<view class="allcheck">
					<label>
						<checkbox /><text>全选</text>
					</label>
				</view>
				<view class="buy">
					<view class="buyInfo">
						<text class="total">合计：￥{{totalPrice}}</text>
						<text class="freight">包含运费</text>
					</view>
					<button class="buyBtn clrBtn" type="default ">结算(1)</button>
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
				totalPrice: 0
			}
		},
		methods: {
			subGood(id) {
				this.$store.commit('subGood', id)
				this.$store.state.cartGoods.forEach((item, index, array) => {
					this.totalPrice -= item.goods_price * 1;
				})
			},
			addGood(id) {
				this.$store.commit('addGood', id)
				
				this.$store.state.cartGoods.forEach((item, index, array) => {
					this.totalPrice += item.goods_price * 1;
				})
			},
			goDetail(id) {
				uni.navigateTo({
					url: `/pages/detail/detail?id=${id}`
				})
			}
		},
		mounted() {
			this.$store.state.cartGoods.forEach((item, index, array) => {
				this.totalPrice += item.goods_price * item.goods_number;
			})
			
		},
		computed: {
			...mapState(["cartGoods"]),
		},
		created() {
		
		},


	}
</script>

<style lang="scss" scoped>
	.clrBtn {
		padding: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.clrBtn::after {
		border: none;
	}

	.container {
		width: 100vw;

		.addAddress {
			width: 100%;

			.add_Address_Btn {
				width: 260rpx;
				font-size: 26rpx;
				margin: 20rpx auto;
				background-color: #fff;
				border: 1px solid #0A7D7D;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.cart {
			width: 100%;

			.cart-title {
				width: 100%;
				line-height: 70rpx;
				font-size: 36rpx;
				color: #DD524D;
				border-top: 1px solid #DD524D;
				border-bottom: 1px solid #DD524D;
				padding-left: 20rpx;
				font-weight: 500;
			}

			.cartList {
				.cartItem {
					display: flex;
					flex-wrap: nowrap;
					// align-items: center;
					height: 250rpx;
					border-bottom: 1px solid #D3D3D3;
					padding: 20rpx;

					.checkBtn {
						margin: auto 0;
					}

					.goodsImg {
						width: 250rpx;
						height: 100%;
					}

					.goodsInfo {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						padding: 0 10rpx;

						.goodsName {
							height: 80rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
							line-height: 40rpx;
							font-size: 34rpx;
						}

						.price_nums {
							display: flex;
							justify-content: space-between;

							.price {
								color: red;
							}

							.nums {
								flex: 1;
								display: flex;
								flex-direction: row;

								.add {
									width: 50rpx;
									height: 60rpx;
									background-color: #fff;
									color: #555;
									font-size: 24rpx;
									border: 1px solid #ccc;
								}

								.sub {
									width: 50rpx;
									height: 60rpx;
									background-color: #fff;
									color: #555;
									font-size: 24rpx;
									border: 1px solid #ccc;
								}

								.uni-input {
									width: 80rpx;
									height: 50rpx;
									font-size: 28rpx;
									color: #555;
									text-align: center;
								}
							}
						}
					}
				}
			}

			.buyBox {
				display: flex;
				justify-content: space-between;
				position: fixed;
				bottom: 0;
				height: 100rpx;
				border-top: 1px solid #ccc;
				padding: 20rpx 0 0 20rpx;
				align-items: center;
				width: 100%;
				box-sizing: border-box;

				.allcheck {}

				.buy {
					display: flex;

					.buyInfo {
						flex: 1;
						display: flex;
						flex-direction: column;
						padding: 10rpx;

						.total {
							font-size: 28rpx;
						}

						.freight {
							font-size: 24rpx;
							text-align: right;
						}
					}

					.buyBtn {
						width: 100rpx;
						background-color: red;
						color: #fff;
						font-size: 28rpx;
						border-radius: 0;
					}
				}
			}
		}
	}
</style>
