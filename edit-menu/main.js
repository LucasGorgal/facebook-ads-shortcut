var edit_menu_fb_shortcut = new function() {

    var does_menu_exist = function() { // Go to the forward page
        if(document.evaluate("//div[text()='" + language[0] + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue === null) { // Check if the Find and Replace exists. If not, it is closed
            return false;
        } else {
            return true;
        }
    };

    var open_menu = function() {
        var aTags = document.getElementsByTagName("div");

        for (var i = 0; i < aTags.length; i++) {
            if (aTags[i].textContent == language[1]) {
                // aTags[i] is the element we want

                // As the button we must click has dynamic class name AND id name, I though the best way is to calculate the edit button position, add it's width and 15 pixels to click on the arrow button.
                // If you know a better way, please, tell me.

                let coordinates = aTags[i].getBoundingClientRect();
                var x = coordinates.x + coordinates.width + 15;
                var y = coordinates.y;

                document.elementFromPoint(x, y).click();

                // aTags[i].nextElementSibling.firstElementChild.click(); // This is another way to click on the button, it follows DOM structure. However I don't like this option because FB may change the page structure.

                break;
            }
        }
    };

    this.open_menu_if_closed = function() {

        if(!does_menu_exist()) {
            open_menu();
        }

    }

    this.search_and_replace = function() {
        document.evaluate("//div[text()='" + language[0] + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click(); // Click on div with text "Find and Replace"
    }

    this.search_and_replace_url = function() {
        document.evaluate("//div[text()='" + language[2] + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
    }

}