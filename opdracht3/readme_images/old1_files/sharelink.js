/**
 * Name         : sharelink.js
 * Version      : v1.0
 * Description  : Js functions for simple share pages.
 * Author       : hosung.seo
 * Copyright 2016 Samsung Electronics All rights reserved
 */

(function(ShareLink, $, undefined) {
    /* common */
    ShareLink.globals = {
        contextPath     : '',
        contentsToken   : ''
    },
    ShareLink.urls = {
        errorPageUrl        : '/error/expired',
        checkPinUrl         : '/checkPin.json',
        loginCaptchaUrl     : '/login/captcha',
        contentsListUrl     : '/contents/list',
        contentsViewUrl     : '/contents/view', 
        refreshContentsUrl  : '/contents/getContentsInfo.json',
        refreshCaptchaUrl   : '/common/captcha/img/refresh.captcha'
    },
    ShareLink.mail = {
        receiver    : '',
        subject     : '',
        message     : ''
    },
    ShareLink.functions = {
        imgOnError: function(el, fallbackUrl) {
            el.onerror = '';
            el.src = fallbackUrl;
        }
    },
    /* modules */
    ShareLink.login = ShareLink.login || {};
    ShareLink.login.functions = {
        init: function(options) {
            if (options != null) {
                ShareLink.globals.contextPath = options.contextPath || '';
                ShareLink.globals.contentsToken = options.contentsToken || '';
            }
        },
        checkPin: function() {
            if ($('#pin').val().length !== 6) {  $('.pin_error').show().html($('#dummyLoginInvalid').html()); return false; }
            var captchaAnswer = $('#captchaAnswer').length ? $('#captchaAnswer').val() : '';
            $.ajax({
                url: ShareLink.globals.contextPath + ShareLink.urls.checkPinUrl,
                type: 'post',
                data: {
                    //contentsToken : ShareLink.globals.contentsToken,
                    pin : $('#pin').val(),
                    captchaAnswer : captchaAnswer
                },
                dataType: 'json',
                cache: false,
                success: function(data) {
                    /*
                    switch (data.authResult) {
                        case 'success': window.location.href = ShareLink.globals.contextPath + ShareLink.urls.contentsListUrl + '?contentsToken=' + data.contentsToken; break;
                        case 'fail': $('.pin_error').show().html(data.failMessage); break;
                        case 'retryExceed': window.location.href = ShareLink.globals.contextPath + ShareLink.urls.loginCaptchaUrl + '?contentsToken=' + data.contentsToken; break;
                        case 'error': window.location.href = ShareLink.globals.contextPath + ShareLink.urls.errorPageUrl; break;
                        case 'invalidCaptcha': ShareLink.login.functions.refreshCaptcha(); $('.pin_error').show().html(data.failMessage); break;
                        default : console.log('Unexpected results: ' + data.authResult); break;
                    }
                    */ 
                    if (data.contentsToken) {
                        window.location.href = ShareLink.globals.contextPath + data.contentsToken;
                    } else {
                       $('.pin_error').show().html($('#dummyLoginInvalid').html());
                    }
                }
            });
        },
        /*
        refreshCaptcha: function () {
            $('#captchaImg').attr('src', ShareLink.globals.contextPath + ShareLink.urls.refreshCaptchaUrl + '?' + $.param({'contentsToken': ShareLink.globals.contentsToken, 't': (new Date).getTime()})); 
        }
        */
    },
    ShareLink.list = ShareLink.list || {};
    ShareLink.list.functions = {
        init: function(options) {
            if (options != null) {
                ShareLink.globals.contextPath = options.contextPath || '';
                ShareLink.globals.contentsToken = options.contentsToken || '';
                ShareLink.globals.selectItemsMsg = options.selectItemsMsg || '';
                ShareLink.globals.currentIndex = parseInt(options.currentIndex) || 0;
                ShareLink.globals.contentsTotalCnt = parseInt(options.contentsTotalCnt) || 0;
                ShareLink.globals.uploadCompleted = options.uploadCompleted === 'true';
                ShareLink.list.selectMode = options.selectMode === 'true';
                ShareLink.mail.receiver = options.mailReceiver || '';
                ShareLink.mail.subject = options.mailSubject || '';
                ShareLink.mail.message = options.mailMessage || '';
            }
        },
        updateCounter: function() {
            var len = $('#contentList input[type=checkbox]:checked').length;
            if (len > 0) {
                //$('#downloadBtn').show();
                $('#downloadBtn').removeClass('off');
                $('#selectedCount').text(len);
                if (len == $('#contentList input[type=checkbox]').length) {
                    $('#checkAll').prop('checked', true);
                } else {
                    $('#checkAll').prop('checked', false);
                }
            } else {
                //$('#downloadBtn').hide();
                $('#downloadBtn').addClass('off');
                $('#selectedCount').text(ShareLink.globals.selectItemsMsg);
                $('#checkAll').prop('checked', false);
            }
        },
        downloadContents: function() {
            RemoteShare.functions.checkContentsExpiry(ShareLink.globals.contentsToken)
                 .done(function() {
                     var contents = [];
                     $('li input[type=checkbox]:checked').each(function() {
                         contents.push($(this).parent().find('img').attr('longdesc'));
                     });
                     contents.push(ShareLink.globals.contextPath + '/' + ShareLink.globals.contentsToken);
                     
                     $('input:checkbox').removeAttr('checked');
                     ShareLink.list.functions.updateCounter();
                         
                     $.each(contents, function(index, url) {
                         setTimeout(function(n) {
                             window.location.href = url;
                         }, index * 3000, index);
                     });
                })
                .fail(function() {
                    window.location.href = ShareLink.globals.contextPath + ShareLink.urls.errorPageUrl;
                });
        },
        downloadSingleContent: function() {
            RemoteShare.functions.checkContentsExpiry(ShareLink.globals.contentsToken)
                .done(function() {
                    var url = $('#contentList > li').length ? $('#contentList > li').first().find('img').attr('longdesc') : $('.fotorama').data('fotorama').activeFrame.full;
                    window.location.href = url;
                })
                .fail(function() {
                    window.location.href = ShareLink.globals.contextPath + ShareLink.urls.errorPageUrl;
                });
        },
        refreshContents: function() {
            $.ajax({
                url: ShareLink.globals.contextPath + ShareLink.urls.refreshContentsUrl,
                data: {
                    contentsToken : ShareLink.globals.contentsToken
                },
                dataType: 'json',
                cache: false,
                success: function(data) {
                    if (data.expired) {
                        window.location.href = ShareLink.globals.contextPath + ShareLink.urls.errorPageUrl;
                    }
                    if (data.contentsTotalCnt) {
                        $('#showCheckBox').show();
                        //$('#downloadBtn').show();
                    }
                    if (data.uploadCompleted) {
                        //$('#uploadingInProgressMsg').hide();
                        //$('#sub_content').removeClass();
                        $('#listInfo').removeClass('incompleted');
                        if (data.title) {
                            $('#uploadingInProgressMsg > div > span').addClass('ellip');
                            $('#uploadingInProgressMsg > div > span').text(data.title);
                        } else {
                            $('#uploadingInProgressMsg').remove();
                            $('#sub_content').removeClass('mr_t177');
                        }
                    } 
                    
                    data.previousItemCnt = $('#contentList').children('li').length;;
                    //message refresh. e.g. 10 Files / 12 Files
                    var source   = ShareLink.list.selectMode ? $('#list-selectMode-template').html() : $('#list-template').html();
                    var template = Handlebars.compile(source);
                    $('#contentList').append(template(data));
                    //console.log(data);
                    
                    var source   = $('#listInfo-template').html();
                    var template = Handlebars.compile(source);
                    $('#listInfo').html(template(data));
                    
                    var expiredTime = parseInt(data.expiredTime) / 1000;
                    $('#expriedDate').text(moment.unix(expiredTime).format(data.dateTimeFormat));
                }
            });
        }
    }

}(window.ShareLink = window.ShareLink || {}, jQuery));

