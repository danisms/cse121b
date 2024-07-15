const processScoreData = 'scripts/process-score-data.php';

// SPECIFIC FUNCTION
// make request to server script and retrieve data from database
function getDataRequest(key, value, scriptURL, runFunction, displayElementId = 'optional') {
    if (window.XMLHttpRequest) {
        xml = new XMLHttpRequest();
    } else {
        xml = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xml.onreadystatechange = function() {
        if (xml.readyState == 4 && xml.status == 200) {
            // document.getElementById(displayResultElementId).innerHTML = xml.responseText;  // for testing purpose
            
            // get json response text from php, convert it into json object and store it to data
            data = JSON.parse(xml.responseText);

            // console.log(data);  // for testing purpose

            // display results through functionCall
            runFunction(data, displayElementId);
        }
    }
    
    // create the data to be sent
    data = `${key}=${value}`;

    xml.open('POST', scriptURL, true);
    // create header for sending values as post
    xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xml.send(data);
}

// send upload data request to server script
function sendUploadDataRequest(objects, scriptPath) {
    // Send Request to a Script
    var uploadRequest = new XMLHttpRequest();

    if (objects) {
        var myData = new FormData();
        objects.forEach(object => {
            myData.append(object.key, object.value);
            console.log(`Uploading (Key: ${object.key}; Value: ${object.value})`);
        })

        uploadRequest.open('POST', scriptPath, true);
        // uploadRequest.setRequestHeader('Content-type', contentType);

        // GET RESPONSE
        uploadRequest.onreadystatechange = function() {
            if (uploadRequest.readyState == 4 && uploadRequest.status == 200) {
                var response = uploadRequest.responseText;
                console.log(response);
            }
        }

        uploadRequest.send(myData);
    } else {
        response = "Empty Object";
        console.log(response);
    }   
}