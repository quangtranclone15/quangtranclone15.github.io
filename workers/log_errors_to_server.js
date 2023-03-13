// <log errors to server>
	window.onerror = function (messageOrEvent, source, lineno, colno, error) {

	    try {
	        console.log({
	            //error message(string).Available as event (sic!) in HTML onerror = "" handler.
	            messageOrEvent: messageOrEvent, 
	            //URL of the script where the error was raised(string)
	            source: source, 
	            //Line number where error was raised(number)
	            lineno: lineno, 
	            //Column number for the line where the error occurred(number)
	            colno: colno, 
	            //Error Object(object)
	            error: error 
	        });
	        
	        //placeholder array for request parameters
	        var params = [], 
	            //saves a unique id to prevent creating a new script tags for each error
	            ___guid = window.onerror___guid || (window.onerror___guid = (new Date().getTime() + '-' + new Date().getTime())), //a guidto for the error script element id
	            //create a new function if none exists with the unique id
	            ___logError = function (___url) {
	                ___domScript = document.getElementById(___guid);
	                if (!___domScript) {
	                    var ___head = document.head || document.getElementsByTagName('head')[0],
	                        ___domScript = document.createElement('script');

	                    ___domScript.id = ___guid;
	                    ___domScript.dataType = 'json';
	                    ___domScript.async = 'async';

	                    ___head.insertBefore(___domScript, ___head.firstChild);
	                }

	                ___domScript.src = ___url;
	            };

	        params.push('browser=' + encodeURIComponent(((navigator.userAgent + '|' + navigator.vendor + '|' + navigator.platform + '|' + navigator.platform) || '').toString()));
	        params.push('lineNumber=' + encodeURIComponent((lineno || '').toString()));
	        params.push('colNumber=' + encodeURIComponent((colno || '').toString()));
	        params.push('source=' + encodeURIComponent((source || '').toString()));
	        params.push('error=' + encodeURIComponent((error || '').toString()));
	        params.push('messageOrEvent=' + encodeURIComponent((messageOrEvent || '').toString()));
	        params.push('url=' + encodeURIComponent((window.location.href || '').toString()));


	        // `/JavascriptError` is your servers endpoint
	        ___logError('https://resumeworded.com/workers/log_errors_to_server.php?action=report_js_error&' + params.join('&'));
	    }
	    catch (e) {
	        // squelch, because we don’t want to prevent method from returning true
	        console.log(e);
	    }

	    //When the function returns true, this prevents the firing of the default event handler.
	    return false;
	};
// </log errors to server>
