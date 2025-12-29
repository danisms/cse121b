let sfx = null;  // for utility functions that needs the sound effect class

// a function to get and set the an instance of the SFX class
export function setSFXInstance(instance) {
    sfx = instance;
}

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
    return parent.querySelector(selector);
}

// change open page
export function openSection(urlPath, target, features) {
    setTimeout(() => {
        open(urlPath, target, features);
    }, 200);
}

// reload page
export function reloadPage() {
    setTimeout(() => {
        location.reload();
    }, 200);
}

// check connection
export function isOnline() {
  if (!navigator.onLine) {
    alertMessage("Your're offline. Some features may not work.", false, 1000000);
    return false;
  } else {
    return true;
  }
}

export class CheckNetWorkConnection {
  constructor() {
    this.isOnline = navigator.onLine;
    this.isOffline = !navigator.onLine;
  }

  isConnected(displayOfflineWarningMsg = true, warningDisapearTimer = 1000000) {
    if (!this.isOnline) {
      this.setIsOnline();
      this.setIsOffline();
      if (displayOfflineWarningMsg) {
        alertMessage("Your're offline. Some features may not work.", false, warningDisapearTimer);
      }
      return false;
    } else {
      if (this.isOffline) {
        this.setIsOffline();
        alertMessage("Your internet has been restored.");
      }
      return true;
    }
  }

  setIsOnline() {
    this.isOnline = navigator.onLine;
  }

  setIsOffline() {
    this.isOffline = !navigator.onLine;
  }
} 

// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// convert data to json and 
export function convertToJson(res) {
    const data = res.json();
    if (res.ok) {
      return data;
    } else {
      throw ("Convert To Json Error", data);
    }
}

 // fetch api data
 export const fetchApiData = async (url, option=undefined) => {
  if (isOnline()) {
    try {
        const response = await fetch(url, option);
        console.log(response);  // for debugging purpose
        if (response.ok) {
            const data = await convertToJson(response);
            setTimeout(() => {
                console.log(data);  // for testing purpose
            }, 6000);
            return data;
        }
    } catch (err) {
        console.error("fetch error: ", err);
        return null;
    }
  } else {
    return null;
  }
}

// find array object by id
export function findObjectByKey(objectArray, key, value) {
  try {
    const indexNum = objectArray.findIndex(obj => obj[key] == value);
    console.log("Found Index Number: ", indexNum);
    if (indexNum != -1) {
        return objectArray[indexNum];
    } else {
        return null;
    }
  } catch (err) {
    console.error("FindObjectByKey Error: ", err);
  }
}

export function getObjectIndex(objectArray, object) {
  try {
    const indexNum = objectArray.findIndex(obj => obj == object);
    console.log("Found Index Number: ", indexNum);
    if (indexNum != -1) {
        return indexNum;
    } else {
        return null;
    }
  } catch (err) {
    console.error("GetObjectIndex Error: ", err);
  }
}


// retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// get parameter from a url
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const paramValue = urlParams.get(param);
  return paramValue;
}

// generate Random Id
export function generateRandomId() {
  return Math.random().toString(36).substring(2, 6);
}

// generate player Id
export function generatePlayerId(playerName, internalPlayers) {
    let playerNames = playerName.toLowerCase().trim().split(" ");
    let name = "";
    let playerId = null;

    let count = 1;
    playerNames.forEach(player => {
        if (playerNames.length > count) {
            name += `${player}-`;
        } else {
            name += player;
        }
        count++;
    });

    playerId = `${name}$${internalPlayers.length + 1}$${generateRandomId()}`;
    return playerId;
}

// generate room id for online multiplayer
export function generateRoomId(playerId, additionalInfo="") {
    return `${playerId}$${additionalInfo}`;
}

// get round from room id
export function getRoundFromRoomId(roomId) {
    const roomIdElements = roomId.split("$");
    return roomIdElements[roomIdElements.length - 1];
}

export function getPlayerNameFromRoomId(roomId) {
    console.log("getting player name from ROOM ID: ", roomId);  //  for debugging purpose
    const roomIdComponents = roomId.split("$");
    console.log("room Id components: ", roomIdComponents);  // for debugging purpose

    const nameComponents = roomIdComponents[0].split("-");
    console.log("Name Components: ", nameComponents);  // for debugging purpose

    let playerName = "";
    nameComponents.forEach(name => {
        playerName += `${name} `;
    })

    console.log("Player Name from Room-ID: ", playerName.trim());  // for debugging purpose

    return playerName.trim();
}

export function getPlayerIdFromRoomId(roomId) {
    let playerId = null;
    try {
      const roomIdElements = roomId.split("$");
      console.log("room Elements: ", roomIdElements)
      playerId = roomIdElements.slice(0, roomIdElements.length -1).join("$");
      console.log(`Player Id: ${playerId}`);  // for testing purpose
      return playerId;
    } catch (err) {
        console.error(err);  // for debugging purpose
        throw new Error("Invalid player id");
    }
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
    qs(selector).addEventListener("touchend", (event) => {
      event.preventDefault();
      callback();
    });
    qs(selector).addEventListener("click", callback);
}


// format numbers
export function formatNumber(number) {
  let formated_number = number;

  // Thousand (K)
  if (number >= 1e3) {
    formated_number = (number / 1e3).toFixed(1).replace(/\.0$/, '') + "K";  // To Thousand
  }
  // Million (M)
  if (number >= 1e6) {
    formated_number = (number / 1e6).toFixed(1).replace(/\.0$/, '') + "M";  // To Thousand
  }
  // Billion (B)
  if (number >= 1e9) {
    formated_number = (number / 1e9).toFixed(1).replace(/\.0$/, '') + "B";  // To Thousand
  }
  // Trillion and Above (T+)
  if (number >= 1e12) {
    formated_number = (number / 1e12).toFixed(1).replace(/\.0$/, '') + "T+";  // To Thousand
  }

  return formated_number;
}

// slice name
export function sliceName(name, maxNameLength=30) {
    return name.length > maxNameLength ? `<abbr title="${name}">${name.slice(0, maxNameLength - 3)}...</abbr>` : name;
}

// capitalize string
export function capitalizeString(string, speratorOne=' ', includeSeperator2=true, speratorTwo='.') {
  let capitalizedString = '';
  const splitedString = string.split(speratorOne);
  // console.log(splitedString);  // for testing purpose

  splitedString.forEach(value => {
    capitalizedString = capitalizedString + value.slice(0, 1).toUpperCase() + value.slice(1).toLowerCase() + ' ';
  });

  if (includeSeperator2) {
    const splitedCapitalizedString = capitalizedString.trim().split(speratorTwo);
    // console.log(splitedCapitalizedString);  // for testing purpose
    // console.log("SPLITED CAPITALIZED STRING", splitedCapitalizedString.length);  // for testing purpose

    if (splitedCapitalizedString.length > 1) {
      capitalizedString = '';  // empty capitalized string
      let count = 0;
      splitedCapitalizedString.forEach(value => {
        count++
        if (count < splitedCapitalizedString.length) {
          capitalizedString += value.slice(0, 1).toUpperCase() + value.slice(1) + '.';
        } else {
          capitalizedString += value.slice(0, 1).toUpperCase() + value.slice(1);
        }
      })
    }
  }

  return capitalizedString.trim();
}

export function getFullName(firstname, middlename=' ', lastname, fullMiddleName=true, capitalize=true, abbrName=false) {
    let fullname = '';
    if (fullMiddleName) {
        fullname = `${firstname}${middlename != '' && middlename != 'null' && middlename != null ? ` ${middlename} ` : ' '}${lastname}`;
    } else {
        fullname = `${firstname}${middlename != '' && middlename != 'null' && middlename != null ? ` ${middlename.slice(0, 1).toUpperCase()}. ` : ' '}${lastname}`;
        if (abbrName) {
          fullname = `<abbr title=" ${firstname}${middlename != '' && middlename != 'null' && middlename != null ? ` ${middlename} ` : ' '}${lastname}"> ${firstname}${middlename != '' && middlename != 'null' && middlename != null ? ` ${middlename.slice(0, 1).toUpperCase()}. ` : ' '}${lastname}</abbr>`;
        }
    }
    if (capitalize) {
        return capitalizeString(fullname);
    } else {
        return fullname;
    }
}

export function sliceFullName(fullname="", maxNameLength=30, profileData="", abbreviate=true) {
    let userFullName = fullname;
    if (typeof(profileData) == 'object' && profileData != null) {
        userFullName = getFullName(decodeData(profileData.firstname), decodeData(profileData.middlename), decodeData(profileData.lastname), true, true, false);
    }

    if (userFullName) {
        return abbreviate ? userFullName.length > maxNameLength ? `<abbr title="${userFullName}">${userFullName.slice(0, maxNameLength - 3)}...</abbr>` : userFullName : userFullName.length > maxNameLength ? `${userFullName.slice(0, maxNameLength - 3)}...` : userFullName;        
    } else {
        return "";
    }
}

export function getDisplayName(firstname, middlename, lastname, fullname="", profileData = undefined, fullMiddleName=true, capitalize=true, abbrFullName=true, maxNameCharacter = maxSingleNameLength, maxFullNameCharacter = maxFullNameLength) {
    if (abbrFullName) {
      if (!fullname) {
          // create fullname from given name
          fullname = getFullName(firstname, middlename, lastname, true, true, false);
      }
      return fullname.length > maxFullNameCharacter ? `<abbr title="${fullname}">${sliceFullName(getFullName(sliceFullName(firstname, maxNameCharacter, profileData, false), sliceFullName(middlename, maxNameCharacter, profileData, false), sliceFullName(lastname, maxNameCharacter, profileData, false), fullMiddleName, capitalize, false), maxFullNameCharacter, undefined, false)}</abbr>` : sliceFullName(getFullName(sliceFullName(firstname, maxNameCharacter, profileData, false), sliceFullName(middlename, maxNameCharacter, profileData, false), sliceFullName(lastname, maxNameCharacter, profileData, false), fullMiddleName, capitalize, false), maxFullNameCharacter, undefined, false);
    } else {
      return sliceFullName(getFullName(sliceFullName(firstname, maxNameCharacter, profileData, false), sliceFullName(middlename, maxNameCharacter, profileData, false), sliceFullName(lastname, maxNameCharacter, profileData, false), fullMiddleName, capitalize, false), maxFullNameCharacter, undefined, false);
    }
}


// display text by letters
export async function textByLetter(text, refValue, speed=50) {
  return new Promise((resolve, reject) => {
    let textList = text.split("");
    let indexNum = 0;
    let displayText = "";
    // console.log(textList);  // for testing purpose
    // console.log(textList.length);  // for debugging purpose
    function writeText() {
      let textValue = textList[indexNum];
      displayText += textValue;
      console.log("RefElement In Doc At textByLetter: ", document.body.contains(refValue));
      if (document.body.contains(refValue)) {
        refValue.innerHTML = displayText;
        indexNum++;
        refValue.scrollTop = refValue.scrollHeight;
      } else {
        clearInterval(writing);
        console.log("Writting aborted!");  // for testing purpose
        resolve(true);
      }
      if (indexNum >= textList.length) {
        clearInterval(writing);
        resolve(true);
      }
    }
    let writing = setInterval(() => {
      writeText();
    }, speed);
  })
}

// get and return a random choice from a list
export function choice(list) {
  let choose = Math.floor(Math.random() * list.length);
  return list[choose];
}

// remove value from a list of values
export function removeObjFromList(object, objArray) {
    // find index number of object in the array
    const objIndex = getObjectIndex(objArray, object);
    console.log("Obj Index: ", objIndex);  // for debugging purpose
    if (objIndex || objIndex === 0) {
        // remove object from objArray
        console.log("I remove obj: ", objArray[objIndex], "with index value of (", objIndex, ") from objArray.");  // for debugging purpose
        objArray.splice(objIndex, 1);
        return true;
    } else {
        return false;
    }
    
}

// produce a random number from zero (0) to the maximum number specified
export function randAtInt(maxNum) {
  return Math.floor(Math.random() * maxNum);
}


// validate a regex expression
export function checkRegex(inputElement, regex, validMsg="Valid", failMsg="Invalid input") {
  if (regex.test(inputElement.value)) {
      inputElement.title = validMsg;
      inputElement.setCustomValidity("");
      return true;
  } else {
      inputElement.setCustomValidity(failMsg);
      inputElement.focus();
      inputElement.title = failMsg;
      return false;
  }
}


/***********************************
****** DISPLAYS/NOTIFICATION *******
***********************************/
export function alertMessage(message, scroll=true, disapear=5000, hideCloseBtn=false, faAnimationClass="", animationSpeed="2s") {
  const fixedAlertsHolderId = "#fixed-alerts-holder";  // use for holder non-scrolling alert

  const alertHolder = document.createElement("div");
  alertHolder.setAttribute("class", "alertHolder");

  const alertCloseBtn = document.createElement("button");
  alertCloseBtn.setAttribute("class", "alertCloseBtn");
  alertCloseBtn.innerHTML = "⨉";
  alertCloseBtn.addEventListener("click", ()=> {
    scroll ? document.body.removeChild(alertHolder) : document.querySelector(fixedAlertsHolderId).removeChild(alertHolder);
  })

  const alertMsgHolder = document.createElement("span");
  alertMsgHolder.innerHTML = message;
  alertMsgHolder.setAttribute("class", faAnimationClass);
  alertMsgHolder.style.animationDuration = animationSpeed;

  // append elements
  alertHolder.appendChild(alertMsgHolder);
  // play alert sound
  if (sfx) {
    sfx.playAlertNotificationSound();
  }

  if (!hideCloseBtn) {
      alertHolder.appendChild(alertCloseBtn);
  }

  if (scroll) {
      document.querySelector("main").insertAdjacentElement("beforebegin", alertHolder);
      window.scrollTo({ top: 0, behavior: "smooth"});
  } else {
      document.querySelector(fixedAlertsHolderId).appendChild(alertHolder);
  }

  // remove error withing some time
  if (typeof(disapear) == "number" && disapear != null) {
      setTimeout(() => {
          const animationTime = 2;
          alertHolder.style.transition = `opacity ${animationTime}s`;
          alertHolder.style.opacity = "0";
          setTimeout(() => {
            if (scroll) {
              if (document.body.contains(alertHolder)) document.body.removeChild(alertHolder);
            } else {
              if (document.querySelector(fixedAlertsHolderId).contains(alertHolder)) document.querySelector(fixedAlertsHolderId).removeChild(alertHolder);
            }
          }, animationTime * 1000);
      }, disapear);
  }
}


export function removeAllAlert(fixedAlert=true) {
const alertHolderClass = ".alertHolder";
  const fixedAlertsHolderId = "#fixed-alerts-holder";  // use for holder non-scrolling alert
  document.querySelectorAll(alertHolderClass).forEach(alert => {
    if (fixedAlert) {
      document.querySelector(fixedAlertsHolderId).removeChild(alert);
    } else {
      document.body.removeChild(alert)
    }
  })
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  listData,
  position = "afterbegin",
  clear = false,
) {
  // check clear
  if (clear) parentElement.innerHTML = "";

  listData
    .map(templateFn)
    .forEach((dataElement) =>
      parentElement.insertAdjacentHTML(position, dataElement),
    );
}

export function renderWithTemplate(template, parentElement, callback=null, data=null) {
  parentElement.innerHTML = template;
  if (callback) {
    if (data) {
      callback(data);
    } else {
      callback();
    }
  }
}

export async function loadTemplate(path) {
  try {
    const response = await fetch(path);
    if (response.ok) {
      const data = await response.text();
      return data;
    }

    throw new Error(`Fetch Error: ${response.status}`);
  } catch (err) {
    console.error(err);
  }
}

export async function loadHeaderFooter() {
  // get parent element
  const parentHeader = document.getElementById("main-header");
  const parentFooter = document.getElementById("footer");

  // get path
  const headerPath = "/partials/header.html";
  const footerPath = "/partials/footer.html";

  // get template
  const header = await loadTemplate(headerPath);
  // console.log(header)  // for testing purpose
  const footer = await loadTemplate(footerPath);

  // render template
  renderWithTemplate(header, parentHeader, updateCartCount);
  renderWithTemplate(footer, parentFooter);
}

// takes a form element and returns an object where the key is the "name" of the form input.
export function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

export function back() {
    setTimeout(() => {
        history.back();
    }, 200);
}


// Temporally disable console.log
export function tempDisableConsoleLog(time=3000) {
    const originalConsoleLog = console.log;  // store original console.log function
    // change function
    console.log = function (a = null, b = null, c = null, d = null, e = null, f = null) {};  // set to empty function

    setTimeout(() => {
        console.log = originalConsoleLog;
    }, time);
}

// Temporally disable console.error
export function tempDisableConsoleError(time=3000) {
  const originalConsoleError = console.error;  // store original console.error function
  // change function
  console.error = function (a = null, b = null, c = null, d = null, e = null, f = null) {};  // set to empty function

  setTimeout(() => {
      console.error = originalConsoleError;
  }, time);
}



/***********************************************************
************ OTHER SPECIFIC IMPORTANT FUNCTIONS ************
***********************************************************/
export async function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            // already loaded
            resolve();
            return;
        }
        
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => reject(new Error("Failed to load script."));
        document.head.appendChild(script);
    });
}

// clean data before sending it to the server
function encodeElementData(element_or_value, isElement=true, caseSensitive=false) {
    if (isElement) {
      element_or_value = element_or_value.value.trim();
    } else {
      element_or_value = element_or_value.trim();
    }

    if (!caseSensitive) {
      element_or_value = encodeURI(element_or_value.toLowerCase());
    } else {
      element_or_value = encodeURI(element_or_value);
    }

    return element_or_value;
}

// check file data before sending
function encodeElementFileData(fileElementInput) {
  return fileElementInput.files[0] != null ? fileElementInput.files[0] : '';
}

function decodeData(data) {
    return decodeURI(data);
}


// display empty
function displayEmpty(displayElement, emptyText="EMPTY", awesomeIcon=`<i class="fa-regular fa-paper-plane fa-fade"></i>`, customStyling=null) {
    displayElement.innerHTML = '';
    displayElement.innerHTML = `<div class="empty-result" style="${customStyling}">
                                    ${awesomeIcon}<br>${emptyText}
                                </div>`;
}


// prevent form submition of keydown enter
function preventKeyEnterFormSubmition() {
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && event.target.type != 'textarea') {
      event.preventDefault();
      console.log("Prevent Key Enter Form Submition is active!");  // for testing purpose
    }
  })
}

// character counter
function characterCounter(inputElement, counterDisplayElement) {
  // get max-length of the characters allowed in the input
  let charMaxLength = inputElement.getAttribute("maxlength");
  // console.log(charMaxLength);  // for testing purpose

  // count the number of characters in the character element
  let characters = inputElement.value;
  let charCount = characters.split("").length;
  // console.log(charCount);  // for testing purpose

  // display character count and max length
  counterDisplayElement.innerHTML = `(${charCount}/${charMaxLength})`;
}

// advance character counter
export function inputCharacterCounter(inputElement, counterDisplayElement) {
  inputElement.addEventListener('focusin', ()=> {
    // set initial character counter
    characterCounter(inputElement, counterDisplayElement);
    // display character counter
    counterDisplayElement.style.display = 'inline-block';
  })
  inputElement.addEventListener('focusout', ()=> {
      counterDisplayElement.style.display = 'none';
  })
  inputElement.addEventListener('keyup', ()=> {
      characterCounter(inputElement, counterDisplayElement);
  })
}

// make textarea element fit content
function textareaAutoResize(element) {
  // get max height if selected
  element.style.height = 'auto';
  let currentHeight = parseFloat(element.scrollHeight);
  let maxHeight = parseFloat(window.getComputedStyle(element).maxHeight);
  console.log(`Current Height: ${currentHeight}; Max Height: ${maxHeight}`);  // for testing purpose

  if (currentHeight < maxHeight) {
    element.style.height = element.scrollHeight + 'px';
  } else {
    element.style.height = currentHeight + 'px';
  }
}

// change selected button color (using class name)
function changeSelectedBtnColorInClass(className, selectedBtnElement, newBgColor, newTextColor) {
  const currentBgColor = getComputedStyle(selectedBtnElement).backgroundColor;
  const currentTextColor = getComputedStyle(selectedBtnElement).color;
  // console.log(`CURRENT BTN BG-COLOR: ${currentBgColor}\nCURRENT BTN TEXT-COLOR: ${currentTextColor}`);  // for debugging purpose

  // check if color change was made before changing selected btn style
  if (currentBgColor != newBgColor && currentTextColor != newTextColor) {
      // get all buttons with class name
      let allClassElements = document.querySelectorAll(`.${className}`);
      // update selected button style
      selectedBtnElement.style.backgroundColor = newBgColor;
      selectedBtnElement.style.color = newTextColor;
      // update non-selected buttons style
      allClassElements.forEach(button => {
          if (button != selectedBtnElement) {
              button.style.backgroundColor = currentBgColor;
              button.style.color = currentTextColor;
          }
      })
  }
}

// pause all other videos on a video play
function pauseAllOtherVideos(currentVideo=null) {
  let allVideo = document.querySelectorAll('video');
      // remove current video from all video list
      // console.log(allVideo);  // for testing purpose
      allVideo.forEach(video => {
        if (video != currentVideo) {
          video.pause();
        }
      });
}

// paulse specific videos
function pauseVideosByClass(videoClass) {
  let videos = document.querySelectorAll(`.${videoClass}`);
      // console.log(allVideo);  // for testing purpose
      videos.forEach(video => {
        video.pause();
      });
}

// mute all videos
function muteAllOtherVideos(currentVideo=null) {
  let allVideo = document.querySelectorAll('video');
      // remove current video from all video list
      // console.log(allVideo);  // for testing purpose
      allVideo.forEach(video => {
        if (video != currentVideo) {
          video.muted = true;
        }
      });
}

// view password
export function viewPassword(element) {
  let allPassInput = document.querySelectorAll(".password");
  allPassInput.forEach((input) => {
    input.type == "password"
      ? (input.type = "text")
      : (input.type = "password");
    input.type == "password"
      ? (element.innerHTML = '<i class="fa-solid fa-eye"></i>')
      : (element.innerHTML = '<i class="fa-solid fa-eye-slash"></i>');
  });
}

// clear all inputs and textarea
export function clearAllInputsAndTextarea() {
  let allInputs = document.querySelectorAll('input');
  let allTextarea = document.querySelectorAll('textarea');
  allInputs.forEach((input)=> {
    input.value = '';
    input.innerHTML = '';
  })
  allTextarea.forEach((textarea)=> {
    textarea.value = '';
    textarea.innerHTML = '';
  })
}


export function copyTextValue(element, textValue = null, copiedText="Copied!", delay=5000) {
  if (!textValue) {
    if (element instanceof HTMLElement) textValue = element.textContent; 
  }
  // Copy text
  navigator.clipboard.writeText(textValue).then(function() {
    element.style.opacity = '.6';
    // get current element textContent
    let currentContent = element.innerHTML;
    element.innerHTML = `<abbr data-title="copied!">${copiedText}</abbr>`;
    setTimeout(() => {
      element.innerHTML = currentContent;
      element.style.opacity = '1';
    }, delay);
  }).catch(function(err) {
    alert('failed to copy', err);
  });
}

export function convertToLocalDate(timestamp) {
    if (timestamp) {
        const date = new Date(timestamp);

        // Array for Formating
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Getting date components
        const day = days[date.getDay()];
        const dateNum = date.getDate().toString().padStart(2, '0');
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const period = hours >= 12 ? 'pm' : 'am';

        hours = hours % 12 || 12; // converting to 12 hours format

        const dateFormat = `${day}, ${dateNum}-${month}-${year} ${hours}:${minutes}:${seconds} ${period}`;

        // return the formated date
        return dateFormat;
    } else {
        return timestamp;
    }
}

// format time duration
export function formatDuration(no_in_hrs) {
    let duration = "";
    if (no_in_hrs < 1) {
        let time = no_in_hrs * 60;
        duration = formatMinute(time);
    } else if (no_in_hrs.split(".").length > 1) {
        no_in_hrs = no_in_hrs.split(".");
        let hr = parseInt(no_in_hrs[0]);
        let min = parseFloat("0." + no_in_hrs[1]) * 60;
        duration = `${formatHour(hr)} ${formatMinute(min)}`;
    } else {
        duration = formatHour(no_in_hrs);
    }

    return duration;


    // helper functions
    function formatHour(numberInHour, abbr=true) {
        if (abbr) {
            return numberInHour > 1 ? `${numberInHour} hrs` : `${numberInHour} hr`;
        } else {
            return numberInHour > 1 ? `${numberInHour} hours` : `${numberInHour} hour`;
        }
    }

    function formatMinute(numberInMinute, abbr=true) {
        if (abbr) {
            return numberInMinute > 1 ? `${numberInMinute} mins` : `${numberInMinute} min`;
        } else {
            return numberInMinute > 1 ? `${numberInMinute} minutes` : `${numberInMinute} minute`;
        }
    }
}

// get age from input
export function getAge(inputElement_or_inputDateString) {
  let birthdate = inputElement_or_inputDateString;
  if (typeof(inputElement_or_inputDateString) == 'object') {
    birthdate = inputElement_or_inputDateString.value;
  }
  birthdate = new Date(birthdate);
  let now = Date.now();
  now = new Date(now);
  let oneYearInMilliseconds = 31557600000;
  const age = Math.floor((now - birthdate)/ oneYearInMilliseconds);
  // console.log(`Age: ${age}`);  // for testing purpose
  return age;
}

// get age range
function getAgeRange(inputElement_or_inputDateString) {
    const age = getAge(inputElement_or_inputDateString);
    let ageRange;
    if (age < 10) {
      ageRange = "0 - 9";
    } else if (age < 18) {
      ageRange = "10 - 17";
    } else if (age < 22) {
      ageRange = "18 - 21";
    } else if (age < 26) {
      ageRange = "22 - 25";
    } else if (age < 30) {
      ageRange = "26 - 29";
    } else if (age < 34) {
      ageRange = "30 - 33";
    } else {
      ageRange = "34+";
    }

    return ageRange;
}


export function searchFilterList(list, searchValue, checkingWords = ["firstname", "middlename", "lastname"]) {
  if (!searchValue || !String(searchValue).trim()) return list;

  const tokens = String(searchValue).toLowerCase().trim().split(/\s+/);

  return list.filter(person => {
    // collect searchable words safely (guarding against null/undefined)
    const words = checkingWords
      .map(f => (person[f] || "").toLowerCase())
      .filter(Boolean); // remove empty strings

    if (words.length === 0) return false; // nothing to match against

    // require that every token finds a match among the name words (AND semantics)
    return tokens.every(token => words.some(word => tokenMatchesWord(token, word)));
  });


  // HELPER FUNCTIONS
  // Levenshtein Distance (measures how close two words are)
  function levenshtein(a = "", b = "") {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (a[i - 1] === b[j - 1]) dp[i][j] = dp[i - 1][j - 1];
        else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
    return dp[m][n];
  }

  // ----- decide allowed fuzzy edits based on token length -----
  function allowedEdits(token) {
    const L = token.length;
    if (L <= 2) return 0;    // tiny tokens => no fuzzy (avoid false matches)
    if (L <= 4) return 1;    // short token => allow 1 edit
    if (L <= 7) return 2;    // medium token => allow 2 edits
    return 3;                // longer tokens => allow a few edits
  }

  // ----- test whether a single search token matches a name word -----
  function tokenMatchesWord(token, word) {
    if (!word) return false;
    if (word.includes(token)) return true;                     // substring match (fast)
    const thresh = allowedEdits(token);
    if (thresh === 0) return false;                            // don't do fuzzy for tiny tokens
    return levenshtein(token, word) <= thresh;                 // fuzzy fallback
  }
}

// Compare two arrays if they are same (order-independent)
export function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  
  const count = {};
  
  // Count occurrences in first array
  for (const item of arr1) {
    count[item] = (count[item] || 0) + 1;
  }
  
  // Subtract occurrences from second array
  for (const item of arr2) {
    if (!count[item]) return false;
    count[item]--;
  }
  
  // Check that all counts are zero
  for (const key in count) {
    if (count[key] !== 0) return false;
  }
  
  return true;
}

// GENERATOR FUNCTIONS
// password generator
export function generatePassword(firstName, lastName) {
  let randomNum = Math.round(Math.random() * 100);
  let names = [firstName, lastName, firstName.slice(0, 3), lastName.slice(0, 3), firstName.slice(0, 1), lastName.slice(0, 1)];
  
  let genPassword = '';
  while(genPassword.length < passwordMinLength) {
      genPassword += choice(names);
      console.log(`genPassword: ${genPassword}`);
  }

  return `${genPassword}${randomNum}`;
}

// username generator
export function generateUsername(firstName, lastName) {
  // Prepare Script Request
  if (window.XMLHttpRequest) {
      xml = new XMLHttpRequest();
  } else {
      xml = new ActiveXObject('Microsoft.XMLHTTP');
  }

  let count = 0;
  let generatedUsername = `${firstName}${lastName}`.toLowerCase();
  while(true) {
      if (count > 0) {
          generatedUsername = `${firstName}${lastName}${count}`.toLowerCase();
      }
      // Generate username and send to server script for checking
      if (generatedUsername == '') {
          generatedUsername = `user${count + 1}`;
      }

      // create the data to be sent
      let newUsername = generatedUsername;
      let data = `check_username_availability=${newUsername}`;

      xml.open('POST', processAccountRequest, false);
      // create header for sending values as post
      xml.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xml.send(data);

      if (xml.readyState == 4 && xml.status == 200) {
          response = xml.responseText;
          if (response == 'username-available') {
              break;
          } else {
              // increment count
              count++;
          }
      }
  }
  return generatedUsername;
}

// OTHER GENERAL FUNCTIONS

// count down
function countdown(maxTime, timeDuration=null, changeMainClockColorHolderElement = null, dayHolderElement, hourHolderElement, minuteHolderElement, secondHolderElement, callbackOnEnd='', parameter='', parameter2='', parameter3='', parameter4='') {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const countDownTime = new Date(maxTime).getTime();
  const interval = second;  // one second

  // NOTE: the parameter timeDuration holds the duration of the coutdown in milliseconds

  // time colors
  const enoughTimeColor = "darkgreen";
  const mediumTimeColor = "darkgoldenrod";
  const noTimeColor = "darkred";

  const counter = setInterval(() => {
      // get current time
      const now = new Date().getTime();

      // check count
      if (countDownTime >= now) {
          const distance = countDownTime - now;

          const countDay = Math.floor(distance / day);
          const countHour = Math.floor((distance % day) / hour);
          const countMinute = Math.floor((distance % hour) / minute);
          const countSecond = Math.floor((distance % minute) / second);
          // display count
          updateCountElement(countDay, countHour, countMinute, countSecond, changeMainClockColorHolderElement, timeDuration, distance);
          return true;
      } else {
          updateCountElement(0, 0, 0, 0);
          // clear counter interval
          clearInterval(counter);
          if (typeof(callbackOnEnd) == 'function') {
            if (parameter != '' && parameter != null && parameter2 != '' && parameter2 != null && parameter3 != '' && parameter3 != null && parameter4 != '' && parameter4 != null) {
              console.log("Calling the first statement in countdown");
              callbackOnEnd(parameter, parameter2, parameter3, parameter4);
            } else if (parameter != '' && parameter != null && parameter2 != '' && parameter2 != null && parameter3 != '' && parameter3 != null) {
              console.log("Calling the second statment in countdown");  // for debugging purpose
              callbackOnEnd(parameter, parameter2, parameter3);
            } else if (parameter != '' && parameter != null && parameter2 != '' && parameter2 != null) {
              console.log("Calling the third statment in countdown");  // for debugging purpose
              callbackOnEnd(parameter, parameter2);
            } else if (parameter != '' && parameter != null) {
              console.log("Calling the fouth statment in countdown");  // for debugging purpose
              callbackOnEnd(parameter);
            } else {
              console.log("Calling the last statment in countdown");  // for debugging purpose
              callbackOnEnd();
            }
          }
          return false;
      }
  }, interval);

  function updateCountElement(countDay, countHour, countMinute, countSecond, clockColorHolderElement=null, timeDuration, distance) {
      dayHolderElement.textContent = countDay;
      hourHolderElement.textContent = countHour;
      minuteHolderElement.textContent = countMinute;
      secondHolderElement.textContent = countSecond;

      if (clockColorHolderElement != null && typeof(clockColorHolderElement) == "object") {
          // console.log("TIME DURATION IN COUNTDOWN: ", timeDuration);  // for debugging purpose
          let timerButtonsElement = document.querySelectorAll(".stopwatch-timer-associate");
          // console.log("TIMER BUTTONS: ", timerButtonsElement);  // for debugging purpose

          const updateTimerBtnColor = (color)=> {
              if (timerButtonsElement.length > 0) {
                  timerButtonsElement.forEach((element) => {
                      element.style.backgroundColor = color;
                  });
              }
          }

          if (timeDuration) {
              // use time duration to change color
              // console.log("TIME DURATION: ", timeDuration, " DISTANCE: ", distance);  // for debugging purpose
              if ((parseInt(timeDuration) / 4) >= distance ) {
                  if (clockColorHolderElement.style.backgroundColor != noTimeColor) {
                      clockColorHolderElement.style.backgroundColor = noTimeColor;
                      updateTimerBtnColor(noTimeColor);

                      displayPopUpInfo.changeScreenAndCloseBtnColor(noTimeColor);
                      displayPopUpInfo.inform("Get ready to finish!");
                  }
              } else if ((parseInt(timeDuration) / 2) >= distance) {
                  if (clockColorHolderElement.style.backgroundColor != mediumTimeColor) {
                      clockColorHolderElement.style.backgroundColor = mediumTimeColor;
                      updateTimerBtnColor(mediumTimeColor);

                      displayPopUpInfo.changeScreenAndCloseBtnColor(mediumTimeColor);
                      displayPopUpInfo.inform("Half time left!");
                  }
              } else {
                  if (clockColorHolderElement.style.backgroundColor != enoughTimeColor) {
                      clockColorHolderElement.style.backgroundColor = enoughTimeColor;
                      updateTimerBtnColor(enoughTimeColor);
                  }
              }
          } else {
              // use time count down to change color
              if (countDay <= 0 && countHour <= 0 && countMinute <= 1) {
                  clockColorHolderElement.style.backgroundColor = noTimeColor;
                  updateTimerBtnColor(noTimeColor);

                  displayPopUpInfo.changeScreenAndCloseBtnColor(noTimeColor);
                  displayPopUpInfo.inform("One minute left! Get ready to finish!");
              } else if (countDay <= 0 && countHour <= 0 && countMinute <= 30) {
                  clockColorHolderElement.style.backgroundColor = mediumTimeColor;
                  updateTimerBtnColor(mediumTimeColor);
                  
                  displayPopUpInfo.changeScreenAndCloseBtnColor(mediumTimeColor);
                  displayPopUpInfo.inform("30 minutes left!");
              } else {
                  clockColorHolderElement.style.backgroundColor = enoughTimeColor;
                  updateTimerBtnColor(enoughTimeColor);
              }
          }
      }
  }
}


/***********************************************
******************* CLASSES ********************
***********************************************/
// store all storage keys
export class StorageKeys {
  constructor() {
      // storage keys
      this.title = "title";
      
      this.internalPlayersStorageKey = "internal-players";
      this.externalPlayersStorageKey = "external-players";
      this.gamesStorageKey = "games";
      this.settingsStorageKey = "settings";

      // game mode keys
      this.vsComputerModeKey = "vs-computer";
      this.hotSeatModeKey = "hotseat";
      this.onlineConnectModeKey = "online-connect";
      
      // vs-computer mode difficulty keys
      this.easyPlayKey = "easy";
      this.normalPlayKey = "normal";
      this.hardPlayKey = "hard";

      // online-connect mode connection-method keys
      this.joinKey = "join";
      this.hostKey = "host";

      // AI storage keys
      this.aiRetrievedDataKey = "ai-data-storage";

      // defaults
      this.defaultResponsiveVoice = "Australian Male";

      // DEFAULT GAME SETTINGS
      this.defaultGameSettings = {
          speak : true,
          voice : this.defaultResponsiveVoice,
          music : true,
          sound : true,
          musicVolume : .5,
          sfxVolume : 1,
      };
  }
}

// STOP WATCH CLASS
export class Stopwatch {
    constructor(stopTime, timeDuration=undefined, callBackOnEnd = () => {}, param=undefined, param2=undefined, param3=undefined, param4=undefined) {
        this.stopTime = stopTime;  // end time
        this.timeDuration = timeDuration;  // the duration of the count in milliseconds;
        this.callBackOnEnd = callBackOnEnd;
        this.param = param;
        this.param2 = param2;
        this.param3 = param3;
        this.param4 = param4;

        // others
        this.timerIsHidden = false;

        this.clockBody = document.createElement("div");
        this.clockBody.setAttribute("class", "clock-body");
    }

    // display classic clock
    displayDigitalClock(displayElement=null, displayTimeColor=true, displayTimerHideBtn=true) {
        const structure = `<h2>TIME LEFT</h2>
                            <div class="digitalClockCountDown">
                                <span class="count-down-count-holder" id="count-down-day">DD</span>
                                <span class="count-down-count-holder" id="count-down-hour">HH</span>
                                <span class="count-down-count-holder" id="count-down-minute">MM</span>
                                <span class="count-down-count-holder" id="count-down-second">SS</span>
                            </div>`
        const digitalClockMainHolder = document.createElement("div");
        digitalClockMainHolder.setAttribute("class", "digitalClockMainHolder");
        digitalClockMainHolder.innerHTML = structure;

        // FUNCTIONS
        const setHiddenState = (button) => {
            if (this.timerIsHidden) {
                // display timer
                this.clockBody.style.right = "0";
                this.timerIsHidden = false;
                button.innerHTML = closeIcon;
            } else {
                // hide timer
                this.clockBody.style.right = "-100%";
                this.timerIsHidden = true;
                button.innerHTML = openIcon;
            }
        }

        // create open and close btn
        const openIcon = '<i class="fa-solid fa-stopwatch"></i>';
        const closeIcon = '<i class="fa-solid fa-circle-xmark"></i>';

        const displayTimerBtn = document.createElement("button");
        displayTimerBtn.setAttribute("class", "display-timer-btn stopwatch-timer-associate");
        if (this.timerIsHidden) {
            displayTimerBtn.innerHTML = openIcon;
        } else {
            displayTimerBtn.innerHTML = closeIcon;
        }

        displayTimerBtn.addEventListener("click", ()=> {
            setHiddenState(displayTimerBtn);
        })

        this.clockBody.appendChild(digitalClockMainHolder);
        // include clockBody to page
        if (displayElement != null && typeof(displayElement) == "object") {
            if (displayTimerHideBtn) {
              displayElement.appendChild(displayTimerBtn);
            }
            displayElement.appendChild(this.clockBody);
        } else {
            if (displayTimerHideBtn) {
              document.body.appendChild(displayTimerBtn);
            }
            document.body.appendChild(this.clockBody);
        }

        // get elements
        const dayHolder = document.getElementById('count-down-day');
        const hourHolder = document.getElementById('count-down-hour');
        const minuteHolder = document.getElementById('count-down-minute');
        const secondHolder = document.getElementById('count-down-second');

        // set counter
        console.log("STOP TIME at StopWatch: ", this.stopTime);  // for debugging purpose
        countdown(this.stopTime, this.timeDuration, displayTimeColor ? this.clockBody : undefined, dayHolder, hourHolder, minuteHolder, secondHolder, this.callBackOnEnd, this.param, this.param2, this.param3, this.param4);
    }
}

// CALCULATOR CLASS
export class Caculators {
    constructor () {
        this.calculatorIsHidden = true;  // hide state of calculator

        this.calculatorBody = document.createElement("div");
        this.calculatorBody.setAttribute("class", "calculator-body");
    }

    async desmosCalculator(displayElement=null) {
        // Load desmos script API
        const desmosAPIScript = "https://www.desmos.com/api/v1.11/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
        await loadScript(desmosAPIScript);

        // FUNCTIONS
        const setHiddenState = (button) => {
            if (this.calculatorIsHidden) {
                // display timer
                this.calculatorBody.style.right = "0";
                this.calculatorIsHidden = false;
                button.innerHTML = closeIcon;
            } else {
                // hide timer
                this.calculatorBody.style.right = "-100%";
                this.calculatorIsHidden = true;
                button.innerHTML = openIcon;
            }
        }

        // create open and close btn
        const openIcon = '<i class="fa-solid fa-calculator"></i>';
        const closeIcon = '<i class="fa-solid fa-circle-xmark"></i>';

        const displayCalculatorBtn = document.createElement("button");
        displayCalculatorBtn.setAttribute("class", "display-calculator-btn");
        if (this.calculatorIsHidden) {
            displayCalculatorBtn.innerHTML = openIcon;
        } else {
            displayCalculatorBtn.innerHTML = closeIcon;
        }

        displayCalculatorBtn.addEventListener("click", ()=> {
            setHiddenState(displayCalculatorBtn);
        })
      
        // input calculator
        if (displayElement != null && typeof displayElement == "object") {
            displayElement.appendChild(displayCalculatorBtn);
            displayElement.appendChild(this.calculatorBody);
        } else {
            document.body.appendChild(displayCalculatorBtn);
            document.body.appendChild(this.calculatorBody);
        }

        // render calculator
        Desmos.GraphingCalculator(this.calculatorBody);
    }
}

// LARGE DISPLAY POPUP
export class LargePopUp {
  constructor() {
      this.isClosed = true;
      this.mainFrame = document.createElement("div");
      this.screen = document.createElement("div");
      this.closeBtn = document.createElement("button");

      this.init();
  }

  init() {
      // SET ATTRIBUTES
      this.mainFrame.setAttribute("class", "largePopUpMainFrame");
      this.screen.setAttribute("class", "largePopUpScreen");
      this.closeBtn.setAttribute("class", "largePopUpCloseBtn");
      this.closeBtn.innerHTML = "⨉";

      // SET LISTENERS
      // close with closeBtn
      this.closeBtn.addEventListener("click", ()=> {
          this.close();
      })

      // close with escape key press
      document.addEventListener("keyup", (event) => {
          if (event.key == "Escape") {
              this.close();
          }
      })

      // close screen on screen click outside content
      this.screen.addEventListener("click", (event)=> {
          if (this.screen.children[0]) {
              const contentHolder = this.screen.children[0];
              // get contetHolder boundary
              const boundary = contentHolder.getBoundingClientRect();
              const isInBoundry = (
                event.clientX >= boundary.left &&
                event.clientX <= boundary.right &&
                event.clientY >= boundary.top &&
                event.clientY <= boundary.bottom
              );

              if (!isInBoundry) {
                  this.close();
              }
          }
      })

      // APPEND ELEMENTS
      this.mainFrame.appendChild(this.screen);
  }

  display(htmlElement_or_template, includeCloseBtn=true) {
      if (typeof(htmlElement_or_template) == "object") {
          // add content to screen
          this.screen.appendChild(htmlElement_or_template);
      } else {
          this.screen.innerHTML = htmlElement_or_template
      }

      // add close button as needed
      if (includeCloseBtn) {
          this.mainFrame.appendChild(this.closeBtn);
      }

      // add main frame to display
      document.body.prepend(this.mainFrame);

      // update isClosed
      this.isClosed = false;
  }

  close() {
      if (!this.isClosed) {
          if (document.body.contains(this.mainFrame)) {
              document.body.removeChild(this.mainFrame);
              // update isClosed
              this.isClosed = true;
              return true;
          }
      }

      return false;
  }
}


// INFORM DISPLAY
export class InformPopUp {
  constructor() {
      this.isClosed = true;
      this.mainFrame = document.createElement("div");
      this.screen = document.createElement("div");
      this.closeBtn = document.createElement("button");

      this.init();

      this.speech = new ResponsiveVoice();
  }

  init() {
      // SET ATTRIBUTES
      this.mainFrame.setAttribute("class", "informPopUpMainFrame");
      this.screen.setAttribute("class", "informPopUpScreen");
      this.closeBtn.setAttribute("class", "informPopUpCloseBtn");
      this.closeBtn.innerHTML = "⨉";

      // SET LISTENERS
      // close with closeBtn
      this.closeBtn.addEventListener("click", ()=> {
          this.close();
      })

      // close with escape key press
      document.addEventListener("keyup", (event) => {
          if (event.key == "Escape") {
              this.close();
          }
      })

      // close screen on screen click outside content
      this.screen.addEventListener("click", (event)=> {
          if (this.screen.children[0]) {
              const contentHolder = this.screen.children[0];
              // get contetHolder boundary
              const boundary = contentHolder.getBoundingClientRect();
              const isInBoundry = (
                event.clientX >= boundary.left &&
                event.clientX <= boundary.right &&
                event.clientY >= boundary.top &&
                event.clientY <= boundary.bottom
              );

              if (!isInBoundry) {
                  this.close();
              }
          }
      })

      // APPEND ELEMENTS
      this.mainFrame.appendChild(this.screen);
  }

  inform = async (message, writeByLater=true, includeCloseBtn=true, closeTime=4000) => {
    
      return new Promise(async (resolve, reject) => {
          // set checkers
          let doneWriting = false;
          this.screen.innerHTML = "";  // clear screen

          // checker to authomatically close popup
          const authomaticClosePopUp = async ()=> {
              return new Promise((resolve, reject) => {
                  const checkFinish = setInterval(async () => {
                      if (this.isClosed) {
                          clearInterval(checkFinish);
                          console.log("The element is closed/removed from the document in authomaticClosePopUp");  // for debugging purpose
                          return resolve(true);
                      } else if (doneWriting && !this.speech.isSpeaking()) {
                          clearInterval(checkFinish);
                          await this.close();
                          console.log("I'm done writing in authomaticClosePopUp");  // for debugging purpose
                          return resolve(true);
                      } else {
                          // increase interval check
                          if (!this.speech.isSpeaking()) {
                              // if just checking for writing, delay close time a little more
                              closeTime += 3000;  // add 3 sec more each time it checks;
                              console.log("increased popup authomatic closeTime. Time: ", closeTime);  // for debugging purpose
                          }
                          console.log("checked : ", closeTime);  // for debugging purpose
                      }
                  }, closeTime);
              })
          }

          // add close button as needed
          if (includeCloseBtn) {
              this.mainFrame.prepend(this.closeBtn);
          }

          // add main frame to display
          document.body.prepend(this.mainFrame);

          // update isClosed
          this.isClosed = false;

          // display content
          if (typeof(message) == "object") {
              // add content to screen
              this.screen.appendChild(message);
              doneWriting = true;
          } else {
              // speak message (only speak when sound is activated in settings)
              setTimeout(() => {
                this.speech.speak(message);
              }, 200);

              if (writeByLater) {
                console.log("I Just start writing");  // for debugging purpose
                console.log("refElement: ", this.screen);  // for debugging purpose
                console.log("RefElement In Doc: ", document.body.contains(this.screen));  // for debugging purpose
                doneWriting = await textByLetter(message, this.screen);
                console.log("I'm done writing");  // for debugging purpose
              } else {
                this.screen.innerHTML = message
                doneWriting = true;
              }
          }

          // close popup
          console.log("Running authomcaticClosePopup");  // for debugging purpose
          await authomaticClosePopUp();  // a checker to authomatically close popup with time
          resolve(true);
      })
  }

  close = async () => {
      return new Promise((resolve, reject) => {
          if (!this.isClosed) {
              if (document.body.contains(this.mainFrame)) {
                  this.mainFrame.style.opacity = "0";
                  // end speaking if active
                  this.speech.stopSpeaking();
                  document.body.removeChild(this.mainFrame);
                  this.mainFrame.style.opacity = "1";  // set back the opacity of the element
                  // update isClosed
                  this.isClosed = true;
                  resolve(true);
              } else {
                  resolve(false);
              }
          }
          resolve(false);
      })
  }
}


// RESPONSIVE VOICE
export class ResponsiveVoice {
    constructor() {
        this.gameKeys = new StorageKeys();
        this.settingsStorageKey = this.gameKeys.settingsStorageKey;
        this.settings = null;  // holds game settings
        this.voice = null;  //  holds user selected voice on/off option (true/false) value
        this.setVoice = null;  // settings selected voice type
        this.voiceReady = false;  // for tracking responsive-voice script load;
        this.networkConnection = new CheckNetWorkConnection()// check connection

        // urls
        this.urlResponsiveVoice = "https://code.responsivevoice.org/responsivevoice.js?key=oJvDiYQK";

        // set defaults
        this.defaultResponsiveVoice = "Australian Male";

        this.init();
    }

    async init() {
        // only load voice when it is set in settings as true or by default when setting is not set
        this.getCurrentSettings();
        if (this.voice) {
            if (this.networkConnection.isConnected(false)) {
              tempDisableConsoleError();
              tempDisableConsoleLog();
              await this.loadResponsiveVoice();
            }
        }
    }

    getCurrentSettings() {
      this.settings = getLocalStorage("settings") || {};
      this.voice = this.settings.speak === false ? false : true;
      this.setVoice = this.settings.voice || this.defaultResponsiveVoice;
    }

    // load responsive voice script
    async loadResponsiveVoice() {
      return new Promise((resolve, reject) => {
            // end process if voice set to be off
            this.getCurrentSettings();
            if (!this.voice) {
                resolve(false);
                this.voiceReady = false;
                return false;
            }

            // check if responsive voice has already been loaded
            if (typeof window.responsiveVoice != "undefined") {
                this.voiceReady = true;
                resolve(true);
            }

            // load responsive voice script
            const script = document.createElement("script");
            script.src = this.urlResponsiveVoice;
            script.onload = () => {
                this.voiceReady = true;
                resolve(true);
            }
            script.onerror = () => reject("Failed to load voice script.");
            document.head.appendChild(script);
      })
    }

    // get all voices
    // resume voice
    getVoices() {
        this.networkConnection.isConnected(false);  // check network connection
        if (this.voiceReady && window.responsiveVoice) {
            tempDisableConsoleLog();
            return window.responsiveVoice.getVoices();
        } else {
            // produce script not loaded warning when voice is set true in settings or set true by default
            if (this.voice) {
                console.warn("Voice script not ready (loaded) yet");
            }
            return [];
        }
    }

    // speak (default male voice)
    speak(text, voice = this.setVoice, rate = 1, pitch = 1, volume = 1) {
        this.networkConnection.isConnected(false);  // check network connection
        if (this.voice && this.voiceReady && window.responsiveVoice) {
            tempDisableConsoleLog();
            window.responsiveVoice.speak(text, voice, { rate: rate, pitch: pitch, volume: volume});
        } else {
            // produce script not loaded warning when voice is set true in settings or set true by default
            if (this.voice) {
                console.warn("Voice script not ready (loaded) yet");
            }
        }
    }

    // speak customized voice with pitch rate and volume (default female voice)
    speakCustom(text, voice = this.defaultResponsiveVoice, rate = 1, pitch = 1, volume = 1) {
        this.networkConnection.isConnected(false);  // check network connection
        if (this.voice && this.voiceReady && window.responsiveVoice) {
            tempDisableConsoleLog();
            window.responsiveVoice.speak(text, voice, {
                rate,
                pitch,
                volume,
            });
        } else {
            // produce script not loaded warning when voice is set true in settings or set true by default
            if (this.voice) {
                console.warn("Voice script not ready (loaded) yet");
            }
        }
    }

    // stop voice while speaking
    stopSpeaking() {
        this.networkConnection.isConnected(false);  // check network connection
        if (this.voice && this.voiceReady && window.responsiveVoice) {
            if (this.isSpeaking()) {
                window.responsiveVoice.cancel();
            }
        } else {
            // produce script not loaded warning when voice is set true in settings or set true by default
            if (this.voice) {
                console.warn("Voice script not ready (loaded) yet");
            }
        }
    }

    // check current state of voice if it's active or not
    isSpeaking() {
        this.networkConnection.isConnected(false);  // check network connection
        if (this.voice && this.voiceReady && window.responsiveVoice) {
            return window.responsiveVoice.isPlaying();
        } else {
            // produce script not loaded warning when voice is set true in settings or set true by default
            if (this.voice) {
                console.warn("Voice script not ready (loaded) yet");
            }
            return false;
        }
    }

    // pause voice
    pauseSpeaking() {
        this.networkConnection.isConnected(false);  // check network connection
        if (this.voice && this.voiceReady && window.responsiveVoice) {
            window.responsiveVoice.pause();
        } else {
            // produce script not loaded warning when voice is set true in settings or set true by default
            if (this.voice) {
                console.warn("Voice script not ready (loaded) yet");
            }
        }
    }


    // resume voice
    resumeSpeaking() {
        this.networkConnection.isConnected(false);  // check network connection
        if (this.voice && this.voiceReady && window.responsiveVoice) {
            window.responsiveVoice.resume();
        } else {
            // produce script not loaded warning when voice is set true in settings or set true by default
            if (this.voice) {
                console.warn("Voice script not ready (loaded) yet");
            }
        }
    }

    // check speaking for a period of time
    checkSpeaking(callback=null, clearCheckTime = 15000) {
      this.networkConnection.isConnected(false);  // check network connection
      const checkSpeak = setInterval(() => {
          if (this.isSpeaking()) {
              // clear interval check
              clearInterval(checkSpeak);
              if (typeof callback == "function") {
                  callback();  // call callback function
              }
          } else {
              setTimeout(() => {
                  clearInterval(checkSpeak);
              }, clearCheckTime);  // clear interval after 15 seconds of not speaking
          }
      }, 100);
    }

    // check if speaking has ended
    waitForSpeakingToEnd = async (intervalCheck=1000) => {
        this.networkConnection.isConnected(false);  // check network connection
        return new Promise((resolve, reject) => {
            const waiting = setInterval(() => {
                if (!this.isSpeaking()) {
                    // clear interval
                    clearInterval(waiting);
                    resolve(true);
                }
            }, intervalCheck);
        })
    }
}


// INSTANTIATE GLOBAL CLASSES
export const displayPopUpInfo = new InformPopUp();