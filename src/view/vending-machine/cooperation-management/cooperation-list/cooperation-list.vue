<template>
	<div>
		<Table border :columns="coopListColumns" :data="coopListData" size="small" class="coopListTableStyle">
			<!-- <template slot-scope="{ row }" slot="name">
	    <strong>{{ row.name }}</strong>
	</template> -->
			<template slot-scope="{ row, index }" slot="action">
				
				<div>
					<a href="javascript:void(0)" @click="handleModal">编辑</a>
				</div>
				<div>
					<a href="javascript:void(0)" @click="handleModal">启禁用</a>
				</div>
			</template>
		</Table>
	</div>
</template>

<script>
	import{ coopListColumns } from '@/data/columns.js'
	export default{
		data(){
			return{
				coopListColumns:coopListColumns,
				coopListData:[{}]
			}
		}
	}
</script>

<style>
</style>
