// Declare global variables
const contactName = document.querySelector('#name');
const contactNumber = document.querySelector('#mobile');
const contactEmail = document.querySelector('#email');
const addButton = document.querySelector('#add-contact-button');
const nameHeader = document.querySelector('#sort-name');
const search = document.getElementById('search-mobile');
let sorted = "";
let contacts = [];

/**
 * Function to handle what happens when the add contact button is clicked
 */
handleContactForm = (event) => {
    event.preventDefault();
    // Check if form is valid
    const formIsValid = validateForm(contactName.value, contactNumber.value, contactEmail.value);
     
    // Form is valid, create the contact
    if(formIsValid) {
        createContact();
    }
}

/**
 * Function to validate the contact form
 * Calls validation functions on the number, name, and email field values
 * Returns true if all are valid, else returns false
 */
validateForm = (cName, cNumber, cEmail) => {
    const nameValid = validateNameField(cName);
    const numberValid = validateNumberField(cNumber);
    const emailValid = validateEmailField(cEmail);
    
    // If name, number and email are valid, hide error div and return true
    if(nameValid && numberValid && emailValid) {
        hideError();
        return true;
    } else { // name, number, or email are invalid, return false
        return false;
    }
}

/**
 * Function to validate the name field of the contact form
 * Returns true if name is valid
 * Returns false if name is invalid
 */
validateNameField = (cName) => {
    const contactName = cName;
    const re = /[^A-z ]/; // Regex allows only letters and spaces

    // if name contains characters other than letters or spaces
    // Show error div with description and return false
    if(re.test(contactName)) {
        displayError("Error: Contact names can only contain letters or spaces");
        return false;
    }

    // if name is longer than 20 characters
    // Show error div with description and return false
    if(contactName.length > 20) {
        displayError("Error: Contact names must be less than 20 characters");
        return false;
    }

    return true;
}

/**
 * Function to validate number field of contact form
 * Returns true if number is valid
 * Returns false if number is invalid
 */
validateNumberField = (cNumber) => {
    const contactNumber = cNumber;
    const re = /[^0-9]/; // Regex that only allows number

    // if contact number contains characters other than numbers
    // Display error div with description and return false
    if(re.test(contactNumber)) {
        displayError("Error: Contact numbers can only contain numbers");
        return false;
    }

    // if contact number is not 10 digits
    // Display error div with description and return false
    if(contactNumber.length !== 10) {
        displayError("Error: Contact numbers must be 10 digits long");
        return false;
    }

    return true;
}

/**
 * Function to validate email field of contact form
 * Returns true if email is valid
 * Returns false if email is invalid
 */
validateEmailField = (cEmail) => {
    const contactEmail = cEmail;
    // Regex must follow the for "xxxx@xxxx.xxx"
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // if email is not a valid email
    // display error div with message and return false
    if(!re.test(contactEmail)) {
        displayError("Error: Email is not a valid email");
        return false;
    }

    // if email is longer than 40 chars
    // Display error div with description and return false
    if(contactEmail.length > 40) {
        displayError("Error: Email must be less than 40 characters long");
        return false;
    }

    return true;
}

/**
 * Function that displays the error div
 * errorMessage is the message to display
 */
displayError = (errorMessage) => {
    const errorDiv = document.getElementById('error');
    errorDiv.style.display='block'
    errorDiv.innerHTML = errorMessage;
}

/**
 * Function that hides the error div
 */
hideError = () => {
    const errorDiv = document.getElementById('error');
    errorDiv.style.display='none';
}

/**
 * Function that creates a contact
 * Contact is added to contacts array
 */
createContact = () => {
    const contact = {
        name: contactName.value,
        number: contactNumber.value,
        email: contactEmail.value
    };

    // Add the contact to the table and array
    addContactToTable();
    contacts.push(contact);

    // Reset form fields
    contactName.value = "";
    contactNumber.value = "";
    contactEmail.value = "";
}

/**
 * Function that adds the contact to the contact table
 */
addContactToTable = () => {
    // Create new table row with a cell for name, number and email
    const tabRef = document.getElementById('contact-table').getElementsByTagName('tbody')[0].insertRow();
    const nameCol = tabRef.insertCell(0);
    const numCol = tabRef.insertCell(1);
    const emailCol = tabRef.insertCell(2);

    // Add name, number and email to table columns
    nameCol.innerHTML = contactName.value;
    numCol.innerHTML = contactNumber.value;
    emailCol.innerHTML = contactEmail.value;

    // Set table to unsorted again
    sorted = "";
}

/**
 * Function that handles the sorting of the table
 * If table is unsorted, then table will be sorted ascending
 * If table is sorted ascending then table will be sorted descending
 */
sortTable = () => {
    // get rows and column length
    const rowLen = document.getElementById("contact-table").rows.length;
    const colLen = document.getElementById("contact-table").rows[0].cells.length;

    // Create 2d array of table
    let arrTable = [...Array(rowLen)].map(e => Array(colLen));

    for (let i = 0; i < rowLen; i++) { // loop through rows
        for (let j = 0; j < colLen; j++) { // loop through columns
            // assign value from each row x column to a 2d array by row x column
            arrTable[i][j] = document.getElementById("contact-table").rows[i].cells[j].innerHTML;
        }
    }

    // remove and store table header
    let th = arrTable.shift();

    // If array is not sorted, then sort the array ascending
    if(sorted !== "asc") {
        arrTable.sort(
            (a, b) => {
                if (a[0] === b[0]) {
                    return 0;
                } else {
                    return (a[0] < b[0]) ? -1 : 1;
                }
            }
        );

        sorted = "asc";
    } else { // array is sorted asc, reverse this to sort desc
        arrTable.reverse();
        sorted = "desc";
    }

    // Add table header back to array
    arrTable.unshift(th);

    // loop through each value in the 2d array and re-add them to the table
    for (let i = 0; i < rowLen; i++) {
        for (let j = 0; j < colLen; j++) {
            document.getElementById("contact-table").rows[i].cells[j].innerHTML = arrTable[i][j];
        }
    }

}

/**
 * Function to filter the table by mobile number
 */
filterTable = () => {
    const filter = search.value;
    const table = document.getElementById('contact-table');
    const tr = table.getElementsByTagName('tr');
    const showError = document.getElementById('noResult');
    let countHidden = 0;

    // Loop through all table rows, and hide values that dont match the search
    for (let i = 0; i < tr.length; i++) {
        // get the mobile number
        td = tr[i].getElementsByTagName("td")[1];

        if (td) {
            let mobileVal = td.textContent || td.innerText;

            // if value matches the filter then show the value
            if (mobileVal.indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else { // value does not match, hide the value
                tr[i].style.display = "none";
                countHidden++;
            }
        } 
    }

    // if all rows are hidden except the headers
    // There are no results so show the noResult div
    if(tr.length - 1 === countHidden) {
        showError.style.display = "block";
    } else { // there are results, hide the div
        showError.style.display = "none";
    }
}

/**
 * Function to listen for events on given elements
 */
listen = () => {
    // Add event listeners to elements
    addButton.addEventListener("click", handleContactForm);
    nameHeader.addEventListener("click", sortTable);
    search.addEventListener("input", filterTable);
}

listen();