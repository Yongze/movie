/*
* @Author: yw850
* @Date:   2017-08-02 19:34:04
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-12 15:01:21
*/

'use strict';
$(function(){
	// loading icon
	$('.loading').click(function(e){
		var target = $(e.target)
		target.html('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> Del')
	})
	// movie delete
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
	// user delete
	$('.del-user').click(function(e){
		var target = $(e.target)
		var id = target.data('id')
		var role = target.data('role')
		var tr = $('.item-id-' + id)

		if (role <= 50) {
			window.location.href = '/signin?type=danger&msg=Permisstion deny, please login as a super admin.'
		}

		$.ajax({
			type: 'DELETE',
			url: '/admin/user/list?id=' + id
		}).done(function(result){
			if (result.success === 1) {
				if (tr.length > 0) {
					tr.remove()
				}
			}
		})
	})
	$('#douban').blur(function(){
		var douban = $(this)
		var id = douban.val()
		if (id) {
			$.ajax({
				url: 'https://api.douban.com/v2/movie/subject/' + id,
				cache: true,
				type: 'get',
				dataType: 'jsonp',
				crossDomain: true,
				jsonp: 'callback',
				success: function(data){
					$('#inputTitle').val(data.title)
					$('#inputDoctor').val(data.directors[0].name)
					$('#inputCountry').val(data.countries[0])
					$('#inputPoster').val(data.images.large)
					$('#inputYear').val(data.year)
					$('#inputSummary').val(data.summary)
				}
			})
		}
	})
})