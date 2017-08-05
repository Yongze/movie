/*
* @Author: yw850
* @Date:   2017-08-05 22:00:51
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-05 23:02:56
*/

'use strict';
$(function(){
	$('.comment').click(function(e){
		// e.target 和this的区别
		// e.target是具体点中的DOM
		// this 是带有class="del" 的DOM
		var target = $(this)
		var toId = target.data('tid')
		var commentId = target.data('cid')
		

		if ($('#toId').length > 0) {
			$('#toId').val(toId)
		}else{
			$('<input>').attr({
				type: 'hidden',
				id: 'toId',
				name: 'comment[tid]',
				value: toId
			}).appendTo('#commentForm')
		}


		if ($('#commentId').length > 0) {
			$('#commentId').val(commentId)
		}else{
			$('<input>').attr({
				type: 'hidden',
				id: 'commentId',
				name: 'comment[cid]',
				value: commentId
			}).appendTo('#commentForm')
		}

	})
})