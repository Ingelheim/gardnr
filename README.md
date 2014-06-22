Overview
========

About
-----
To Come

Development
===========
- update node packages via `npm install`
- start server with `node server.js`
- open `spec/SpecRunner.html` in your browser to run tests

Deployment to cloudControl
--------------------------
Only the first time:

1. sudo easy_install pip
2. sudo pip install cctrl
3. Create a User Account (if you haven't already):
  - cctrluser create
  - (Replace USERNAME and ACTIVATION_CODE with the values form the activation e-mail):
  - cctrluser activate USERNAME ACTIVATION_CODE

Every time:

1. cctrlapp gardnr push
2. cctrlapp gardnr deploy
3. check at http://gardnr.cloudcontrolled.com/
