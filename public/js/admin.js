/*
* @Author: yw850
* @Date:   2017-08-02 19:34:04
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-05 22:40:55
*/

'use strict';
$(function(){
	$('.del').click(function(e){
		// e.target 和this的区别
		// e.target是具体点中的DOM
		// this 是带有class="del" 的DOM
		var target = $(e.target)
		var id = target.data('id')
		var tr = $('.item-id-' + id)


		$.ajax({
			type: 'DELETE',
			url: '/admin/movie/list?id=' + id
		}).done(function(result){
			if (result.success === 1) {
				if (tr.length > 0) {
					tr.remove()
				}
			}
		})
	})
})