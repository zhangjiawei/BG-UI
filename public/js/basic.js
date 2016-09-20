function checkURL() {
    var hash = location.href.split("#").splice(1).join("");
    if (hash !== '') {
        loadURL(hash);
    } else {
        location.hash = 'desktop';
        checkURL();
    }
}
function loadURL(url) {
    var content = $('#content');
    var target = '/tpl/' + url;
    console.log(target);
    $.ajax({
        type: 'get',
        url: target,
        data: '',
        dataType: 'html',
        beforeSend: function () {
            content.html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
        },
        success: function (returnData) {
            setTimeout(function () {
                content.css('opacity', 0).html(returnData);
                content.animate({'opacity': 1}, {
                        queue: false, duration: 200, complete: function () {

                        }
                    }
                );
            }, 200);
        },
        error: function () {
            content.html('<h4 class="ajax-loading-error"><i class="fa fa-warning"></i> Error 404! Page not found.</h4>')
        }
    })
}

checkURL();
$(document).on("click", 'nav a[href="#"]', function (e) {
    e.preventDefault();
});
$(window).on('hashchange', function () {
    checkURL();
});


//��������
(function () {
    var $nav = $('#left_panel nav');
    var $a = $nav.find('a');
    $a.each(function () {
        var $btn = $(this);
        var $parent_li = $btn.parent();
        var $ul = $btn.next('ul');
        var $i = $btn.find('b i');
        if ($ul.length >= 1) {
            $btn.on('click', function () {
                var ul_orgH = $ul.innerHeight();
                if (!$parent_li.hasClass('open')) {
                    $parent_li.addClass('open');
                    $ul.css({'height': 0}).css('display', 'block');
                    $i.removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
                    $ul.animate({"height": ul_orgH}, {
                            queue: false, duration: 200, complete: function () {
                                $ul.css('height', 'auto');
                            }
                        }
                    );
                } else {
                    $parent_li.removeClass('open');
                    $i.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
                    $ul.animate({"height": 0}, {
                            queue: false, duration: 200, complete: function () {
                                $ul.css({'height': "auto"}).css('display', 'none');
                            }
                        }
                    );
                }

                $others_li = $btn.parent().siblings('.open');
                $others_li.each(function () {
                    var $parent_li = $(this);
                    var $btn = $parent_li.find('a:first');
                    var $ul = $btn.next('ul');
                    var $i = $btn.find('b i');
                    $parent_li.removeClass('open');
                    $i.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
                    $ul.animate({"height": 0}, {
                            queue: false, duration: 200, complete: function () {
                                $ul.css({'height': "auto"}).css('display', 'none');
                            }
                        }
                    );
                });
            });
        }
    });

    var $minifyBtn = $('#left_panel .minifyBtn');
    var $body = $('body');
    $minifyBtn.on('click', function () {
        $('#left_panel nav li.open').each(function () {
            var $parent_li = $(this);
            var $btn = $parent_li.find('a:first');
            var $ul = $btn.next('ul');
            var $i = $btn.find('b i');
            $parent_li.removeClass('open');
            $i.removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
            $ul.css({'height': "auto"}).css('display', 'none');
        });
        if (!$body.hasClass('minified')) {
            $body.addClass('minified');
        } else {
            $body.removeClass('minified');
        }
    });
})();

