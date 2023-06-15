# Rename Zodiac Compatibility Assets to Love Compatibility

## Decision Drivers
- The name "Zodiac Compatibility" won't fit in its card on the home screen.
  
## Context and Problem Statement
- The name "Zodiac Compatibility" won't fit in its card on the home screen without first shrinking the font size. Since this would make it look strange next to its neighbors, we are considering renaming zodiac compatibility to love compatibility since the responses are all about relationship compatibility anyways

## Considered Options

- Keep the name and change the font size
  - Text size consistency will be an issue
  - Won't have to rename all the zodiac files
- Change the name
  - Text size on home screen will be consistent
  - Have to rename all of the zodiac files to be congruent to this decision
- Have two different names
  - This might be confusing to anyone viewing our repo

## Decision Outcome
Chosen Option: Just rename it. In order to prevent further tech debt we should just rename it to fix the UI issues. It should not take that long to rename all of the zodiac files to their new name anyways and the renaming describes what the zodiac compatibility tool is doing anyways so it is an appropriate swap.
