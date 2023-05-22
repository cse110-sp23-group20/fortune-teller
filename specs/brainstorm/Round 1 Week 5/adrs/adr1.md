# Store all zodiac combination responses locally 

## Context and Problem Statement
When the user selects a zodiac pairing, we need to serve them a compatibility response. The issue however is if we should serve them the same response or try to give them a different, but similar response each time because getting the same response can be quite boring.

## Considered Options

* One response for all 33 unique combinations
* Make 1 or 2 more custom responses and pick a random one to serve each time
* Use some kind of API (maybe ChatGPT) to deliver a custom response

## Decision Outcome

Chosen option: For now we will just stick to using one response for all 33 unique combinations. Considering the time that we have left, adding extra features/complexity to our mini-app is not what we are trying to do. Once we have all 33 unique responses hard coded we can think about adding more or using an API to give us responses. We will reconsider this decision again once we have our mini-app completed and have the opportunity to add extra features.