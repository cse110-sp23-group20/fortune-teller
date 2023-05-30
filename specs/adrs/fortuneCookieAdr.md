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

* Ease of implementation
* User can easily understand how the website works at a glance

## Considered Options

* Having a button that will open the fortune cookie
* Having the image of the fortune cookie itself work as the action to open the fortune cookie, where multiple clicks gradually crack it open.

## Decision Outcome
Chosen option: "Having a button that will open the fortune cookie". We decided to have a button to open the fortune cookie and have the fortune be displayed below it. This is because it will be easy to implement and the user can easily understand how the website works at a glance. We may change this decision later if we have time.

<!-- This is an optional element. Feel free to remove. -->
### Consequences

* Good, because it was easy to implement and works how we expect it to. 
* Bad, because it may seem unnatural to users and kind of plain. It might make more sense to have the fortune cookie crack by clicking the image of the fortune cookie itself.
<!-- numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Validation

{describe how the implementation of/compliance with the ADR is validated. E.g., by a review or an ArchUnit test} -->

<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### Having a button that will open the fortune cookie where multiple clicks gradually crack it open.

<!-- This is an optional element. Feel free to remove. -->

* Good, because of ease of implementation
* Good, because its easy for a user to understand what to do and how the website works
<!-- use "neutral" if the given argument weights neither for good nor bad -->
<!-- * Neutral, because {argument c} -->
* Bad, because it may seem unnatural or plain
<!-- numbers of pros and cons can vary -->

### Having the image of the fortune cookie itself work as the action to open the fortune cookie

* Good, because it may seem more natural to users, to crack a fortune cookie it would make sense to click on the fortune cookie itself.
* Would be entertaining to gradually open a fortune cookie
<!-- * Good, because {argument b} -->
<!-- * Neutral, because {argument c} -->
* Bad, because it would be hard to implement

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

* Ease of implementation
* How the audio sounds itself
* Making/getting the audio tracks
<!-- numbers of drivers can vary -->

## Considered Options

* Using voice synthesis
* Using an ai voice generator
<!-- numbers of options can vary -->

## Decision Outcome

Chosen option: "Using voice synthesis", because we have experience using voice synthesis already from lab 5, and it would be easy to implement. Furthermore, as of right now, we have 30 fortunes, and creating audio files for each one would take a long time. Whereas, voice synthesis automatically works with each fortune. Additionally, we don't have much experience with ai voice generators, but we know they can cost money for their usage.

<!-- This is an optional element. Feel free to remove. -->
### Consequences

* Good, because now every fortune can be read and there is no silence.
* Bad, because the voices may sound unnatural. 
<!-- numbers of consequences can vary -->

<!-- This is an optional element. Feel free to remove. -->
<!-- ## Validation

{describe how the implementation of/compliance with the ADR is validated. E.g., by a review or an ArchUnit test} -->

<!-- This is an optional element. Feel free to remove. -->
## Pros and Cons of the Options

### Using voice synthesis

<!-- This is an optional element. Feel free to remove. -->

* Good, because it was easy to implement and expand upon
* Good, because every fortune we have can be read, and if future fortunes are added, nothing needs to be added
<!-- use "neutral" if the given argument weights neither for good nor bad -->
<!-- * Neutral, because {argument c} -->
* Bad, because it may sound unnatural or bad to users.
* Bad, because if a users browser doesn't support it, there would be no sound
<!-- numbers of pros and cons can vary -->

### Using an ai voice generator

* Good, because we can have a voice that sounds natural and to our liking
* Good, because we know how the voice will sound like and what the user will hear
* Good, because it guarantees user will hear it
* Bad, because it would be hard to implement and scale. If more fortunes are added, then time has to be spent making voice lines for those, else it would be unnatural for some fortunes to have voice and some to not.

<!-- This is an optional element. Feel free to remove. -->
<!-- ## More Information

{You might want to provide additional evidence/confidence for the decision outcome here and/or
 document the team agreement on the decision and/or
 define when this decision when and how the decision should be realized and if/when it should be re-visited and/or
 how the decision is validated.
 Links to other decisions and resources might here appear as well.} -->

