pageCahe = function () {
	var Page = {};
	return {
		doPage: function (page,pagebody) {
			Page[page] = pagebody;
		}
	}
}();