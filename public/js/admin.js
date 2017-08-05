/*
* @Author: yw850
* @Date:   2017-08-02 19:34:04
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-05 20:09:06
*/

'use strict';
$(function(){
	$('.del').click(function(e){
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