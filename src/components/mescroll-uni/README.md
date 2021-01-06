方法				说明
@down		下拉刷新的回调
@up			上拉加载的回调
@init		组件初始化完成的回调

down 下拉刷新的配置参数
参数名			默认值				说明
textInOffset	'下拉刷新'		下拉的距离在offset范围内的提示文本
textOutOffset	'释放更新'		下拉的距离大于offset范围的提示文本
textLoading		'加载中 ...'		加载中的提示文本

up 上拉加载的配置参数
参数名			默认值					说明
page			{					num : 当前页码,默认0,回调之前加1,即callback(page)从1开始;
				  num : 0 ,			size : 每页数据的数量; 默认10
				  size : 10 ,
				}
textLoading		'加载中 ...'			上拉加载中的文本
textNoMore		'没有更多数据'		没有更多数据的提示文本