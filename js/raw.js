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

function sendRaw(rawType, rawContent, identifier) {
    // Check if the event type is email_*.
    if (rawType == "email") {
        // If an email identifier was provided...
        if (identifier !== undefined && identifier != "") {
            // Get a list of already shared emails.
            var emails = cfg.getSharedEmails();
            for (var i=0; i<emails.length; i++) {
                // If the email was already shared before, no need to
                // report it again.
                if (emails[i] == identifier) {
                    return;
                }
            }
        }
    }

    // Craft request to send to REST API server.
    var properties = {
        method: "POST",
        body: JSON.stringify({
            "type": rawType,
            "content": rawContent,
            "user_contact": cfg.getContact(),
        }),
        headers: {"Content-Type": "application/json"},
    };

    fetch(cfg.getRawURL(), properties)
    .then((response) => response.json())
    .then(function(data) {
        // We do this to avoid re-sharing already shared emails.
        if (rawType == "email") {
            if (identifier !== undefined && identifier != "") {
                cfg.addSharedEmail(identifier);
            }
        }
    })
    .catch(error => {
        console.log(error);
    })
}
