// Copyright (c) 2018-2019 Claudio Guarnieri.
//
// This file is part of PhishDetect.
//
// PhishDetect is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// PhishDetect is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with PhishDetect.  If not, see <https://www.gnu.org/licenses/>.

console.log("*** Loaded getDOM ***");

chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method && (request.method == "getDOM")) {
            console.log("Received request to extract DOM...");
            sendResponse({dom: document.body.innertHTML, url: location.href});
        }
    }
);