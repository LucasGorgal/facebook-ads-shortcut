var video_view_fb_shortcut = new function() {

    this.forward = function() { // Go to the forward page

        // What are are going to do, is the following:
        // The text on the video view page is < Page 1 >
        // We are going to locate this Page 1 text and get the button before and after this element
        
        document.evaluate("//div[contains(text(), '" + language[3] + "')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.nextElementSibling.firstElementChild.click();
    };

    this.previous = function() { // Go the previous page
        document.evaluate("//div[contains(text(), '" + language[3] + "')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentElement.previousElementSibling.firstElementChild.click();
    };

    this.select_all = function() {

        // First get the div with the content of "Select Videos"
        // Then check all checkboxes from it
        let checkbox_array = [];
        let checkboxes = document.evaluate("//div[contains(text(), '" + language[4] + "')]/parent::*/parent::*/parent::*/parent::*//input[@type='checkbox' and @aria-checked='false']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);

        try {
            var checkbox = checkboxes.iterateNext();

            while(checkbox) {
                checkbox_array.push(checkbox);
                checkbox = checkboxes.iterateNext();
            }
        } catch (e) {
            console.log('Error: ' + e);
        }

        checkbox_array.forEach(function(checkbox) {
            checkbox.click();
        });

    };



}