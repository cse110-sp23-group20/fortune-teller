# Store all zodiac combination responses locally

## Decision Drivers
- How are we going to fetch the compatibility results for the user?

## Context and Problem Statement

When the user selects a zodiac pairing, we need to serve them a compatibility response. The issue however is if we should serve them the same response each time or try to give them a different, but similar response each time because getting the same response can be quite boring.

## Considered Options

- One response for all 33 unique combinations
- Make 1 or 2 more custom responses and pick a random one to serve each time
- Use some kind of API (maybe ChatGPT) to deliver a custom response

## Decision Outcome

Chosen option: For now we will just stick to using one response for all 33 unique combinations. Considering the time that we have left, adding extra features/complexity to our mini-app is not what we are trying to do. Once we have all 33 unique responses hard coded we can think about adding more or using an API to give us responses. We will reconsider this decision again once we have our mini-app completed and have the opportunity to add extra features.

# Question: How should the user choose their birthdate/zodiac sign

## Context and Problem Statement

When designing a feature that requires users to input their birthdate or zodiac sign, there are various methods to consider. The goal is to provide a user-friendly and intuitive interface that allows users to select their birthdate or zodiac sign easily and effortlessly.

## Decision Drivers

* User experience: The chosen method should provide a visually appealing, engaging, and intuitive experience for the user.
* Ease of use: The method should be simple and straightforward, allowing users to select their birthdate or zodiac sign without confusion.
* Flexibility: Users should have the ability to easily change their selection if needed.


## Considered Options

Scrolling to select:

* Pros:
  - easy to implement, hover -> rotate zodiac wheel based on wheel direction
  - allows for very consistent scrolling speeds

* Cons:
  - Might require additional user guidance to ensure intuitive navigation.
  - mobile users might not be able to use the app

Click on wheel to select:

* Pros:
  - Relatively easy and intuitive for users to interact with. (clicking highlights a certain part of the wheel)
* Cons:
  - Less visually striking compared to scrolling.
  - Implementation may pose some challenges (how are we going to make certain sections of the wheel glow when they are selected?)

Date input box:

* Pros:
  - Easiest to implement.
  - Intuitive for users who are familiar with date input fields.
* Cons:
  - The default design of the form might clash with the design of the rest of the site
  - Requires users to choose a specific date, which may be unnecessary for zodiac sign selection (date ranges work too)
  - Relatively difficult for users to select and change options on mobile (too small)

## Decision Outcome

Chosen option: Select zodiac signs by hovering and scrolling.  Although some additional user guidance may be necessary as it is not quite intuitive, such as through a FAQ or tutorial page, it is the easiest. We should first consider implementing this selection feature first, then add others if we have time. Basically, by choosing this option early in the project, we ensure that there is at least 1 input method that works well with the theme of our site.

# Question: How to indicate to the user that they have chosen a particular sign?

## Context and Problem Statement

With a way to select the zodiac signs, it is now crucial to provide them with a way to see and confirm their selection. In essence, the challenge is to find an effective and visually appealing way to indicate to the user that they have chosen a particular sign.

## Decision Drivers

Need a way to indicate which zodiac is being selected
  
## Considered Options

Highlighting the selected part of the wheel:

* Pros:
  - Offers a visually striking indication.
  - Provides intuitive and obvious feedback to the user.
* Cons:
  - Complex to implement, requiring precise highlighting techniques.
  - Potential technical challenges in achieving the desired visual effect.


Arrows next to a segment of the wheel:

* Pros:
  - Easy to implement.
  - Intuitive as arrows naturally point to the chosen option.
* Cons:
  - Might be perceived as less visually appealing compared to other options.


Pop-up image:

* Pros:
  - We can use it to fill the blank space in the middle of the wheel
  - Relatively straightforward to implement (dedicate a section for an image of the zodiac sign to appear).
* Cons:
  - We can no longer display any other information in the center of each wheel (like birthday information)
  - What image would we choose to fit the theme?

## Decision Outcome

chosen option: Use arrows next to a segment of the wheel to indicate the user's selected zodiac sign. While highlighting the chosen part of the wheel might be visually impressive, it could present implementation challenges and consume significant development time. By opting for arrows, we strike a balance between aesthetics and intuitiveness. The arrows serve as clear indicators, pointing to the selected segment and effectively confirming the user's choice. This solution is also easier to implement within the given time frame, allowing us to focus on other important aspects of the project while still providing a satisfactory user experience.

# Question: What kind of compatibility feedback should we provide?

## Context and Problem Statement

After users have submitted their zodiac signs or birthdates, it is important to provide them with relevant feedback regarding their compatibility. The feedback should align with traditional fortune-telling practices and focus on love relationships, which are typically of great interest to users. Additionally, considering the large number of possible zodiac sign combinations, the chosen method should be relatively straightforward to implement while still being engaging for the user.


## Decision Drivers

- What kind of compatibility results should we give?
- How should we display it?
  
## Considered Options

Simple love-related paragraph feedback generated by ChatGPT:

* Pros:
  - Offers interesting and tailored feedback specifically related to love relationships.
  - Aligns with the purpose and theme of the app.
* Cons:
  - Implementation may require effort due to generating appropriate and engaging paragraphs.
  - Could potentially become repetitive or less engaging over time.


Random compatibility percentage:

* Pros:
  - Easy to implement and requires minimal coding effort.
  - Directly conveys compatibility in a straightforward manner.
* Cons:
  - Might be perceived as less interesting or engaging compared to other options.
  - Lacks the personalized and narrative aspect of fortune-telling feedback.

## Decision Outcome

chosen option: provide users with simple love-related paragraph feedback generated by ChatGPT. This option offers tailored insights into love relationships, aligning with the fortune-telling theme and the users' primary interest. While coding and implementing engaging paragraphs may require some effort, it provides a more interactive and immersive experience for users. By incorporating ChatGPT-generated paragraphs, users can receive personalized and narrative feedback that enhances their engagement with the app, and if we have time we can even connect with the ChatGPT API to generate unique responses.