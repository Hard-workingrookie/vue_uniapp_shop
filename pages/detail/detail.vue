<template>
	<view class="container">

	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: [],
				id:''
			}
		},
		methods: {
			getData() {
				this.$request('goods/detail', {
					goods_id: id
				}).then(res => {
					// console.log(res.message)
					this.detail = res.message
				})
			}



		},
		created() {

		},
		onLoad: function(option) { 
			this.id=option.id
		},
		mounted() {
			this.getData()
		}

	}
</script>

<style lang="scss">
	.container {
		width: 100vw;
	}
</style>
