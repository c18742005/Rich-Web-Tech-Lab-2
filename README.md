# Rich Web App Tech - Lab 1
## Lab Instructions
### Problem 1 
- Phone Directory is a web application that allows a user to manage contacts.
    - Once a contact is saved, it appears in a table.
    - The list can be sorted by name.
    - The list can be filtered by phone number.

#### Functionality:
- It has three fields Name, Mobile and Email. All 3 are required fields. Clicking on the Add Contact button should add the contact to the table. Before adding a contact, the following validations should occur:
    - Name: Should contain only Alphabets and Space. Should be less than or equal to 20 characters in length.
    - Mobile: Should contain only Numbers. Should be equal to 10 characters in length.
    - Email: Should have a proper validation and should be less than 40 characters in length.
- Show an error div with id 'error' if there is any error in input format or if there is any empty field.
- Valid contacts should get added sequentially in the table.
- After adding a valid contact, all fields should be reset to empty.
- Clicking on the Name heading in the table should sort it by ascending order of the contact name.  Further clicks should alternately sort descending then ascending.
- The search should begin as soon as an input is typed by the user in the search field. It should filter rows based on the mobile number given in the search field.
- If there is no matching row for the search term, then the div with id 'noResult' should be made visible.  It should be hidden otherwise. Odd numbered data rows should have #f2f2f2 as the background color. 

### Problem 2
- The API you will work with is here: http://jsonplaceholder.typicode.com
- Using this API and the functional programming style of array operations, provide code to solve for the problems below. You MUST USE this FP style with  functions such as map, reduce, filter, flatmap and so on. If you find yourself using loops, you’re doing it wrong. Carefully think through which data transformations you need to apply in which order in your pipeline.

- For each answer, use console.log() to display the data (i.e. you do not have to build DOM objects):
    1.	List all of the post titles having more than six words
    2.	Show a word frequency map for all of the body contents of the posts

### Problem 3
- You will build a web application for querying user information from the Github API 

- Notes:
    - Use only native APIs, Javascript, HTML and CSS (no external libraries permitted)
    - You may use whatever style of async programming primitives you like such as callbacks, promises or streams.
    - The API endpoint for retrieving user information is https://api.github.com/users.
    - The user of your application can input a username and search in Github for that user’s information
    - The information should be displayed as shown, including the avatar picture at the top left
    - The repo information can be obtained by following the “repos_url”. You should implement a scrollable list to display these if the number exceeds 5
    - Marks will be awarded for code quality such as formatting and how DRY your code is