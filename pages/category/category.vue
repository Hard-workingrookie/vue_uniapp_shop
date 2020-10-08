<template>
	<view class="category">
		<view class="searchBOX">
			<view class="searchIpt"  @click='goSearch'><text class="placeholder">请输入搜索内容</text> </view>
		</view>
		<!-- <uni-search-bar @confirm="search" @input="input" class="searchIpt" cancelButton='none' clearButton='none'></uni-search-bar> -->
		<view class="mian">

			<!-- 左侧菜单 -->
			<view class="menuBox">
				<view class="menu" v-for="(item,index) in categories" :key='item.cat_pid' @click="menuClick(index)">
					<text :class="index==currentIndex?'menu_name active':'menu'">{{item.cat_name}}</text>
				</view>
			</view>
			<!-- 右侧商品 -->
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y goods">
				<view class="goodList" v-for="childrenItem in rightMenuData.children" :key='childrenItem.cat_id'>
					<view class="goodsItem_title_wrap">
						<text class="goodsItem_title">{{childrenItem.cat_name}}</text>
					</view>
					<view class="goodsChildrenWrap">
						<view class="goodsChildren" v-for="item3 in childrenItem.children" :key='item3.cat_id'>
							<image class="goodsImg" :src="item3.cat_icon" mode="aspectFill"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>

	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categories: [],
				currentIndex: 0,
				rightMenuData: [],
				scrollTop: 0
			}
		},
		created() {
			uni.getStorage({
				key: 'cates',
				fail() {
					this.getCategories()
				}
			});
		},
		methods: {
			getCategories() {
					this.$request('categories', {}).then(res => {
							this.categories = res.message
							this.rightMenuData = res.message[0]
							uni.setStorage({
								key: 'cates',
								data: res.message,
							});
					})
			},
			menuClick(index) {
				this.currentIndex = index
				this.rightMenuData = this.categories[index]
				this.scrollTop = 0
			},
			goSearch(){
				uni.navigateTo({
				    url: '/pages/seach/seach'
				});
			}
		},
		created() {

		},
		mounted() {
			this.getCategories()
		}

	}
</script>

<style lang="scss">
	.category {
		.searchBOX{
			background-color: #fff;
			position: fixed;
			height: 10vh;
			z-index: 11;
			width: 100%;
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
			
		}
		
		.mian {
			padding-top: 10vh;
			display: flex;
			flex-direction: row;

			.menuBox {
				display: block;
				box-sizing: border-box;
				overflow-y: auto;
				height: 90vh;
				width: 20%;
				background-color: #f7f7f7;
				position: fixed;

				.menu {
					padding: 16rpx 0;
					text-align: center;
				}
				.active{
					color: $color-pri;
					border-bottom: 1px solid $color-pri;
				}
			}

			.goods {
				width: 80%;
				position: relative;
				left: 200rpx;


				.goodList {
					width: 100%;

					.goodsItem_title_wrap {
						width: 100%;

						.goodsItem_title {
							width: 100%;
							text-align: center;
						}
					}


					.goodsChildrenWrap {
						display: grid;
						grid-template-columns: 1fr 1fr 1fr;
						box-sizing: border-box;
						padding: 10px 10px;

						.goodsChildren {
							display: flex;
							flex-wrap: wrap;
							flex-direction: column;
							padding: 10rpx;

							.goodsImg {
								width: 50px;
								height: 50px;
							}
						}
					}

				}
			}
		}



	}
</style>
