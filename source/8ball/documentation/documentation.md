# Documentation
This document contains a list of the decisions made during the development of the magic 8 ball application.

# Get 8-ball responses
```
A magic 8 ball needs to have a pool of responses to randomly output. So we just googled a list of some sample magic 8 ball responses and used that as the answer bank for our application.
```
# Add an 8 ball picture
```
A magic 8 ball application would not be a magic 8 ball app if there was no magic 8 ball icon anywhere. So we decided to stick one in the middle of the page to communicate that this really is a magic 8 ball application.
```
# Add a form
```
The user needs a way to ask the magic 8 ball something and a way to "submit" it for "processing" so we made an form that allows the user to do just that. We added an input that allows the user to type a question and a submit button so they can "submit" it to the 8-ball.
```
# Style the "ASK!" button
```
The "ASK!" button looked kind of boring so we looked up some cool buttons styled using CSS and chose one with on-hover particle effects that we all liked to make the button stand out.
```
# Add animation to 8 ball after "ASK!" button is pressed
```
The motive behind this is to give the user a visual indicator that their request/question has gone through and is being processed by the magic 8 ball. It also gives us an opportunity to add a delay before giving the user a response, just like how a magic 8 ball would in real life (responses are not instant).
```
# Add sound effect to 8 ball after "ASK!" button is pressed
```
From the 8-ball demos in class, we found the ones that had sound effects to be the most fun and engaging. Thus, we decided to make it so that when the "ASK!" button is pressed a sound effect would play along with the animation to make it "cooler".
```
# Add narration to the response
```
Like what we mentioned above, the 8-balls that had sound effects seemed better than the others so we decided to extend that a bit by having the 8-ball narrate the response out loud to us. Plus, this serves as an accessibility feature for those who are visually impaired.
```
# Add a background image
```
We got tired of staring at a white background and thought we should change it up a bit. So we had an image generation AI create us a "fortune telling, mysterious background" and made it the background of our website. The sizing/scaling is not perfect, but that can be addressed in future iterations of the product.
```
