<template>
	<view class="container">
		<view class="flurBackground" :style="[{backgroundImage:'url(' + avator + ')' }]"> </view>
		<view class="avator">
			<view class="userInfo">
				<button class="sys_btn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">
					<image class="avator_img" :src="userInfo.avatarUrl" mode=""></image>
				</button>
				<view class="nickName" v-if="userInfo.nickName">
					{{userInfo.nickName}}
				</view>
			</view>

		</view>
		<ul class="collect_follow_nums">
			<li class='collect_follow_nums_item'>
				<text class="collect_follow_num">0</text>
				<text class="collect_follow_nums_item_text">收藏的店铺</text>
			</li>
			<li class='collect_follow_nums_item'>
				<text class="collect_follow_num">0</text>
				<text class="collect_follow_nums_item_text">收藏的商品</text>
			</li>
			<li class='collect_follow_nums_item'>
				<text class="collect_follow_num">1</text>
				<text class="collect_follow_nums_item_text">关注的商品</text>
			</li>
			<li class='collect_follow_nums_item'>
				<text class="collect_follow_num">0</text>
				<text class="collect_follow_nums_item_text">我的足迹</text>
			</li>
		</ul>
		<!-- 我的订单 -->
		<view class="order">
			<text class="order-title">我的订单</text>
			<ul class='orderList'>
				<li class='orderItem'>
					<uni-icons class="order_icon" type="star" size="20"></uni-icons><text>全部订单</text>
				</li>
				<li class='orderItem'>
					<uni-icons class="order_icon" type="star" size="20"></uni-icons><text>代付款</text>
				</li>
				<li class='orderItem'>
					<uni-icons class="order_icon" type="star" size="20"></uni-icons><text>待收货</text>
				</li>
				<li class='orderItem'>
					<uni-icons class="order_icon" type="star" size="20"></uni-icons><text>退款/退货</text>
				</li>
			</ul>
		</view>
		<!-- 收获地址 -->
		<view class="address">
			收获地址管理
		</view>
		<!--联系客服 -->
		<view class="contact_service">
				<text>联系客服</text>
				<text>17685874562</text>
		</view>
		<!-- 意见反馈 -->
		<view class="Feedback">
			意见反馈
		</view>
		<!-- 关于我们 -->
		<view class="about">
			关于我们
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: [],
				avator: ''
			}
		},
		methods: {
			appLoginWx() {
				var that = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res2) => {
									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => {
											console.log(res2);
											console.log(info);
											that.userInfo = info.userInfo
											that.avator = info.userInfo.avatarUrl
											uni.setStorage({
												key: 'userInfo',
												data: info.userInfo,
												success: function() {
													console.log('setStorage success');
												}
											});
											uni.request({
												url: 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin', //仅为示例，并非真实接口地址。
												data: {
													encryptedData: info.encryptedData,
													rawData: info.rawData,
													iv: info.iv,
													signature: info.signature,
													code: res2.code
												},
												success: (res) => {
													console.log(res);
												}
											});

										},
										fail: () => {
											uni.showToast({
												title: "微信登录授权失败",
												icon: "none"
											});
										}
									})

								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							})

						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
					}
				});
			}
		},
		created() {
			var that = this
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					console.log(res.data);
					that.userInfo = res.data
					that.avator = res.data.avatarUrl
				},
				fail() {
					that.appLoginWx()
				}
			});
		},
		mounted() {}

	}
</script>

<style lang="scss">
	.container {
		width: 100vw;
		background-color: #eee;
		z-index: -1;
		height: 100vh;
		.flurBackground {
			position: absolute;
			width: 100%;
			filter: blur(5rpx);
			height: 450rpx;
			z-index: 1;
		}

		.avator {
			height: 400rpx;
			width: 100%;
			position: relative;
			z-index: 10;

			.userInfo {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				.sys_btn {
					border: none;
					z-index: 5;
					background-color: transparent;
					width: 60px;
					height: 60px;
					border-radius: 50%;
					padding: 0;

					.avator_img {
						width: 100%;
						height: 100%;
					}
				}

				.sys_btn:after {
					border: none;
				}


				.nickName {
					z-index: 5;
					text-align: center;
					color: #fff;
					font-size: 26rpx;
					line-height: 50rpx;
				}
			}

		}

		.collect_follow_nums {
			width: 90vw;
			height: 40px;
			background-color: #fff;
			display: flex;
			margin: 0 auto;
			z-index: 11;
			position: relative;

			.collect_follow_nums_item {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.collect_follow_num {
					color: red;
				}

				.collect_follow_nums_item_text {
					font-size: 24rpx;
					line-height: 50rpx;
				}
			}
		}

		.order {
			width: 90vw;
			background-color: #fff;
			margin: 30rpx auto;
			z-index: 11;
			position: relative;

			.order-title {
				font-size: 30rpx;
				color: #444;
				line-height: 66rpx;
				padding-left: 20rpx;
			}

			.orderList {
				border-top: 1px solid #E5E5E5;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				padding: 10rpx 0;

				.orderItem {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.uni-icons {
						color: red !important;
					}

					text {
						font-size: 26rpx;
					}
				}
			}
		}

		.address {
			font-size: 30rpx;
			line-height: 66rpx;
			color: #444;
			padding-left: 10rpx;
			background-color: #fff;
			position: relative;
			width: 90vw;
			margin: 0 auto 30rpx auto;
			z-index: 11;
		}

		.contact_service {
			font-size: 30rpx;
			line-height: 66rpx;
			color: #444;
			background-color: #fff;
			position: relative;
			width: 90vw;
			margin: 0 auto;
			padding-left: 10rpx;
			z-index: 11;
			border-bottom: 1px solid #ccc;
			display: flex;
			justify-content: space-between;
			text{
				margin: 0 10rpx;
			}
		}

		.Feedback {
			font-size: 30rpx;
			line-height: 66rpx;
			color: #444;
			padding-left: 10rpx;
			background-color: #fff;
			position: relative;
			border-bottom: 1px solid #ccc;
			width: 90vw;
			margin: 0 auto;
			z-index: 11;
		}

		.about {
			font-size: 30rpx;
			line-height: 66rpx;
			color: #444;
			padding-left: 10rpx;
			background-color: #fff;
			position: relative;
			width: 90vw;
			margin: 0 auto 30rpx auto;
			border-bottom: 1px solid #ccc;
			z-index: 11;
		}

	}
</style>
