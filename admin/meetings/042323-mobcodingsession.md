(Name your file the date-topic.md (mmddyy-topic.md). For example 011621-kickoff.md.)

# Meeting Minutes: 04/23 11:00AM - 1:30

#### Team 20: 2020 Visionaries

#### Mob Coding Session at Franklin Antonio Hall room 2009

#### Present Members:

- Chi Zhang
  
- Tyler Lo

- Brevin Gabrield

- Brandon Kao

- Owen Huynh

### Agenda

Code the magic 8 ball application using generative AI tools

### Unresolved buisness

None

### New buisness/agenda
Code the magic 8 ball application using generative AI tools
  

### Undiscussed buisness for next meeting
None
  

### WHAT WE LEARNED

### Code Generation
- ChatGPT is capable of writing the barebones code (fill in a query, click a button, get a random response). However, it cannot generate custom images for us.
  - It is also really good at rewriting code (give it your existing code and asking it to modify it to a certain spec) and adding features to the code
  - Very bad at debugging
  - We gave it the following prompt to create the basic functionality of the website
    ```
    Write the HTML, CSS, and Javascript to build a website that has a magic 8ball. This magic 8ball will give the user a prompt to ask it a question. The website will then output one of these answers: 
        ● It is certain.
        ● It is decidedly so.
        ● Without a doubt.
        ● Yes definitely.
        ● You may rely on it.

        ● As I see it, yes.
        ● Most likely.
        ● Outlook good.
        ● Yes.
        ● Signs point to yes.

        ● Reply hazy, try again.
        ● Ask again later.
        ● Better not tell you now.
        ● Cannot predict now.
        ● Concentrate and ask again.

        ● Don't count on it.
        ● My reply is no.
        ● My sources say no.
        ● Outlook not so good.
        ● Very doubtful.
    ```

### Image Generation
- Midjourney currently requires a subscription for access to the /imagine prompt on Discord

- Craiyon is pretty good for generating images given the prompt "magic 8 ball icon for website". It is slower compared to other alternatives we've seen but it's free. The images are pretty low res, but we can use image upscalers to resolve this issue quite easily. The background image of our 8-ball application was generated using this tool.

- Prompts for AI generated images can be super specific and probably should be. "Magic 8 ball icon for website" leaves too much interpretation.

### Sound Generation
- This is intended to provide greater accessibility of the website to the visually impaired.
- We considered the use of Speechify to enable dictation of the responses our magic 8 ball can generate, but it was locked behind a paywall.
- We ultimately decided to use Jenny.ai because it gave us each 5 free audio downloads, which was enough across all of us in the mob coding session to create dictations of all 20 8-ball responses.

### Meeting finished at: 1:30pm*
