---
# These are optional elements. Feel free to remove any of them.
status: {proposed | rejected | accepted | deprecated | … | superseded by [ADR-0005](0005-example.md)}
date: {YYYY-MM-DD when the decision was last updated}
deciders: {list everyone involved in the decision}
consulted: {list everyone whose opinions are sought (typically subject-matter experts); and with whom there is a two-way communication}
informed: {list everyone who is kept up-to-date on progress; and with whom there is a one-way communication}
---

# How will the user get the fortune

## Context and Problem Statement

For the user to get their fortune, there has to be a way for them to interact with the fortune cookie and get it. The issue is how we want the user to open it.

<!-- This is an optional element. Feel free to remove. -->

## Decision Drivers

- Ease of implementation
- User can easily understand how the website works at a glance

## Considered Options

- Having a button that will open the fortune cookie
- Having the image of the fortune cookie itself work as the action to open the fortune cookie, where multiple clicks gradually crack it open.

## Decision Outcome

Chosen option: "Having a button that will open the fortune cookie". We decided to have a button to open the fortune cookie and have the fortune be displayed below it. This is because it will be easy to implement and the user can easily understand how the website works at a glance. We may change this decision later if we have time.

<!-- This is an optional element. Feel free to remove. -->

### Consequences

- Good, because it was easy to implement and works how we expect it to.
- Bad, because it may seem unnatural to users and kind of plain. It might make more sense to have the fortune cookie crack by clicking the image of the fortune cookie itself.
<!-- numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Validation

{describe how the implementation of/compliance with the ADR is validated. E.g., by a review or an ArchUnit test} -->

<!-- This is an optional element. Feel free to remove. -->

## Pros and Cons of the Options

### Having a button that will open the fortune cookie where multiple clicks gradually crack it open.

<!-- This is an optional element. Feel free to remove. -->

- Good, because of ease of implementation
- Good, because its easy for a user to understand what to do and how the website works
  <!-- use "neutral" if the given argument weights neither for good nor bad -->
  <!-- * Neutral, because {argument c} -->
- Bad, because it may seem unnatural or plain
<!-- numbers of pros and cons can vary -->

### Having the image of the fortune cookie itself work as the action to open the fortune cookie

- Good, because it may seem more natural to users, to crack a fortune cookie it would make sense to click on the fortune cookie itself.
- Would be entertaining to gradually open a fortune cookie
  <!-- * Good, because {argument b} -->
  <!-- * Neutral, because {argument c} -->
- Bad, because it would be hard to implement

<!-- This is an optional element. Feel free to remove. -->
<!-- ## More Information -->

<!-- {You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.}

 --- -->

# Use speech synthesis to read out fortunes

## Context and Problem Statement

{Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.
You may want to articulate the problem in form of a question and add links to collaboration boards or issue management systems.}

When the user opens there fortune, there is no audio that reads it out to them. The problem is if we should add audio for it, and if so, use voice synthesis or make audio files ourself.

<!-- This is an optional element. Feel free to remove. -->

## Decision Drivers

- Ease of implementation
- How the audio sounds itself
- Making/getting the audio tracks
<!-- numbers of drivers can vary -->

## Considered Options

- Using voice synthesis
- Using an ai voice generator
<!-- numbers of options can vary -->

## Decision Outcome

Chosen option: "Using voice synthesis", because we have experience using voice synthesis already from lab 5, and it would be easy to implement. Furthermore, as of right now, we have 30 fortunes, and creating audio files for each one would take a long time. Whereas, voice synthesis automatically works with each fortune. Additionally, we don't have much experience with ai voice generators, but we know they can cost money for their usage.

<!-- This is an optional element. Feel free to remove. -->

### Consequences

- Good, because now every fortune can be read and there is no silence.
- Bad, because the voices may sound unnatural.
<!-- numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Validation

{describe how the implementation of/compliance with the ADR is validated. E.g., by a review or an ArchUnit test} -->

<!-- This is an optional element. Feel free to remove. -->

## Pros and Cons of the Options

### Using voice synthesis

<!-- This is an optional element. Feel free to remove. -->

- Good, because it was easy to implement and expand upon
- Good, because every fortune we have can be read, and if future fortunes are added, nothing needs to be added
  <!-- use "neutral" if the given argument weights neither for good nor bad -->
  <!-- * Neutral, because {argument c} -->
- Bad, because it may sound unnatural or bad to users.
- Bad, because if a users browser doesn't support it, there would be no sound
<!-- numbers of pros and cons can vary -->

### Using an ai voice generator

- Good, because we can have a voice that sounds natural and to our liking
- Good, because we know how the voice will sound like and what the user will hear
- Good, because it guarantees user will hear it
- Bad, because it would be hard to implement and scale. If more fortunes are added, then time has to be spent making voice lines for those, else it would be unnatural for some fortunes to have voice and some to not.

<!-- This is an optional element. Feel free to remove. -->
<!-- ## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.} -->

# Option to disable the narrating voice

## Context and Problem Statement

{Describe the context and problem statement, e.g., in free form using two to three sentences or in the form of an illustrative story.
You may want to articulate the problem in form of a question and add links to collaboration boards or issue management systems.}

When the user opens there fortune, there is no audio that reads it out to them. The problem is if we should add audio for it, and if so, use voice synthesis or make audio files ourself.

What if the user is in public places like the library or public coffee shop and the voice starts speaking loudly? This will put the user in an uncomfortable situation. The default option is "on" for the narration.

<!-- This is an optional element. Feel free to remove. -->

## Decision Drivers

- Avoid uncomfortable situations for users
- Provide users with options 
<!-- numbers of drivers can vary -->

## Considered Options

- A checkbox in a corner of the site to disable voice
- A checkbox right underneath the button
- A checkbox under the setting tab of the menu bar
<!-- numbers of options can vary -->

## Decision Outcome

Chosen option: A checkbox underneath the button. We chose this option because it doesn't interfere with the layout of our website. This will be important for 

<!-- This is an optional element. Feel free to remove. -->

### Consequences

- Good, because users don't have to worry about opening a fortune cookie in the public.
- Bad, because a feature we spend a lot of time on is unused.
<!-- numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Validation

{describe how the implementation of/compliance with the ADR is validated. E.g., by a review or an ArchUnit test} -->

<!-- This is an optional element. Feel free to remove. -->

## Pros and Cons of the Options

### A checkbox in a corner

<!-- This is an optional element. Feel free to remove. -->

- Good, because it was really easy to implement.
- Good, because it takes up a really small part of the website, very insignificant.
  <!-- use "neutral" if the given argument weights neither for good nor bad -->
  <!-- * Neutral, because {argument c} -->
- Bad, because it will affects the look of the website.
- Bad, because user might miss it.
<!-- numbers of pros and cons can vary -->

### A checkbox right underneath the button

- Good, because it is easily accessible.
- Good, because it is very visible.
- Good, because it guarantees user will not miss it
- Bad, because it is difficult to make it look good and doesn't stand out like a sore thumb.
- Bad, because it doesn't look great.

### A checkbox under the setting tab of the menu bar

- Good, because it is easy to implement since we already have a menu bar.
- Good, because it doesn't takes up any space underneath the menubar.
- Good, because it is more aesthetically pleasing for us.
- Bad, because it is hidden away under a container, so the user might miss it.
- Bad, because devs have to make sure to let the users know there is an option to turn off the audio under the setting tab.

<!-- This is an optional element. Feel free to remove. -->
<!-- ## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.} -->

# How will the user navigate to the other sites

## Context and Problem Statement

User is bored of after getting their fortune of the day. What if they want to go to see their love compatibility or have their palm read by the AI? There needs to something like a menu bar that links to other websites.

<!-- This is an optional element. Feel free to remove. -->

## Decision Drivers

- User experience is improved because the menu bar will provide a smooth and intuitive experience.
- Improve the accessiblity to give users an easier time.

## Considered Options

- The standard horizontal menu.
- Hamburger menu style.
- Vertical sidebar navigation

## Decision Outcome

Chosen option: "Hamburger menu style" navigation bar. The hamburger style only takes up a small part of the corner of the website which reduces a lot of visual clutter on user screen. That let the fortune cookie and the cookie stands out more.

<!-- This is an optional element. Feel free to remove. -->

### Consequences

- Good, because it was easy to implement and works as expected.
- Good, because it reduces clutter and improve performance.
- Good, because it doesn't distract the users.
- Bad, because users can miss it completely since it is hidden in the corner.
<!-- numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Validation

{describe how the implementation of/compliance with the ADR is validated. E.g., by a review or an ArchUnit test} -->

<!-- This is an optional element. Feel free to remove. -->

## Pros and Cons of the Options

### The standard horizontal menu

<!-- This is an optional element. Feel free to remove. -->

- Good, because it is highly visible, you won't miss it.
- Good, because it easily accessible.
  <!-- use "neutral" if the given argument weights neither for good nor bad -->
  <!-- * Neutral, because {argument c} -->
- Bad, because it takes up horizontal screen space.
- Bad, because it can be distracting.
<!-- numbers of pros and cons can vary -->
- Neutral, because it is a standard style, so a lot of developers are more familiar with it.

### Vertical sidebar navigation

- Good, because it maximizes the use of free vertical screen space.
- Good, because it is the best style for visibility.
  <!-- * Good, because {argument b} -->
  <!-- * Neutral, because {argument c} -->
- Bad, because it takes up a lot of space for smaller device.
- Bad, because it can become visually overwhelming.
- Neutral, because it is similar to the standard style in terms of how easy it is to implement.

<!-- This is an optional element. Feel free to remove. -->
<!-- ## More Information -->

<!-- {You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.}

 --- -->
## More Information:

- [Some styles of navigation bar that we should consider](https://www.gate39media.com/ui-design-spotlight-7-types-of-navigation-menus/)

# How to spice up our website

## Context and Problem Statement

Other fortune cookie website out there are using the shaking animation to try and stand out from the other websites. However, we want to create something that is more special.

<!-- This is an optional element. Feel free to remove. -->

## Decision Drivers

- Shaking animation is too common.
- Improve the visual of the website.
- Stand out from the rest.

## Considered Options

- Fortune unrolling to reveal itself from an already cracked fortune cookie.
- Mimic the motion of cracking a fortune cookie.
- Make the fortune cookie disappear when clicked and the fortune appear.

## Decision Outcome

Chosen option: "Mimicking the motion of cracking a fortune cookie". This makes it more realistic and create a relatable feeling for users. The user's experience should be enhanced even more after that.

<!-- This is an optional element. Feel free to remove. -->

### Consequences

- Good, because it keeps the users engaging.
- Good, because it creates a sense of mystery and an element of surprise.
- Good, because it hopefully makes user feel excited.
- Good, because it enhance the visual aspect of the website.
- Bad, because it is very complex to implement.
- Bad, because it can cause the site to perform worse.
<!-- numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Validation

{describe how the implementation of/compliance with the ADR is validated. E.g., by a review or an ArchUnit test} -->

<!-- This is an optional element. Feel free to remove. -->

## Pros and Cons of the Options

### Fortune unrolling to reveal itself from an already cracked fortune cookie

<!-- This is an optional element. Feel free to remove. -->

- Good, because it makes a good impression.
- Good, because it creates an appealing way to present the fortune to the user.
  <!-- use "neutral" if the given argument weights neither for good nor bad -->
  <!-- * Neutral, because {argument c} -->
- Bad, because it impact website performance.
- Bad, because it makes users wait.
<!-- numbers of pros and cons can vary -->

### Make the fortune cookie disappear when clicked and the fortune appear

- Good, because it is similar to the act of opening an actual fortune cookie.
- Good, because it creates an element of surprise.
  <!-- * Good, because {argument b} -->
  <!-- * Neutral, because {argument c} -->
- Bad, because it is too generic.
- Bad, because it can cause confusion.

<!-- This is an optional element. Feel free to remove. -->
<!-- ## More Information -->

<!-- {You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.}

 --- -->
