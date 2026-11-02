# Example: voice preserved

Mode `essay`, author-written, strict, careful. The job is to leave the person on the page. A single structure-family hit is flagged, not swapped.

## Before

look, I still run the Tuesday route even though the depot moved to Solihull in March.

Three a.m. start. The A45 is empty enough that I eat toast on my knee at the red light by the tyre place (the one with the inflatable tube man, deflated, which is the correct mood). I was wrong about electric vans. I said they'd die on the M6 in rain. Mine didn't. It just beeps at me in a tone I find personally rude.

Not that.

If you ask me whether the new roster is fair I'll say no, and I'll say it in the canteen, which is how you get the 5 a.m. slot taken off you. I kept the slot anyway. 412 drops last week. Two of them were cat food for Mrs Dutta, who pays in coins.

## After

Almost unchanged. One possible `[VOICE-CONFLICT]`: none required — no structure-family hit. KEEP inventory: lowercase opener, parenthetical aside, "I was wrong", the fragment "Not that.", the rude-beep joke, the coins.

If a later draft had slipped in "It's not a job, it's a calling", v2 would flag:

```
[VOICE-CONFLICT] "It's not a job, it's a calling" · left in · could be the author; say so if you want it gone
```

and would not silently rewrite it into "The work is a vocation."
