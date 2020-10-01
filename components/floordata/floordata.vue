<template>
	<view class="floorWrap">
		<view class="floor_item" v-for="item in floordata" :key='item.floor_title.name'>
			<view class="floor_title">
				<image class="floor_title_img" :src="item.floor_title.image_src" mode="widthFix"></image>
			</view>
			<view class="product_list_wrap">
				<view class="product_list" v-for="(listItem,index) in item.product_list" :key='listItem.name+index' >
					<image class="product_list_img" :src="listItem.image_src"  v-if="index===0" mode='widthFix'></image>
					<image class="product_list_img" :src="listItem.image_src"  v-else mode='scaleToFill'></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				floordata: []
			};
		},
		created() {
			uni.request({
				url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
				success: (res) => {
					// console.log(res)
					this.floordata = res.data.message
				}
			});
		}

	}
</script>

<style lang="scss">
	.floorWrap {
		padding: 20rpx 16rpx;
		width: 100%;
		box-sizing: border-box;
		.floor_item {
			width: 100%;
			display: flex;
			flex-direction: column;
				
			.floor_title {
				width: 100%;
				height: 40px;
				margin: 10rpx 0;
				.floor_title_img {
					width: 250px;
					height: 40px;
				}
			}

			.product_list_wrap {
				.product_list {
					float: left;
					width: 33%;

					.product_list_img {
						width: 100%;
						height: 100%;
					}

				}
				.product_list:first-child{
					height:  33.33vw*386/232;
				}
				.product_list:nth-last-child(-n+4) {
					height: 33.33vw*386/232/2;
				}

			}

		}


	}
</style>
