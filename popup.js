document.getElementById('main_button').addEventListener('click', function() {
    // Send a message to the content script to modify the content
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'printAdvanced'});
    });
});

document.getElementById('secondary_button').addEventListener('click', function() {
    // Send a message to the content script to modify the content
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'printBasic'});
    });
});

