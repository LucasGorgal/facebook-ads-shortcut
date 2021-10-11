var eng_language = ['Find and Replace', 'Edit', 'See More URL', 'Page ', 'Select Videos'];
var pt_language = ['Localizar e substituir', 'Editar', 'URL Ver mais', 'Page ', 'Selecionar vídeos'];

// Create a function to test for which language is running the FB interface
let language = eng_language;

var macro = false; // This is the var if the macro video view is executing

document.addEventListener('keydown', function(event) {

    if (event.ctrlKey && event.key === 'T' || event.ctrlKey && event.key === 't') { // Ctrl + G = Search and Replace

        event.preventDefault(); // Disable native browser Ctrl + G shortcut

        edit_menu_fb_shortcut.open_menu_if_closed();

        edit_menu_fb_shortcut.search_and_replace();

        if(event.shiftKey) { // It also pressed the Shift key
            waitUntilElementPresent("//div[text()='" + language[2] + "']", 8, function() {  // It must wait for form to load
                edit_menu_fb_shortcut.search_and_replace_url(); // Change to URL option of Search and Replace
            });
        }

    }

    /* VIDEO VIEW COMMANDS */

    if (event.ctrlKey && event.key === 'o' || event.ctrlKey && event.key === 'O') { // Ctrl + H = Previous page

        event.preventDefault();
        
        video_view_fb_shortcut.previous();

    }

    if (event.ctrlKey && event.key === 'p' || event.ctrlKey && event.key === 'P') { // Ctrl + J = Next page

        event.preventDefault();
        
        video_view_fb_shortcut.forward();

    }

    if (event.ctrlKey && event.key === 'l' || event.ctrlKey && event.key === 'L') { // Ctrl + K = Select all videos

        event.preventDefault();
        
        video_view_fb_shortcut.select_all();

    }

    if (event.ctrlKey && event.key === ',') { // Ctrl + , = Auto select videos and go forward

        event.preventDefault();

        // Check if the script is already running, if so, just skip this if
        if(macro === false) {
            macro = true;
        } else {
            console.log('It is already executing');
            return false;
        }

        (function select_and_forward() {
            
            if(macro === true) {

                waitUntilElementPresent("//div[contains(text(), '" + language[4] + "')]/parent::*/parent::*/parent::*/parent::*//input[@type='checkbox']", 15, function() {

                    video_view_fb_shortcut.select_all();
                    video_view_fb_shortcut.forward();
                    select_and_forward();

                });

            }

        }());

    }

    if (event.ctrlKey && event.key === '.') { // Ctrl + . = Stop auto selection videos

        event.preventDefault();

        macro = false;

    }

    /* PAGES */

        /*
    if (event.ctrlKey && event.key === '1') { // Ctrl + 1 = Go to Business Manager Page

        event.preventDefault();
        let current_url = window.location.href;
        let url = new URL(current_url);
        let business_id = function() {
            if(url.searchParams.get("business_id") != null) {
                return url.searchParams.get("business_id");
            } else if(url.searchParams.get("global_scope_id") != null) {
                return url.searchParams.get("global_scope_id");
            } else {
                return null;
            }
        };

        let bm_url = "https://business.facebook.com/settings/?business_id=" + business_id + "&global_scope_id=" + business_id + "&nav_source=flyout_menu";

        if(event.shiftKey) { // It also pressed the Shift key
            window.open(bm_url, '_blank').focus(); // NOT WORKING FOR SOME REASON
        } else {
            window.location.href = bm_url;
        }
        
    }
    */


});

function waitUntilElementPresent(xpath, timeoutInSeconds, callback) {
    var currentTime = new Date().getTime();
    var endTime = currentTime + timeoutInSeconds * 1000;
    var checkExist = setInterval(function () {
        if (document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue !== null) {
            clearInterval(checkExist);
            console.log('It exists');
            callback();
        } else if (endTime < new Date().getTime()) {
            clearInterval(checkExist);
            // console.log('not found in specified time.');
            return;
        } else {
            // console.log('waiting for element to be present…');
        } 
    }, 100); 
}