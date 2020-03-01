Tempo Software Exercise - Front End
By: Pawel Leja

Written in React.JS

Here is my solution to the technical exercise for the front-end developer position. 

I have written this applet from the bottom up, beginning with api calls, setting up the data for use,
then constructing the functionality of the UI and finishing off with some styling.

In order to acquire user names, I use a recursive function to make calls for each user ID. During this time, a loading screen
is in place which shows progress out of total users.

Once the data is loaded, there are two views available: Team and Users, with Team as default.

Team view displays components for each time including team names, leader name, and a list of members. The member list can be toggled
with a button in order keep a default clean look. Members are alphabetized by last name.

User view displays all user names and their corresponding team names. They have also been alphabetized by last name.

Both modes contain a search function, which checks if the input string is contained within the user names (first and/or last) or team names (depending on the view mode).

You may access this app at: https://affectionate-brahmagupta-5e5b7d.netlify.com/ .
If the link is no longer avaialable, you can install the app by cloning this repository, running "npm install", then "npm start".

Thank you for testing my applet and I appreciate any feedback!