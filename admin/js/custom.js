'use strict';

// Browser with  Detection
navigator.sayswho= (function(){
    var N= navigator.appName, ua= navigator.userAgent, tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
    return M;
})();

// Some cleanup for stright forward use of values
var browser_version_string = String(navigator.sayswho), browser_version_arr = browser_version_string.split(","), browser_name = browser_version_arr[0], browser_version = parseInt(browser_version_arr[1]);


// Running a code based on some conditions
if(browser_name == "Chrome"){
	if(browser_version > 55){
  	// console.log("This is google chrome and current version is greater than 55");
  }else{
  	// Execute code here like showing notification
    $('body').pgNotification({message: "This site runs best on latest version of chrome & Firefox"}).show();data-action
  }
}

function setUserAuth(id, token, username){
	localStorage.setItem("userId", id);
	localStorage.setItem("userToken", token);
	localStorage.setItem("userName", username);
}


function getUserAuth(id, token){
	var uid = localStorage.getItem("userId");
	var utoken = localStorage.getItem("userToken");
	var uname = localStorage.getItem("userName");
	return {id: uid, token: utoken, name: uname};
}


// Set User Name in the Header
function setUserDisplayName(){
	var el = document.querySelector(".userDisplayName");
	if(el){
		el.innerText = getUserAuth().name;
	}
}

// For Multiselect Elements
// Current Implementation supports only single multiselect on a page at a time - Brands Edit Page - 
var valuesToSetBrandEdit = [], allValuesBrandEdit = [];

// L O G O U T   P A R T

function initLogout(e){
	e.preventDefault();
	$.ajax({
	url: "/api/admin/logout",
	type: "POST",
	data: {
		userid: getUserAuth().id,
		token_api: getUserAuth().token
	},
	success: function(result){
		if(result.success){
			$('body').pgNotification({message: "Log Out Succesful"}).show();
			setTimeout(function(){
				window.location.href = "/admin";
			},100);
		}else{
			$('body').pgNotification({message: result.result.message}).show();
			setTimeout(function(){
				window.location.href = "/admin";
			},100);
		}
	},
	error: function(xhr,status,error){
		console.log(xhr, status, error);
	}
});
}



// L O G I N   P A R T


function initLogin(){
// Get Values
var userName = document.querySelector("input[name='username']");
var userPass = document.querySelector("input[name='password']");

console.log(userName.value, userPass.value);
// Send to the server
$.ajax({
	url: "/api/admin/login",
	type: "POST",
	data: {
		email: userName.value,
		password: userPass.value
	},
	success: function(result){
		if(result.success){
			$('body').pgNotification({message: result.message}).show();
			setUserAuth(result.userid, result.token_api, result.username);
			setTimeout(function(){
				window.location.href = "/admin/dashboard.php";
			},1000);
		}else{
			$('body').pgNotification({message: result.message}).show();
		}
	},
	error: function(xhr,status,error){
		console.log(xhr, status, error);
	}
});


// Act according to response
}


// Event Handling
// Onclick

var submitBtn = document.querySelector("button[type='submit']");
if(submitBtn){
	submitBtn.onclick = function(e){
		e.preventDefault();
		initLogin();
	}
}



// G E T   S I N G L E  P R O D U C T   D A T A

var productData, productImagesData;

function getProductData(pid){
	var url = "/api/admin/product/viewproduct/" + pid + "?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
	// API request
	$.ajax({
		url: url,
		type: "GET",
		success: function(result){
				console.log(result);
				productData = result.productDetail;
				productImagesData = result;

				setTimeout(function(){
					populateProductData();
					renderProductImages();
				},100);

				// Show Images
				// Single Images
				var thumbnail = document.querySelector(".thumbnail-image img");
				thumbnail.setAttribute("src", result.thumbnailImages);

				// Banner Large
				var bLarge = document.querySelector(".banner-large-image img");
				bLarge.setAttribute("src", result.bannerLarge);
				bLarge.setAttribute("title", "Banner Large");

				// Banner Small
				var bSmall = document.querySelector(".banner-small-image img");
				bSmall.setAttribute("src", result.bannerSmall);
				bSmall.setAttribute("title", "Banner Small");

				var pCaraouselLarge = document.querySelector(".carousal-large");
				for (var i = 0; i < result.carouselLarge.length; i++){
					var nImg = document.createElement("IMG");
					nImg.setAttribute("src", result.carouselLarge[i]);
					pCaraouselLarge.appendChild(nImg);
				}
				var pCaraouselSmall = document.querySelector(".carousal-small");
				for (var i = 0; i < result.carouselSmall.length; i++){
					var nImg = document.createElement("IMG");
					nImg.setAttribute("src", result.carouselLarge[i]);
					pCaraouselSmall.appendChild(nImg);
				}
		},
		error: function(xhr,status,error){
			console.log(xhr, status, error);
		}
});

}



// G E T   B R A N D S    D A T A

var brandsData;

function getBrandsData(){
	var url = "/api/admin/brand/list?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
	// API request
	$.ajax({
		url: url,
		type: "GET",
		success: function(result){
			if(result.success){
				// $('body').pgNotification({message: result.result.message}).show();
				// console.log(result);
				brandsData = result.result.brandData;

				renderBrandsData(brandsData);
				
			}else{
				$('body').pgNotification({message: result.result.message}).show();
				if(result.result.message == "Session has timed out" || result.result.message == "Invalid session data"){
					window.location.href = "/admin";
				}
			}
		},
		error: function(xhr,status,error){
			console.log(xhr, status, error);
		}
});

}


function renderBrandsData(arr){
	var selectEl = document.querySelector("select[name='brand']");
	if(selectEl){
		selectEl.innerHTML = "";
		for (var i = 0; i < arr.length; i++) {
			var optionEl = document.createElement("OPTION");
			optionEl.value = arr[i].id;
			optionEl.innerText = arr[i].name;
			selectEl.appendChild(optionEl);
		}
	}
}

// D E L E T E   Row


var categoryIdToDelete;
var publishProduct = 0;

function initDelete(event){
  event.preventDefault();
  categoryIdToDelete = event.target.getAttribute("data-id");
  if(event.target.getAttribute("data-publish")){
    publishProduct = event.target.getAttribute("data-publish");
  }
  // showCModalContainer
  document.querySelector(".c-modal-container.delete").classList.remove("dn");
  document.querySelector(".c-modal-container.delete").onclick = function(ev){
    console.log(ev.target);
    if(ev.target.getAttribute("data-action") == "no"){
      document.querySelector(".c-modal-container.delete").classList.add("dn");
    }
  }
}

function deleteBlogPost(){
	var url = "/api/admin/blog/delete/" + categoryIdToDelete + "?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token; 
	  // API request
  $.ajax({
    url: url,
    type: "GET",
    success: function(result){
      // Todo : no success or message parameter coming in this API response
      if(result.success){
        $('body').pgNotification({message: result.result.message}).show();
        // console.log(result);
        document.querySelector(".c-modal-container.delete").classList.add("dn");
        //window.location.href = "/admin/categories-list.php";
        location.reload();

      }else{
        $('body').pgNotification({message: result.result.message}).show();
        if(result.result.message == "Session has timed out" || result.result.message == "Invalid session data"){
          window.location.href = "/admin";
        }
      }
    },
    error: function(xhr,status,error){
      console.log(xhr, status, error);
    }
  });
}

function deleteRow(){
  var url = deleteAPI + categoryIdToDelete + "?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
  if(deleteAPI.indexOf('product') > -1){
    url = url + "&view="+ publishProduct;
  }
  // API request
  $.ajax({
    url: url,
    type: "GET",
    success: function(result){
      // Todo : no success or message parameter coming in this API response
      if(result.success){
        $('body').pgNotification({message: result.result.message}).show();
        // console.log(result);
        document.querySelector(".c-modal-container.delete").classList.add("dn");
        //window.location.href = "/admin/categories-list.php";
        location.reload();

      }else{
        $('body').pgNotification({message: result.result.message}).show();
        if(result.result.message == "Session has timed out" || result.result.message == "Invalid session data"){
          window.location.href = "/admin";
        }
      }
    },
    error: function(xhr,status,error){
      console.log(xhr, status, error);
    }
  });

}



// G E T   S U B  C A T E G O R Y   D A T A

//Get Category Drop Down


var categoryList;

function getcategoryListData(){
  var url = "/api/admin/category/list?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
  // API request
  $.ajax({
    url: url,
    type: "GET",
    success: function(result){
      // Todo : no success or message parameter coming in this API response
      //if(result.success) {
        categoryList = result;
        renderCategory2(categoryList);
      //}
    },
    error: function(xhr,status,error){
      console.log(xhr, status, error);
    }
  });

}

function renderCategory2(arr){
  var selectEl = document.querySelector("select[name='category1']");
  if(selectEl){
    selectEl.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
       // var optionGroupEl = document.createElement("OPTGROUP");
       // optionGroupEl.setAttribute("label", arr[i].name);

       // for (var j = 0; j < arr[i].sub_categories.length; j++) {
       // arr[i].sub_categories[j];

       var optionEl = document.createElement("OPTION");
       optionEl.value = arr[i].id;
       optionEl.innerText = arr[i].name;
       selectEl.appendChild(optionEl);
       // }
       /*
       var optionGroupEl = document.createElement("OPTGROUP");
       optionGroupEl.setAttribute("label", arr[i].name);
       for(var j = 0; j < arr[i].sub_categories.length; j++){
       		var optionEl = document.createElement("OPTION");
	      optionEl.value = arr[i].sub_categories[j].id;
	      optionEl.innerText = arr[i].sub_categories[j].name;
	      optionGroupEl.appendChild(optionEl);
	      // selectEl.appendChild(optionEl);
       }
	   selectEl.appendChild(optionGroupEl);
	   */
    }
  }
}


//Get Sub Cat dropdown
var subCategoryData;

function getSubCategoryData(ele){
	var url = "/api/admin/category/list?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
	// var url = "/api/admin/subcategory/list?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
	// API request
	$.ajax({
		url: url,
		type: "GET",
		success: function(result){
			// Todo : no success or message parameter coming in this API response
			 if(result) {
         // $('body').pgNotification({message: result.result.message}).show();
         // console.log(result);
         // subCategoryData = result.result.subCategoryData;
         subCategoryData = result;

         renderCategory1(subCategoryData,ele);
       }
			// }else{
				// $('body').pgNotification({message: result.result.message}).show();
				// if(result.result.message == "Session has timed out" || result.result.message == "Invalid session data"){
					// window.location.href = "/admin";
				// }
			// }
		},
		error: function(xhr,status,error){
			console.log(xhr, status, error);
		}
});

}

function renderCategory1(arr,ele){
	var selectEl = document.querySelector("select[name='"+ ele +"']");
	if(selectEl){
		selectEl.innerHTML = "";
		for (var i = 0; i < arr.length; i++) {
			var optionGroupEl = document.createElement("OPTGROUP");
				optionGroupEl.setAttribute("label", arr[i].name);

			for (var j = 0; j < arr[i].sub_categories.length; j++) {
				arr[i].sub_categories[j];

				var optionEl = document.createElement("OPTION");
				optionEl.value = arr[i].sub_categories[j].id;
				optionEl.innerText = arr[i].sub_categories[j].name;
				optionGroupEl.appendChild(optionEl);
			}
     /* var optionEl = document.createElement("OPTION");
      optionEl.value = arr[i].name;
      optionEl.innerText = arr[i].name;*/
			// selectEl.appendChild(optionEl);
			selectEl.appendChild(optionGroupEl);
		}
	}
}


// G E T    C A T E G O R I E S

function getCategories() {
	var url = "/api/admin/category/list?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
	// API request
	$.ajax({
		url: url,
		type: "GET",
		success: function(result){
			// if(result.success){
				// $('body').pgNotification({message: result.result.message}).show();
				renderCategoryList(result);
			// }else{
				// $('body').pgNotification({message: result.result.message}).show();
				// if(result.result.message == "Session has timed out" || result.result.message == "Invalid session data"){
					// window.location.href = "/admin";
				// }
			// }
		},
		error: function(xhr,status,error){
			console.log(xhr, status, error);
		}
});

}

function renderCategoryList(arr){

	// Clear the productContainer
	var productsContainer = document.querySelector(".categoriesTable");
	productsContainer.innerHTML = "";
	// Append table header
	var headerTemplate = document.querySelector("template#tableHeader");
	var headerClone = document.importNode(headerTemplate.content, true);
	productsContainer.appendChild(headerClone);

	// loop throug array
	for (var i = 0; i < arr.length; i++) {
	
		// Get Template tag
		var template = document.querySelector("template#event"),
			pName = template.content.querySelector(".name"),
			pThumb = template.content.querySelector(".productThumb img"),
			pYear = template.content.querySelector(".link"),
			actionBtnGroupButton = template.content.querySelectorAll(".btn-group button"),
			actionBtnGroupButtonI = template.content.querySelectorAll(".btn-group button i"),
			actionBtnGroupA = template.content.querySelectorAll(".btn-group a");

		// Set values in template
			pName.innerText = arr[i].name;
			pYear.innerText = arr[i].link;
			actionBtnGroupA[0].setAttribute("href", "/admin/category-edit.php?pid=" + arr[i].id);
			actionBtnGroupButton[1].setAttribute("data-id", + arr[i].id);
			actionBtnGroupButtonI[1].setAttribute("data-id", + arr[i].id);

		var clone = document.importNode(template.content, true);
		// Append to DOM

		productsContainer.appendChild(clone);
	}

}

// G E T  Sub  C A T E G O R I E S

function getSubCategories() {
  var url = "/api/admin/subcategory/list?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
  // API request
  $.ajax({
    url: url,
    type: "GET",
    success: function(result){
      // if(result.success){
      // $('body').pgNotification({message: result.result.message}).show();
      renderSubCategoryList(result);
      // }else{
      // $('body').pgNotification({message: result.result.message}).show();
      // if(result.result.message == "Session has timed out" || result.result.message == "Invalid session data"){
      // window.location.href = "/admin";
      // }
      // }
    },
    error: function(xhr,status,error){
      console.log(xhr, status, error);
    }
  });

}

function renderSubCategoryList(result){
  if(!result.success){
    return;
  }
  var arr= result.result.subCategoryData;
  // Clear the productContainer
  var productsContainer = document.querySelector(".subCategoriesTable");
  productsContainer.innerHTML = "";
  // Append table header
  var headerTemplate = document.querySelector("template#tableHeader");
  var headerClone = document.importNode(headerTemplate.content, true);
  productsContainer.appendChild(headerClone);

  // loop throug array
  for (var i = 0; i < arr.length; i++) {

    // Get Template tag
    var template = document.querySelector("template#event"),
      pName = template.content.querySelector(".name"),
      pThumb = template.content.querySelector(".productThumb img"),
      pYear = template.content.querySelector(".link"),
      parentCategory = template.content.querySelector(".parentCategory"),
      actionBtnGroupButton = template.content.querySelectorAll(".btn-group button"),
      actionBtnGroupButtonI = template.content.querySelectorAll(".btn-group button i"),
      actionBtnGroupA = template.content.querySelectorAll(".btn-group a");

    // Set values in template
    pName.innerText = arr[i].name;
    pYear.innerText = arr[i].link;
    parentCategory.innerText = arr[i].category.name;
    actionBtnGroupA[0].setAttribute("href", "/admin/subcategory-edit.php?pid=" + arr[i].id);
    actionBtnGroupButton[1].setAttribute("data-id", + arr[i].id);
    actionBtnGroupButtonI[1].setAttribute("data-id", + arr[i].id);

    var clone = document.importNode(template.content, true);
    // Append to DOM

    productsContainer.appendChild(clone);
  }

}


// G E T    E V E N T S

function getEvents() {
	var url = "/api/admin/event/list?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
	// API request
	$.ajax({
		url: url,
		type: "GET",
		success: function(result){
			if(result.success){
				// $('body').pgNotification({message: result.result.message}).show();
				renderEventList(result.result.eventList);
			}else{
				$('body').pgNotification({message: result.result.message}).show();
				if(result.result.message == "Session has timed out" || result.result.message == "Invalid session data"){
					window.location.href = "/admin";
				}
			}
		},
		error: function(xhr,status,error){
			console.log(xhr, status, error);
		}
});

}

function renderEventList(arr){

	// Clear the productContainer
	var productsContainer = document.querySelector(".eventsTable");
	productsContainer.innerHTML = "";
	// Append table header
	var headerTemplate = document.querySelector("template#tableHeader");
	var headerClone = document.importNode(headerTemplate.content, true);
	productsContainer.appendChild(headerClone);

	// loop throug array
	for (var i = 0; i < arr.length; i++) {
	
		// Get Template tag
		var template = document.querySelector("template#event"),
			pName = template.content.querySelector(".title"),
			pThumb = template.content.querySelector(".productThumb img"),
			pYear = template.content.querySelector(".year"),
			actionBtnGroupButton = template.content.querySelectorAll(".btn-group button"),
			actionBtnGroupButtonI = template.content.querySelectorAll(".btn-group button i"),
			actionBtnGroupA = template.content.querySelectorAll(".btn-group a");

		// Set values in template
			pName.innerText = arr[i].title;
			pYear.innerText = arr[i].year;
			actionBtnGroupA[0].setAttribute("href", "/admin/event-edit.php?pid=" + arr[i].id);
			actionBtnGroupButton[1].setAttribute("data-id", + arr[i].id);
			actionBtnGroupButtonI[1].setAttribute("data-id", + arr[i].id);

		var clone = document.importNode(template.content, true);
		// Append to DOM

		productsContainer.appendChild(clone);
	}

}


// G E T    B L O G S

function getBlogs() {
	var url = "/api/admin/blog/list?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
	// API request
	$.ajax({
		url: url,
		type: "GET",
		success: function(result){
			console.log("blogs list data --- ", result);
			if(result.success){
				// $('body').pgNotification({message: result.result.message}).show();
				renderBlogList(result.result.blogData);
			}else{
				$('body').pgNotification({message: result.result.message}).show();
				if(result.result.message == "Session has timed out" || result.result.message == "Invalid session data"){
					window.location.href = "/admin";
				}
			}
		},
		error: function(xhr,status,error){
			console.log(xhr, status, error);
		}
});

}

function renderBlogList(arr){

	// Clear the productContainer
	var blogsContainer = document.querySelector(".blogsTable");
	blogsContainer.innerHTML = "";
	// Append table header
	var headerTemplate = document.querySelector("template#tableHeader");
	var headerClone = document.importNode(headerTemplate.content, true);
	blogsContainer.appendChild(headerClone);

	// loop throug array
	for (var i = 0; i < arr.length; i++) {
	
		// Get Template tag
		var template = document.querySelector("template#blog"),
			pName = template.content.querySelector(".title"),
			pThumb = template.content.querySelector(".productThumb img"),
			pYear = template.content.querySelector(".year"),
			actionBtnGroupButton = template.content.querySelectorAll(".btn-group button"),
			actionBtnGroupButtonI = template.content.querySelectorAll(".btn-group button i"),
			actionBtnGroupA = template.content.querySelectorAll(".btn-group a");

		// Set values in template
			pName.innerText = arr[i].title;
			pYear.innerText = arr[i].credits;
			actionBtnGroupA[0].setAttribute("href", "/admin/blog-edit.php?pid=" + arr[i].id);
			actionBtnGroupButton[1].setAttribute("data-id", + arr[i].id);
			actionBtnGroupButtonI[1].setAttribute("data-id", + arr[i].id);

		var clone = document.importNode(template.content, true);
		// Append to DOM

		blogsContainer.appendChild(clone);
	}

}

// G E T    P R O D U C T S

function getProducts() {
	var url = "/api/admin/product/list?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
	// API request
	$.ajax({
		url: url,
		type: "GET",
		success: function(result){
			if(result.success){
				// $('body').pgNotification({message: result.result.message}).show();
				renderProductList(result.result);
			}else{
				$('body').pgNotification({message: result.result.message}).show();
				if(result.result.message == "Session has timed out" || result.result.message == "Invalid session data"){
					window.location.href = "/admin";
				}
			}
		},
		error: function(xhr,status,error){
			console.log(xhr, status, error);
		}
});

}

function renderProductList(arr){

	// Clear the productContainer
	var productsContainer = document.querySelector(".productsTable");
	productsContainer.innerHTML = "";
	// Append table header
	var headerTemplate = document.querySelector("template#tableHeader");
	var headerClone = document.importNode(headerTemplate.content, true);
	productsContainer.appendChild(headerClone);

	// loop throug array
	for (var i = 0; i < arr.productDetail.length; i++) {
	
		// Get Template tag
		var template = document.querySelector("template#product"),
			pName = template.content.querySelector(".productName"),
			pThumb = template.content.querySelector(".productThumb img"),
			pCategory = template.content.querySelector(".productCategory"),
			pSubCategory = template.content.querySelector(".subcategory"),
			pBrand = template.content.querySelector(".brand"),
			pGender = template.content.querySelector(".gender"),
			pAge = template.content.querySelector(".age"),
			pPrice = template.content.querySelector(".productPrice"),
			actionBtnGroupButton = template.content.querySelectorAll(".btn-group button"),
			actionBtnGroupButtonI = template.content.querySelectorAll(".btn-group button i"),
			actionBtnGroupA = template.content.querySelectorAll(".btn-group a"),
      actionIconPublish = template.content.querySelectorAll(".publish i");

		// Set values in template
			pName.innerText = arr.productDetail[i].product_name;
			pPrice.innerHTML = "&#x20B9; " + arr.productDetail[i].price;
      if(arr.productDetail[i].published == 0){
        template.content.querySelector("tr").className = "unPublished";
        actionIconPublish[0].className = "fa fa-eye-slash";
        actionBtnGroupButton[1].setAttribute("data-publish", + 1);
        actionBtnGroupButtonI[1].setAttribute("data-publish", + 1);
      }else{
        template.content.querySelector("tr").className = "published";
        actionIconPublish[0].className = "fa fa-eye";
        actionBtnGroupButton[1].setAttribute("data-publish", + 0);
        actionBtnGroupButtonI[1].setAttribute("data-publish", + 0);
      }
    //publish
			if(arr.productDetail[i].category_one != null){
				// pCategory.innerText = arr.productDetail[i].subcategory.category.name;
				// pCategory.innerText = arr.productDetail[i].category_one.category.name;
			}
			if(arr.productDetail[i].brand != null){
				pBrand.innerText = arr.productDetail[i].brand.name;
			}
			if(arr.productDetail[i].subcategory != null){
				pCategory.innerText = arr.productDetail[i].subcategory.category.name;
				pSubCategory.innerText = arr.productDetail[i].subcategory.name;
			}
			pAge.innerText = arr.productDetail[i].age;
			pGender.innerHTML = arr.productDetail[i].gender;
			// console.log(Object.values(arr.thumbnailImages[i])[0]);
			// if(Object.values(arr.thumbnailImages[i])[0]){
			// 	pThumb.setAttribute("src", Object.values(arr.thumbnailImages[i])[0]);	
			// }
			actionBtnGroupA[0].setAttribute("href", "/admin/product-edit.php?pid=" + arr.productDetail[i].id);
			actionBtnGroupButton[1].setAttribute("data-id", + arr.productDetail[i].id);
			actionBtnGroupButtonI[1].setAttribute("data-id", + arr.productDetail[i].id);

		var clone = document.importNode(template.content, true);
		// Append to DOM

		productsContainer.appendChild(clone);

	}

}


function setIdTokenProductAddEdit(){
	var idE = document.querySelector("input[name='userid']");
	var tokenE = document.querySelector("input[name='token_api']");
	if(idE && tokenE){
		idE.value = getUserAuth().id;
		tokenE.value = getUserAuth().token;
	}
}


function submitForm(url,redirectTo) {
  if ($('#editForm').valid()) {
    document.getElementById("loading").style.display="block";
    var data =new FormData($('#editForm')[0]);// $('#editForm').serialize();//
    $.ajax({
      url: url,
      data: data,
      type: "POST",
      dataType: "json",
      contentType: false,
      processData: false,
      success: function (result) {
        document.getElementById("loading").style.display="none";
        if (result.success) {
          $('body').pgNotification({message: result.result.message}).show();
          //window.location.href = redirectTo;
          setTimeout(function () {
            console.log(redirectTo);
            window.location.href = redirectTo;
          }, 1000,redirectTo);
        } else {
          $('body').pgNotification({message: result.result.message}).show();
          if (result.result.message == "Session has timed out" || result.result.message == "Invalid session data") {
            window.location.href = "/admin";
          }
        }
      },
      error: function (xhr, status, error) {
        document.getElementById("loading").style.display="none";
        console.log(xhr, status, error);
      }
    });
  }
}

function getProductId(){
	if(window.location.href.includes("pid=")){
		var string = window.location.href.split('pid=');
		var pid = string[string.length-1];
		return pid;
	}
}

function populateProductData(){
	for (var i = 0; i < Object.keys(productData).length; i++) {
		var se = "[name='" + Object.keys(productData)[i] +"']";
		var cEl = document.querySelector(se);
		if(cEl){
			// console.log(cEl);
			if(Object.keys(productData)[i] == "brand"){
				if(productData.brand != null){
					cEl.value = productData.brand.id;
				}
			}else{
				cEl.value = Object.values(productData)[i];
			}
		}
	}
	$("select").select2();
}

function renderProductImages(){
	// Banner Large
	//document.querySelector(".banner-large-image img").setAttribute("src", productImagesData.bannerLarge);
	// Banner Small
	//document.querySelector(".banner-small-image img").setAttribute("src", productImagesData.bannerSmall);
	// Thumbnail
	document.querySelector(".thumbnail-image img").setAttribute("src", productImagesData.thumbnailImages);
	// Carousel Large
	// Carousel Small
}

// dataRenderer to improve sloppy things
function dataRenderer(result, forWhatPage){
	// blog edit
	if(forWhatPage == "blogEdit"){
		var arr = result.result.blogData;
		for(var i = 0; i < Object.keys(arr).length; i++){
			var selector = "[name='" + Object.keys(arr)[i] +"']";
			var el = document.querySelector(selector);
			console.log(el);
			if(el){
				el.value = Object.values(arr)[i];
			}else{
				if(Object.keys(arr)[i] == "imgSrcLg"){
					document.querySelector(".bannerLargePreview").setAttribute("src", Object.values(arr)[i]);
					document.querySelector("#imgSrcLg_cu").innerText = Object.values(arr)[i];
				}
				if(Object.keys(arr)[i] == "imgSrcSm"){
					document.querySelector(".bannerSmallPreview").setAttribute("src", Object.values(arr)[i]);
					document.querySelector("#imgSrcSm_cu").innerText = Object.values(arr)[i];

				}
			}
		}
		initWysiwyg();
		initSelect();
	}
}

// Get Single Blog Data
function callApi(endpoint){
	var url = endpoint + "?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
	// API request
	$.ajax({
		url: url,
		type: "GET",
		success: function(result){
			console.log("blogs single post data --- ", result);
			if(result.success){
				// $('body').pgNotification({message: result.result.message}).show();
				dataRenderer(result, "blogEdit");
			}else{
				$('body').pgNotification({message: result.result.message}).show();
				if(result.result.message == "Session has timed out" || result.result.message == "Invalid session data"){
					window.location.href = "/admin";
				}
			}
		},
		error: function(xhr,status,error){
			console.log(xhr, status, error);
		}
});
}

function initWysiwyg(){
	// var editor = new MediumEditor('.m-edit');
	CKEDITOR.replace( 'ckedit' );
	CKEDITOR.instances.ckedit.on('change', function() { 
    document.querySelector("#ckedit").value = CKEDITOR.instances.ckedit.getData();
});
}


window.onload = function(){

	if(!document.body.classList.contains("loginPage")){
		setUserDisplayName();
		getBrandsData();
		getSubCategoryData("subcategory_id");
    getcategoryListData();


		// Call product list
				var productsTable = document.querySelector(".productsTable");
				if(productsTable){
					setTimeout(function(){
						getProducts();
					},1000);
				}
	// Call Events list
				var eventsTable = document.querySelector(".eventsTable");
				if(eventsTable){
					setTimeout(function(){
						getEvents();
					},1000);
				}
	// Call Blogs list
				var blogsTable = document.querySelector(".blogsTable");
				if(blogsTable){
					setTimeout(function(){
						getBlogs();
					},1000);
				}
	// Call Cateories list
				var categoriesTable = document.querySelector(".categoriesTable");
				if(categoriesTable){
					setTimeout(function(){
						getCategories();
					},1000);
				}

    // Call Cateories list
    var brandsTable = document.querySelector(".brandsTable");
    if(brandsTable){
      setTimeout(function(){
        getBrandListPage('/api/admin/brand/list');
      },1000);
    }

    // Call Sub Cateories list
    var subCategoriesTable = document.querySelector(".subCategoriesTable");
    if(subCategoriesTable){
      setTimeout(function(){
        getSubCategories();
      },1000);
    }

	}

	setIdTokenProductAddEdit();
  if(window.location.href.includes("admin/brand-add")) {
    getCategoryDataForBrand("Subcategory_id",-1);
  }


    if(window.location.href.includes("admin/blog-add")) {
      initWysiwyg();
    }


	if(window.location.href.includes("pid=")){
		var string = window.location.href.split('pid=');
		var pid = string[string.length-1];
		var idE = document.querySelector("input[name='productid']");
		var eIdE = document.querySelector("input[name='id']");

		if(idE){
			idE.value = pid;
		}
		if (eIdE) {
			eIdE.value = pid;
		}

		// Todo run based on the current page
		// These functions below are getting the data for product, event, category that is currently being edited on the edit page and populating the form elements with the rceived values
		// Each of these 3 funtions are for different page
		// parameter pid is the id i'm grabing from the url parameter 

		// getProductData(pid);
		// getEventData(pid);
	



    if(window.location.href.includes("admin/category-edit")) {
      getViewData("/api/admin/category/view/",pid,"categoryData");
    }
    if(window.location.href.includes("admin/subcategory-edit")) {
      getViewData("/api/admin/subcategory/view/",pid,"subCategoryData");
    }
    if(window.location.href.includes("admin/product-edit")) {
      getProductData(pid);
    }
    if(window.location.href.includes("admin/event-edit")) {
      getViewData("/api/admin/event/view/",pid,"eventData");
    }
    if(window.location.href.includes("admin/brand-edit")) {
      getCategoryDataForBrand("Subcategory_id",pid);
    }
    if(window.location.href.includes("admin/blog-edit")) {
      callApi("/api/admin/blog/view/" + pid);
    }

	}

  jQuery.validator.addMethod("relURL", function(value, element) {
    // allow any non-whitespace characters as the host part
    return /^[a-zA-Z0-9\/_-]+$/.test( value );
  }, 'Please enter a valid URL');
  if($("#editForm").length > 0) {
    $("#editForm").validate({
    rules: {
      "link": {
        required: true,
        relURL: true
      },
      "ord": {
        required: true,
        number: true
      }
    },
    messages: {
      "link": {
        required: "You must enter a Link",
        relURL: "Must be a valid URL"
      },
      "ord": {
        required: "You must enter an Order",
        number: "Only Numbers allowed"
      }
    }
  });
  }


initSelect();

}



	// Initializing dropzone functions. - products image uploader

	if(typeof Dropzone != "undefined"){
	console.log("its running");
	Dropzone.options.thumb = {
	  //paramName: "file", // The name that will be used to transfer the file
	  params:{
	  	id: getProductId(),
	  	uploadTo: "thumbnail",
	  	userid: getUserAuth().id,
	  	token_api: getUserAuth().token
		}
	};

	Dropzone.options.bannerLarge = {
	  //paramName: "file", // The name that will be used to transfer the file
	  params:{
	  	id: getProductId(),
	  	uploadTo: "banner_large",
	  	userid: getUserAuth().id,
	  	token_api: getUserAuth().token
		}
	};


	Dropzone.options.bannerSmall = {
	  //paramName: "file", // The name that will be used to transfer the file
	  params:{
	  	id: getProductId(),
	  	uploadTo: "banner_small",
	  	userid: getUserAuth().id,
	  	token_api: getUserAuth().token
		}
	};

	Dropzone.options.carouselLarge = {
	  //paramName: "file", // The name that will be used to transfer the file
	  params:{
	  	id: getProductId(),
	  	uploadTo: "carousel_large",
	  	userid: getUserAuth().id,
	  	token_api: getUserAuth().token
		}
	};


	Dropzone.options.carouselSmall = {
	  //paramName: "file", // The name that will be used to transfer the file
	  params:{
	  	id: getProductId(),
	  	uploadTo: "carousel_small",
	  	userid: getUserAuth().id,
	  	token_api: getUserAuth().token
		}
	};


	}


// Render Associated Subcategories List - Brand Edit Page
function renderAssociatedSubcategoriesList(data){
var tableContainer = document.querySelector(".subCategoriesListTable");
for (var i = 0; i < data.sub_category.length; i++) {

	 // Get Template tag
    var template = document.querySelector("template#subCategorySet"),
      pName = template.content.querySelector(".name"),
    //pThumb = template.content.querySelector(".productThumb img"),
      bannerLargeInput = template.content.querySelector(".bannerLarge input"),
      bannerLarge = template.content.querySelector(".bannerLarge img"),
      bannerSmallInput = template.content.querySelector(".bannerSmall input"),
      bannerSmall = template.content.querySelector(".bannerSmall img");

    // Set values in template
    pName.innerText = data.sub_category[i].name;
    bannerLargeInput.setAttribute("data-brand-id", data.sub_category[i].pivot.brand_id);
    bannerSmallInput.setAttribute("data-brand-id", data.sub_category[i].pivot.brand_id);
    bannerLargeInput.setAttribute("data-subCat-id", data.sub_category[i].pivot.subcategory_id);
    bannerSmallInput.setAttribute("data-subCat-id", data.sub_category[i].pivot.subcategory_id);
    bannerLarge.setAttribute("src", data.sub_category[i].pivot.bannerImgLrg);
    bannerSmall.setAttribute("src", data.sub_category[i].pivot.bannerImgSm);
    

    var clone = document.importNode(template.content, true);
    // Append to DOM

    tableContainer.appendChild(clone);
  }

  for(var i = 0; i < data.sub_category.length; i++){
        		valuesToSetBrandEdit.push(data.sub_category[i].id);
        	}

        	document.querySelector("#setHere").value = valuesToSetBrandEdit.toString();
        	$('#Subcategory_id').val(valuesToSetBrandEdit);
					$('#Subcategory_id').trigger('change');

}

// G E T   EDIT  D A T A

var viewData;

function getViewData(api,pid,dataKey){//"/api/admin/brand/view/"
  var url =api + pid + "?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
  // API request
  $.ajax({
    url: url,
    type: "GET",
    success: function(result){
    	console.log(result);
      if(result.success){
        viewData = result.result[dataKey]; //.brandData;
        populateViewData(viewData);
        if(dataKey == "brandData"){
        	//  render associated subcategories list
        	renderAssociatedSubcategoriesList(viewData);
        	// subcategories set
        	console.log("SubCategoryArr", viewData.sub_category);
        	
/*
        	// Banner Large
			var bLarge = document.querySelector(".banner-large-image img");
			bLarge.setAttribute("src", result.result.brandData.bannerImgLrg);
			bLarge.setAttribute("title", "Banner Large");

			// Banner Small
			var bSmall = document.querySelector(".banner-small-image img");
			bSmall.setAttribute("src", result.result.brandData.bannerImgSm);
			bSmall.setAttribute("title", "Banner Small");*/
        }
        if(dataKey == "categoryData"){
        	if(result.result.categoryData != null){
        		// Banner Large
        		var bLarge = document.querySelector(".banner-large-image img");
				bLarge.setAttribute("src", result.result.categoryData.bannerImgLrg);
				bLarge.setAttribute("title", "Banner Large");

				// Banner Small
				var bSmall = document.querySelector(".banner-small-image img");
				bSmall.setAttribute("src", result.result.categoryData.bannerImgSm);
				bSmall.setAttribute("title", "Banner Small");

				// Video Buttons
				if(result.result.categoryData.videoLinkMp4 != ""){
					var videoMp4 = document.querySelector(".mp4");
					videoMp4.classList.remove("dn");
					videoMp4.setAttribute("href", result.result.categoryData.videoLinkMp4);
					videoMp4.innerHTML = "Download - Mp4";
				}else{
					document.querySelector(".mp4").classList.add("dn");
				}

				// Video Buttons
				if(result.result.categoryData.videoLinkWebM != ""){
					var videoWebM = document.querySelector(".webm");
					videoWebM.classList.remove("dn");
					videoWebM.setAttribute("href", result.result.categoryData.videoLinkWebM);
					videoWebM.innerHTML = "Download - WebM";
				}else{
					document.querySelector(".webm").classList.add("dn");
				}
        	}
				
        }
        if(dataKey == "subCategoryData"){
        	// Silhouette
        	var silhouette = document.querySelector(".silhouette-image img");
				silhouette.setAttribute("src", result.result.subCategoryData.img.substr(1));
				silhouette.setAttribute("title", "Silhouette");

        	// Banner Large
				var bLarge = document.querySelector(".banner-large-image img");
				bLarge.setAttribute("src", result.result.subCategoryData.bannerImgLrg);
				bLarge.setAttribute("title", "Banner Large");

				// Banner Small
				var bSmall = document.querySelector(".banner-small-image img");
				bSmall.setAttribute("src", result.result.subCategoryData.bannerImgSm);
				bSmall.setAttribute("title", "Banner Small");

				// Video Buttons
				if(result.result.subCategoryData.videoLinkMp4 != ""){
					var videoMp4 = document.querySelector(".mp4");
					videoMp4.classList.remove("dn");
					// var videoMp4 = document.querySelector(".VideoLinks .mp4");
					videoMp4.setAttribute("href", result.result.subCategoryData.videoLinkMp4);
					videoMp4.innerHTML = "Download - Mp4";
				}else{
					document.querySelector(".mp4").classList.add("dn");
				}

				// Video Buttons
				if(result.result.subCategoryData.videoLinkWebM != ""){
					var videoWebM = document.querySelector(".webm");
					videoWebM.classList.remove("dn");
					// var videoWebM = document.querySelector(".VideoLinks .webm");
					videoWebM.setAttribute("href", result.result.subCategoryData.videoLinkWebM);
					videoWebM.innerHTML = "Download - WebM";
				}else{
					document.querySelector(".webm").classList.add("dn");
				}
        }
      }else{
        $('body').pgNotification({message: result.result.message}).show();
        if(result.result.message == "Session has timed out" || result.result.message == "Invalid session data"){
          window.location.href = "/admin";
        }
      }
    },
    error: function(xhr,status,error){
      console.log(xhr, status, error);
    }
  });
}
function populateViewData(arr){
	if(arr != null){
		// SET BANNER IMAGES PREVIEW - Brand Edit Page
		var bannerSmallPreview = document.querySelector(".bannerSmallPreview"),
		    bannerLargePreview = document.querySelector(".bannerLargePreview");
		      	if(bannerSmallPreview && bannerLargePreview){
		      		bannerSmallPreview.setAttribute("src", arr.imgSrcSm);
		      		bannerLargePreview.setAttribute("src", arr.imgSrcLg);
		      	}

		  for (var i = 0; i < Object.keys(arr).length; i++) {
		    var se = "[name='" + Object.keys(arr)[i] +"']";
		    var cEl = document.querySelector(se);
		    if(cEl){
		      if(Object.keys(arr)[i] == "imgSrcSm" || Object.keys(arr)[i] == "imgSrcLg" || cEl.type == "file"){
		        var existingFile = document.getElementById(Object.keys(arr)[i]+"_cu");
		        if(existingFile){
		          existingFile.innerHTML= Object.values(arr)[i];
		        }
		      }else{
		        cEl.value = Object.values(arr)[i];
		        // console.log(cEl, Object.values(arr)[i]);
		      }
		    }
		  }
		initSelect();
	}
}

// G E T    List Page

function getBrandListPage(api) {// /api/admin/brand/list
  var url = api + "?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
  // API request
  $.ajax({
    url: url,
    type: "GET",
    success: function(result){
       if(result.success){
      renderBrandListTable(result);
       }else{
       $('body').pgNotification({message: result.result.message}).show();
       if(result.result.message == "Session has timed out" || result.result.message == "Invalid session data"){
       window.location.href = "/admin";
       }
       }
    },
    error: function(xhr,status,error){
      console.log(xhr, status, error);
    }
  });

}

function renderBrandListTable(result){
var arr = result.result.brandData;
  // Clear the productContainer
  var productsContainer = document.querySelector(".brandsTable");
  productsContainer.innerHTML = "";
  // Append table header
  var headerTemplate = document.querySelector("template#tableHeader");
  var headerClone = document.importNode(headerTemplate.content, true);
  productsContainer.appendChild(headerClone);

  for (var i = 0; i < arr.length; i++) {

    // Get Template tag
    var template = document.querySelector("template#event"),
      pName = template.content.querySelector(".name"),
    //pThumb = template.content.querySelector(".productThumb img"),
      pYear = template.content.querySelector(".link"),
      actionBtnGroupButton = template.content.querySelectorAll(".btn-group button"),
      actionBtnGroupButtonI = template.content.querySelectorAll(".btn-group button i"),
      actionBtnGroupA = template.content.querySelectorAll(".btn-group a");

    // Set values in template
    pName.innerText = arr[i].name;
    pYear.innerText = arr[i].link;
    actionBtnGroupA[0].setAttribute("href", "/admin/brand-edit.php?pid=" + arr[i].id);
    actionBtnGroupButton[1].setAttribute("data-id", + arr[i].id);
    actionBtnGroupButtonI[1].setAttribute("data-id", + arr[i].id);

    var clone = document.importNode(template.content, true);
    // Append to DOM

    productsContainer.appendChild(clone);
  }

}


function getCategoryDataForBrand(ele,pid){
  var url = "/api/admin/category/list?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
  // var url = "/api/admin/subcategory/list?userid=" + getUserAuth().id + "&token_api=" + getUserAuth().token;
  // API request
  $.ajax({
    url: url,
    type: "GET",
    success: function(result){
      // Todo : no success or message parameter coming in this API response
      if(result) {
        // subCategoryData = result.result.subCategoryData;
        // renderSubCategoryForBrand(subCategoryData,ele);
        renderSubCategoryForBrand(result);
        if(pid !== -1) {
          getViewData("/api/admin/brand/view/", pid, "brandData");
        }
      } else {
        $('body').pgNotification({message: result.result.message}).show();
        if (result.result.message == "Session has timed out" || result.result.message == "Invalid session data") {
          window.location.href = "/admin";
        }
      }
    },
    error: function(xhr,status,error){
      console.log(xhr, status, error);
    }
  });

}

function renderSubCategoryForBrand(arr,ele){
  var selectEl = document.querySelector("#Subcategory_id");
  // var selectEl = document.querySelector("select[name='Subcategory_id']");
  // var selectEl = document.querySelector("select[name='"+ ele +"']");
  if(selectEl){
    selectEl.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
      /*				var optionGroupEl = document.createElement("OPTGROUP");
       optionGroupEl.setAttribute("label", arr[i].name);

       for (var j = 0; j < arr[i].sub_categories.length; j++) {
       arr[i].sub_categories[j];

       var optionEl = document.createElement("OPTION");
       optionEl.value = arr[i].sub_categories[j].id;
       optionEl.innerText = arr[i].sub_categories[j].name;
       optionGroupEl.appendChild(optionEl);
       }*/
       var optionGroupEl = document.createElement("OPTGROUP");
       optionGroupEl.setAttribute("label", arr[i].name);
       for(var j = 0; j < arr[i].sub_categories.length; j++){
       		var optionEl = document.createElement("OPTION");
	      optionEl.value = arr[i].sub_categories[j].id;
	      optionEl.innerText = arr[i].sub_categories[j].name;
	      optionGroupEl.appendChild(optionEl);
	      // selectEl.appendChild(optionEl);
       }
	   selectEl.appendChild(optionGroupEl);
    }
    /*
    for (var i = 0; i < arr.length; i++) {
      var optionEl = document.createElement("OPTION");
      optionEl.value = arr[i].id;
      optionEl.innerText = arr[i].name + ' - '+ arr[i].Category_id;
      selectEl.appendChild(optionEl);
    }
    */
  }
}

function initSelect(){
	// init select2
	$("select").select2();

	// Select Multiselect
      $(".multi-select").select2({
      	multiple: true
      }).select2(
      	'data', valuesToSetBrandEdit
      );

// Reset valuesToSetBrandEdit
valuesToSetBrandEdit = [];

      // console.log("init select fired");

}


function multiSelectGetSetValues(event){
	var select2Value = $(event.target).val();
  document.querySelector("#setHere").value = select2Value;
}


function cUpload(event){
	var el = event.target,
	bannerType = el.getAttribute("data-bannerType");
	console.log("cUpload", el.value);
	el.parentElement.children[0].classList.remove("fadeOut");
	el.parentElement.querySelector(".progress").classList.remove("dn");


	var formData = new FormData();
	formData.append("userid", getUserAuth().id);
	formData.append("token_api", getUserAuth().token);
	formData.append("brand_id", el.getAttribute("data-brand-id"));
	formData.append("subcategory_id", el.getAttribute("data-subCat-id"));
	formData.append(bannerType, el.files[0]);

	var request = new XMLHttpRequest();
	request.open("POST", "/api/admin/brand/uploadbrandbanner");

	request.onreadystatechange = function() {
	    if (request.readyState === 4) {
	    $('body').pgNotification({message: "Image Upload Succesful"}).show();
	      // console.log(request.response); 
	      var data = JSON.parse(request.response);
	      console.log(data.result[bannerType]);
	      el.parentElement.children[0].setAttribute("src", data.result[bannerType]);
	      el.parentElement.children[0].classList.add("fadeOut");

				el.parentElement.querySelector(".progress").classList.add("dn");
	    }
	  }

	request.send(formData);
}

// Products Edit Page
var imageViewState = false;
function toggleImageView(){
	var el = document.querySelector(".images-container");
	if(imageViewState){
		el.style.height = "0px";
		imageViewState = false;
	}else{
		el.style.height = "auto";
		imageViewState = true;
	}
}