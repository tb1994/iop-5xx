var parentPageID =  828;

window.onload = getContent();

function getContent(){
$.ajax({
    method: 'GET',
			url: 'https://me.inside-out-project.com/wp-json/wp/v2/pages/?parent=' + parentPageID + '&order=asc&orderby=menu_order',
			dataType: 'json',
			success: function (data) {
				if (data.length > 0) {
					var thePage = '';
					var theMenu = '<ul class="navbar-nav ml-auto">';
					var className = '';
					data.forEach(function (item) {
						if (item.slug === 'home') {
							$("header").html(item.content.rendered);
						} else {
						let isActive = (theMenu === null) ? ' active' : '';
							theMenu = theMenu + '<li class="nav-item"> <a class="nav-link js-scroll-trigger' + isActive + '" href="#' + item.slug + '">' + item.title.rendered + '</a> </li>';
							className = (className === '') ? ' class="bg-light"' : '';
							thePage = thePage + '<section id="' + item.slug + '"' + className + '>' + item.content.rendered + '</section>';
						}
					});
					$("#navbarResponsive").html(theMenu + '</ul>');
					$("main").html(thePage);
				}
			},
			error: function () {
				console.log('bad');
			}
		});
		setTimeout(function () {
			$("#loaderDiv").fadeOut(2000);
            resizeDiv();
            startScroll();
		}, 2000);
	}
	window.onresize = function (event) {
		resizeDiv();
	}
	
	function resizeDiv() {
		let vpw = $(window).width();
		let vph = $(window).height();
		let navH = $('nav').height();
		let footerH = $('nav').height();
		let setvph = vph - navH;
	$("section,header").css({
			"height": setvph
		});
	$("header").css({
		"margin-top": navH
		});	}