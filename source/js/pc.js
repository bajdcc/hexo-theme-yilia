define([], function(){

        if (location.pathname === '/') {
            $("#container").css("display",'none');
            $('<audio src="/media/intro.mp3" autoplay="autoplay"></audio>').appendTo($('body'));
            require(['/js/shape-shifter.js'], function(S){
                S.init();
            });
        } else {
            $('.intro-header').remove();
            $("#container").css("opacity",'1');
        }
        
	var Tips = (function(){

		var $tipBox = $(".tips-box");

		return {
			show: function(){
				$tipBox.removeClass("hide");
			},
			hide: function(){
				$tipBox.addClass("hide");
			},
			init: function(){
				
			}
		}
	})();

	var resetTags = function(){
		var tags = $(".tagcloud a");
		tags.css({"font-size": "12px"});
		for(var i=0,len=tags.length; i<len; i++){
			var num = tags.eq(i).html().length % 5 +1;
			tags[i].className = "";
			tags.eq(i).addClass("color"+num);
		}
	}

	var slide = function(idx){
		var $wrap = $(".switch-wrap");
		$wrap.css({
			"transform": "translate(-"+idx*100+"%, 0 )"
		});
		$(".icon-wrap").addClass("hide");
		$(".icon-wrap").eq(idx).removeClass("hide");
	}

	var bind = function(){
		var switchBtn = $("#myonoffswitch");
		var tagcloud = $(".second-part");
		var navDiv = $(".first-part");
		switchBtn.click(function(){
			if(switchBtn.hasClass("clicked")){
				switchBtn.removeClass("clicked");
				tagcloud.removeClass("turn-left");
				navDiv.removeClass("turn-left");
			}else{
				switchBtn.addClass("clicked");
				tagcloud.addClass("turn-left");
				navDiv.addClass("turn-left");
				resetTags();
			}
		});

		var timeout;
		var isEnterBtn = false;
		var isEnterTips = false;

		$(".icon").bind("mouseenter", function(){
			isEnterBtn = true;
			Tips.show();
		}).bind("mouseleave", function(){
			isEnterBtn = false;
			setTimeout(function(){
				if(!isEnterTips){
					Tips.hide();
				}
			}, 100);
		});

		$(".tips-box").bind("mouseenter", function(){
			isEnterTips = true;
			Tips.show();
		}).bind("mouseleave", function(){
			isEnterTips = false;
			setTimeout(function(){
				if(!isEnterBtn){
					Tips.hide();
				}
			}, 100);
		});

		$(".tips-inner li").bind("click", function(){
			var idx = $(this).index();
			slide(idx);
			Tips.hide();
		});
	}
    
    var mapv = function() {
        
        setTimeout(function(){
            $("#toc-base").css("opacity", '1');            
        }, 500);
    }	


    var nav = function() {
        $(document).ready(function () {
            
            var tocSelector = '#toc';
            var $tocSelector = $(tocSelector);
            var activeCurrentSelector = '.active-current';

            $tocSelector
            .on('activate.bs.scrollspy', function () {
                var $currentActiveElement = $(tocSelector + ' .active').last();

                removeCurrentActiveClass();
                $currentActiveElement.addClass('active-current');

                $tocSelector[0].scrollTop = $currentActiveElement.position().top;
            })
            .on('clear.bs.scrollspy', function () {
                removeCurrentActiveClass();
            });

            function removeCurrentActiveClass () {
            $(tocSelector + ' ' + activeCurrentSelector)
                .removeClass(activeCurrentSelector.substring(1));
            }

            function processTOC () {
            getTOCMaxHeight();
            toggleTOCOverflowIndicators();
            }

            function getTOCMaxHeight () {
            return $('#toc').height();
            }
            
            $('body').scrollspy({ target: tocSelector });
            $(window).on('resize', function () {
            if ( $('.toc-article').length !== 0 ) {
                processTOC();
            }
            });

            $('body').scrollspy({ target: "#toc" });
            onScroll($tocSelector);

            function onScroll (element) {
            element.on('mousewheel DOMMouseScroll', function (event) {
                var oe = event.originalEvent;
                var delta = oe.wheelDelta || -oe.detail;
                var self = this;

                this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                event.preventDefault();
            });
            }

        });
    }

	return {
		init: function(){
			resetTags();
			bind();
			Tips.init();
            mapv();
            nav();
		}
	}
});