
const GTOFrequencies = [
    [9],
    [9.6, 11.2],
    [9.8, 11.7, 14.3],
    [8, 9.2, 11.2, 15.1],
    [5.5, 6.8, 8.9, 14.2, 17.2]
];

const cssRules = `
    #stat-grabber-button {
        padding: 8px 16px;
        margin-top: 10px;
        background-color: #007bff;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
`;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'printAdvanced') {
        printStat();
    }

    if (message.action === 'printBasic') {
        printStatAdvanced();
    }
});

function removeSmallTags() {
    const smallTags = document.querySelectorAll('.stat small');
    if(smallTags.length > 0) {
        alert("Sample size for 1 or more stats is too low");
    }
    smallTags.forEach(function(smallTag) {
        const parentElement = smallTag.parentElement;
        parentElement.removeChild(smallTag);
    })
}

function printStat() {
    removeSmallTags();
    let elements = document.querySelectorAll('.stat');
    let stat_string = "";

    // designates how many stats before a line should break
    let linebreaks = [8, 5, 1, 2, 3, 4, 5, 6, 5];
    let lb_idx = 0;
    let first_element = true;
    let extra_newline = true;
    let extra_newline2 = true;
    elements.forEach(function(element) {
        // divides up the general stats and positional stats (lb_idx = 2 is where the positional stats start on the hud)

        switch (true) {
            case lb_idx == 1:
                if (first_element) {
                    stat_string += Math.round(element.textContent.trim());
                    first_element = false;
                } else if (linebreaks[lb_idx] == 2) { 
                    stat_string += "/BTNCC:" + Math.round(element.textContent.trim());
                } else if (linebreaks[lb_idx] == 1) {
                    stat_string += "/SBCC:" + Math.round(element.textContent.trim());
                } else {
                    stat_string += "/" + Math.round(element.textContent.trim());
                }
                linebreaks[lb_idx] -= 1;

                if (linebreaks[lb_idx] == 0) {
                    lb_idx += 1;
                    first_element = true;
                }
            break;
            case lb_idx <= 1:
                if (first_element) {
                    stat_string += Math.round(element.textContent.trim());
                    first_element = false;
                } else if (linebreaks[lb_idx] == 4) {
                    stat_string += "    " + Math.round(element.textContent.trim());
                } else {
                    stat_string += "/" + Math.round(element.textContent.trim());
                }
                linebreaks[lb_idx] -= 1;

                if (linebreaks[lb_idx] == 0) {
                    stat_string += "\n";
                    lb_idx += 1;
                    first_element = true;
                }
            break;
            case lb_idx <= 6:
                if (extra_newline) {
                    stat_string += "\n";
                    extra_newline = false;
                }
                let GTOFrequency = GTOFrequencies[lb_idx - 2][GTOFrequencies[lb_idx - 2].length - [linebreaks[lb_idx]]];
                let calculated_stat = (parseFloat(element.textContent) - GTOFrequency).toFixed(1);

                // set the value to 0 if the deviation is less than 10% from GTO (small numbers just clog the hud and are not useful info because of variance)
                if (Math.abs(calculated_stat) <= GTOFrequency / 10) { // abs difference / 10% deviation from GTO
                    calculated_stat = 0;
                }
                if (first_element) {
                    stat_string += calculated_stat;
                    first_element = false;
                } else {
                    stat_string += "/" + calculated_stat ;
                }
                linebreaks[lb_idx] -= 1;
                
                if (linebreaks[lb_idx] == 0) {
                    stat_string += "\n";
                    lb_idx += 1;
                    first_element = true;
                }
            break;
            case lb_idx == 7:
                if (first_element) {
                    stat_string +=  "\nBvBF3B:" + Math.round(element.textContent.trim());
                    first_element = false;
                } else if (linebreaks[lb_idx] == 5) { 
                    stat_string += "/FCB:" + Math.round(element.textContent.trim());
                } else if (linebreaks[lb_idx] == 4) {
                    stat_string += "/FTB:" + Math.round(element.textContent.trim());
                } else if (linebreaks[lb_idx] == 3) {
                    stat_string += "/FSQ:" + Math.round(element.textContent.trim());
                } else if (linebreaks[lb_idx] == 2) {
                    stat_string += "/F3B:" + Math.round(element.textContent.trim());
                } else if (linebreaks[lb_idx] == 1) {
                    stat_string += "/F4B:" + Math.round(element.textContent.trim());
                } else {
                    stat_string += "/" + Math.round(element.textContent.trim());
                }
                linebreaks[lb_idx] -= 1;

                if (linebreaks[lb_idx] == 0) {
                    lb_idx += 1;
                    first_element = true;
                }
            break;
            case lb_idx == 8:
                if (first_element) {
                    stat_string +=  "\nBTN:" + Math.round(element.textContent.trim());
                    first_element = false;
                } else if (linebreaks[lb_idx] == 4) { 
                    stat_string += "/SB:" + Math.round(element.textContent.trim());
                } else if (linebreaks[lb_idx] == 3) {
                    stat_string += "/SQ:" + Math.round(element.textContent.trim());
                } else if (linebreaks[lb_idx] == 2) {
                    stat_string += "/CBF:" + Math.round(element.textContent.trim());
                } else if (linebreaks[lb_idx] == 1) {
                    stat_string += "/CBT:" + Math.round(element.textContent.trim());
                } else {
                    stat_string += "/" + Math.round(element.textContent.trim());
                }
                linebreaks[lb_idx] -= 1;

                if (linebreaks[lb_idx] == 0) {
                    lb_idx += 1;
                    first_element = true;
                }
            break;
            default:
                if (extra_newline2) {
                    stat_string += "\n";
                    extra_newline2 = false;
                } 
                if (first_element) {
                    stat_string += Math.round(element.textContent.trim());
                    first_element = false;
                } else {
                    stat_string += "/" + Math.round(element.textContent.trim());
                }
                linebreaks[lb_idx] -= 1;

                if (linebreaks[lb_idx] == 0) {
                    stat_string += "\n";
                    lb_idx += 1;
                    first_element = true;
                }
            break;
        }
    });

    copyTextToClipboard(stat_string);

}

function printStatAdvanced() {
    removeSmallTags();
    let elements = document.querySelectorAll('.stat');
    let stat_string = "";

    // designates how many stats before a line should break
    let first_element = true;
    for (let i = 0; i < 4; i++) {
        if (first_element) {
            stat_string += Math.round(elements[i].textContent.trim());
            first_element = false;
        } else {
            stat_string += "/" + Math.round(elements[i].textContent.trim());
        }
    }

    copyTextToClipboard(stat_string);
}

function copyTextToClipboard(stat_string) {
    if (!document.hasFocus()) {
        // If the document doesn't have focus, wait and retry
        setTimeout(function() {
            copyTextToClipboard(stat_string);
        }, 100); // Retry after 100 milliseconds
        return;
    }
    navigator.clipboard.writeText(stat_string);
}