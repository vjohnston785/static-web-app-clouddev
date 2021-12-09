//The URIs of the REST endpoint
IUPS = "https://prod-39.eastus.logic.azure.com:443/workflows/fb68077763174080919a223e80bea2eb/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=N4AceG7itn78JjJVzfZp6XuB8uYjtvA999mTWWt4VIM";
RAI = "https://prod-33.eastus.logic.azure.com:443/workflows/dcafde77f925467b9ce7ff5f984a5b8d/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=YEvv7hUIMwIhgWfM9mFEwL--kSdAc009h44DrOaG3OA";
allcomments = "https://prod-17.eastus.logic.azure.com:443/workflows/51ad26c780dd4d6580edcf01bbc94ba2/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6bxgeu6HeVNBQY5Uj6ILAXW698plLbcHk18OwQem4DM";
createComments = "https://prod-64.eastus.logic.azure.com:443/workflows/8d6b756c70714e97b7ac3818ead90416/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=BeBLILEK9K-jQq8m5lXdxWowGviI3qZ5XwXWMmrcCM4";
BLOB_ACCOUNT = "https:// blobstorageimagesstatic.blob.core.windows.net";


//Handlers for button clicks
$(document).ready(function () {


	$("#retImages").click(function () {

		//Run the get asset list function
		getImages();

	});

	//Handler for the new asset submission button
	$("#subNewForm").click(function () {

		//Execute the submit new asset function
		submitNewAsset();

	});

	//Handler for the new asset submission button
	$("#subNewComment").click(function () {

		//Execute the submit new asset function
		submitNewComment();

	});
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset() {
	//Create a form data object
	submitData = new FormData();
	//Get form variables and append them to the form data object
	submitData.append('FileName', $('#FileName').val());
	submitData.append('userID', $('#userID').val());
	submitData.append('userName', $('#userName').val());
	submitData.append('File', $("#UpFile")[0].files[0]);

	//Post the form data to the endpoint, note the need to set the content type header
	$.ajax({
		url: IUPS,
		data: submitData,
		cache: false,
		enctype: 'multipart/form-data',
		contentType: false,
		processData: false,
		type: 'POST',
		success: function (data) {

		}
	});


}


//A function to submit a new asset to the REST endpoint 
function submitNewComment() {
	//Create a form data object
	submitData = new FormData();
	//Get form variables and append them to the form data object
	submitData.append('userName', $('#userName').val());
	submitData.append('comment', $("#comment").val());

	//Post the form data to the endpoint, note the need to set the content type header
	$.ajax({
		url: createComments,
		data: submitData,
		cache: false,
		enctype: 'multipart/form-data',
		contentType: false,
		processData: false,
		type: 'POST',
		success: function (data) {

		}
	});


}


//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages() {

	//Replace the current HTML in that div with a loading message
	$('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only">  </span>');
	$.getJSON(RAI, function (data) {
		//Create an array to hold all the retrieved assets
		var items = [];

		//Iterate through the returned records and build HTML, incorporating the key values of the record in the data
		$.each(data, function (key, val) {
			items.push("<hr />");
			items.push("<img src='" + BLOB_ACCOUNT + val["filePath"] + "' width='400'/> <br />")
			items.push("File : " + val["fileName"] + "<br />");
			items.push("Uploaded by: " + val["userName"] + "<br />");
			items.push("Comments " + val["comments"] + "<br />");
			items.push("<hr />");
		});
		//Clear the assetlist div
		$('#ImageList').empty();

		//Append the contents of the items array to the ImageList Div
		$("<ul/>", {
			"class": "my-new-list",
			html: items.join("")
		}).appendTo("#ImageList");
	});


}

