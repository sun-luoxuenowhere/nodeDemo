window.onload = function() {
	// 初始化加载数据
	function initData(callback) {
		ajax({
			method: 'get',
			url: 'http://localhost:3000/books',
			success: function(data) {
				// debugger;
				console.log(data);
				callback(data);
			},
		});
	}
	var returnFunction = function(data) {
		// console.log(data);
		var html = template('renderTemp', { list: JSON.parse(data) });
		// console.log(html)
		var renderZone = document.querySelector('#renderZone');
		renderZone.innerHTML = html;
		// modifyBook();
		// console.log(deleteBtn);
		var deleteBtn = document.querySelectorAll('#renderZone a');
		// console.log(deleteBtn);
		deleteBtn.forEach(function(ele, index) {
			ele.onclick = function(event) {
				console.log(event.target.innerHTML);
				console.log(event.target.parentNode.parentNode.children[0].innerHTML);
				var id = event.target.parentNode.parentNode.children[0].innerHTML;
				if (event.target.innerHTML == '修改') {
					modifyBook(id);
				} else {
					deleteBook(id);
				}
			};
		});
	};
	initData(returnFunction);
	// 点击添加图书按钮事件
	var addBook = document.querySelector('#addBook');
	var form = document.querySelector('#addBookForm');
	var commitButton = document.querySelector('#commit');

	addBook.onclick = function() {
		var mark = new MarkBox(600, 400, '添加图书', form);
		mark.init();
		commitButton.onclick = function() {
			var transferData = {};
			// transferData.id = document.querySelectorAll('form input')[0].value;
			transferData.name = document.querySelectorAll('form input')[1].value;
			transferData.author = document.querySelectorAll('form input')[2].value;
			transferData.category = document.querySelectorAll('form input')[3].value;
			transferData.description = document.querySelectorAll('form input')[4].value;
			ajax({
				method: 'post',
				url: 'http://localhost:3000/books/book',
				data: transferData,
				success: function(data) {
					// console.log(data);
					var data = JSON.parse(data);
					if (data.flag == 0) {
						mark.close();
						initData(returnFunction);
					}
				},
			});
		};
	};
	// 点击修改按钮事件
	function modifyBook(id) {
		ajax({
			method: 'post',
			url: 'http://localhost:3000/books/modify',
			data: {
				id: id,
			},
			success: function(data) {
				console.log(typeof data);
				var form = document.querySelector('#addBookForm');
				var mark = new MarkBox(600, 400, '添加图书', form);
				mark.init();
				var data = JSON.parse(data);
				document.querySelectorAll('form input')[0].value = data[0].id;
				document.querySelectorAll('form input')[1].value = data[0].name;
				document.querySelectorAll('form input')[2].value = data[0].author;
				document.querySelectorAll('form input')[3].value = data[0].category;
				document.querySelectorAll('form input')[4].value = data[0].description;
				var commitBtn = document.querySelector('#commit');
				commitBtn.onclick = function() {
					var transferData = {};
					transferData.id = document.querySelectorAll('form input')[0].value;
					transferData.name = document.querySelectorAll('form input')[1].value;
					transferData.author = document.querySelectorAll('form input')[2].value;
					transferData.category = document.querySelectorAll('form input')[3].value;
					transferData.description = document.querySelectorAll('form input')[4].value;
					ajax({
						method: 'post',
						url: 'http://localhost:3000/books/modified',
						data: transferData,
						success: function(data) {
							console.log(data);
							mark.close();
							initData(returnFunction);
						},
					});
				};
			},
		});
	}
	// 点击删除按钮事件

	function deleteBook(id) {
		ajax({
			method: 'post',
			url: 'http://localhost:3000/books/books',
			data: {
				id: id,
			},
			success: function(data) {
				console.log(data);
				initData(returnFunction);
			},
		});
		// var deleteBtn = document.querySelectorAll('#renderZone a');
		// // console.log(deleteBtn);
		// deleteBtn.forEach(function (ele, index) {
		//     ele.onclick = function (event) {
		//         console.log(event.target.innerHTML)
		//         console.log(event.target.parentNode.parentNode.children[0].innerHTML)
		//         var id = event.target.parentNode.parentNode.children[0].innerHTML;
		//         if (event.target.innerHTML == '删除') {
		//             ajax({
		//                 method: 'post',
		//                 url: 'http://localhost:3000/books/books',
		//                 data: {
		//                     id: id
		//                 },
		//                 success: function (data) {
		//                     console.log(data)
		//                     initData();
		//                 }
		//             })

		//         }
		//     }
		// });
	}
};
