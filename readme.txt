Description of Game

StanleyMUD is the first game that I am coding with the idea of someone else eventually playing it. I'm planning a pretty robust set of features, and I am excited to see how much I can extend this idea outwards. If you have ideas for features and such, please drop me a line and let me know what you're thinking.

Current Map should be: 
    [RedKeyRoom]   [Vault]   [BlueKeyRoom]
        ||           ||         || 
     [LHall]  =  [MHall]  =  [RHall]
                   ||
                 [Entry]

 In RedKeyRoom there is a Red Key.
 In BlueKeyRoom there is a Blue Key.
 In MHall there is a North-facing door. It needs both red and blue keys to open.
 In Vault is the Treasure.



Second Dungeon
-Only accessible by using the Teleport command.
-Begin at Temple Entryway

               [/Temple Entryway]
                      ||
[/Antechamber] =  [/Temple Foyer] =  [/Hall of Statues]
                      ||              ||
          [/Assessment Chamber]     [/Bathing Chamber]
                        |x|
[/West Temple Stairs] = [/Sanctuary] = [/East Temple Stairs]
  ||                       |x|                         ||
[Balcony]  [Library] = [Nexus of Magic] = [Portal]    [Sun Puzzle Chamber]
             |x|               ||  
     [Magicians Study]     [Sphinx's Chamber]
                                      ||
                                    [Exit]


In Antechamber there is a Broom. Broom can be used to remove dirt in Foyer and Hall of Statues.
In Bathing Chamber there is a Bath. You can use it to become clean.
    Entering a dirty room makes you dirty, and removes clean.
In the Assessment Chamber there is a platform you can stand on.
  WHen you stand on it, call out "Only a clean person can enter. Take a bath. Say "I am clean" when ready."
  If you are clean when you stand on it and say "I am clean", open the door.
  Otherwise, kill player for lying.
  

