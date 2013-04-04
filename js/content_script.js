/*

content_script created by Manish Sharma

*/

(function(){

	$(document).ready(function(){
	
		console.log("manish");
		
		createSearchBox();
		
		$("#submit_searchbox").click(function(){
		
			var search_text = $("#searchboxtext").val();
			
			console.log(search_text);
			
			if(search_text != "")
			{
				$("#newsearchdiv").empty();
				$("#newsearchdiv").append("<ul id='newsearchul' class='guide-context-item-container context-data-container yt-uix-scroller guide-context-body' style='overflow-y: auto;' data-context-playing='6' data-context-open='true' data-context-subsource='' data-scroll-action='yt.www.watch.context.loadThumbnails' data-scroller-offset='306' data-scroller-mousewheel-listener='' data-scroller-scroll-listener=''></ul>");
				$("#newsearchul").empty();
				$("#newsearchul").append("<br/><li class='guide-context-item'><span class='title'>Loading...</span></li>");
				getSearchResults(search_text);
			}
		
		});
	
	});
	
	function createSearchBox()
	{
	
		console.log("createSearchBox called");
	
		//$("#masthead-search-terms").remove();
		//$("#search-btn").remove();
		$("#guide-container").append("<div id='newsearchboxresults'><div id='newsearchbox' class='masthead-search-terms-border' style='border: 0px;'><form id='newsearchboxform' onsubmit='return false ;' method='get'></form></div><div id='newsearchresults' class='context-search'><br/></div></div>");
		$("#newsearchboxform").append("<input type='text' id='searchboxtext' class='search-term yt-uix-form-input-bidi' style='width : 125px ; height : 20px ;' value=''/>");
		$("#newsearchboxform").append("<button type='submit' id='submit_searchbox' value='' class='search-btn-component search-button yt-uix-button yt-uix-button-default' style='width: 45px ; height: 26px; vertical-align: top; font-size: 9px ;'><span class='yt-uix-button-content'>Search</span></button>");
		$("#newsearchresults").append("<div id='newsearchdiv' class='guide-module-content' style='height: 335px; display: block;'></div>");
	
	}
	
	function getSearchResults(search_text)
	{
	
		console.log("getSearchResults called "+search_text);
		
		$.ajax({
		
				url : "http://gdata.youtube.com/feeds/api/videos?max-results=50&alt=rss&q="+search_text,
				
				dataType : "xml",
	
				success : function(response){
				
					console.log(response);
					
					var items=response.getElementsByTagName("item");
					
					console.log(items);
					
					$("#newsearchul").empty();
					
					$("#newsearchdiv").empty();
					$("#newsearchdiv").append("<ul id='newsearchul' class='guide-context-item-container context-data-container yt-uix-scroller guide-context-body' style='overflow-y: auto;' data-context-playing='6' data-context-open='true' data-context-subsource='' data-scroll-action='yt.www.watch.context.loadThumbnails' data-scroller-offset='306' data-scroller-mousewheel-listener='' data-scroller-scroll-listener=''></ul>");
					
					$("#newsearchdiv").prepend("<hr class='guide-section-separator guide-context-separator-top'>");
					
					for(var i=0 ; i<items.length ; i++ )
					{
						var title=items[i].childNodes[5];
						var link = items[i].childNodes[7];
						
						var title_text = title.firstChild.nodeValue;
						var link_text = link.firstChild.nodeValue;
						
						link_text=link_text.substring(0,42);
						
						console.log(link_text);
						
						var image_link=link_text.substring(31,42);
						
						console.log(image_link);
						
						$("#newsearchul").append("<li class='guide-context-item context-data-item context-video yt-uix-scroller-scroll-unit'><a href='"+link_text+"' class='yt-uix-contextlink yt-uix-sessionlink'><span class='video-thumb ux-thumb yt-thumb-default-40 context-video-thumb'><span class='yt-thumb-clip'><span class='yt-thumb-clip-inner'><img src='http://i.ytimg.com/vi/"+image_link+"/default.jpg' data-thumb='http://i.ytimg.com/vi/"+image_link+"/default.jpg' alt data-thumb-manual='1' width='40'><span class='vertical-align'></span></span></span></span><span class='title'>"+title_text+"</span></a></li>");
						
					}
					
					$("#newsearchdiv").append("<hr class='guide-section-separator guide-context-separator-bottom'>");
				
				}
		
		}
		);
	}
	
	

})();