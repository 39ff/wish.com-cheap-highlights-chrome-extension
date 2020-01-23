'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts



const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
console.log(
  `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
);

// Create an observer instance.
var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {

        if(mutation.type === 'childList'){
            console.log(mutation.type);
            var i = 0;
            for(const node of Array.from(mutation.addedNodes)){
                if(node.nodeType !== 1){
                    i++;
                    continue;
                }
                var price = node.getElementsByClassName('FeedTile__Details-v2rytn-9');

                if(price != null) {
                    var $replacement = mutation
                        .addedNodes
                        .item(i)
                        .getElementsByClassName('FeedTile__ActualPrice-v2rytn-13');

                    for (i = 0; i < $replacement.length; i++) {
                        console.log("price="+$replacement[i].innerText);
                        if($replacement[i].innerText.replace("￥","").replace(",","") <= 90) {
                            $replacement[i].innerHTML = '<b style="background-color:black; color:red; font-size: 150%;">' + $replacement[i].innerText + '</b>';
                        }
                    }

                }
                i++;
            }

        }
    });
});

// Config info for the observer.
var config = {
    childList: true,
    subtree: true
};

// Observe the body (and its descendants) for `childList` changes.
observer.observe(document.body, config);

