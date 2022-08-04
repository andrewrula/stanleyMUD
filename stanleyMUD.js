//INITIALIZE
console.log ("I am a startup message!")
var basePlayer = {
    HP: 5,
    MP:5, 
};

var baseItemList = {//Provides a list of items and their associated properties
    itemListformat: {itemID: "name", type:"example", itemDesc: "Inspect to find this", readContents:"Read the item to see this"},
    redkey: {itemID: "Red Key", type: "key", itemDesc: "An ornate Red Key, found in the Red Key Room. It is the same color as one of the Vault door locks in the Main Hall."},
    bluekey:{itemID: "Blue Key", type: "key", itemDesc: "An ornate Blue Key, found in the Blue Key Room. It is the same color as one of the Vault door locks in the Main Hall."},
    vaultmap: {itemID: "Vault Map", type: "book", itemDesc: "A map of the Vault that you're in. Maybe if you Read it you could learn more?", readContents: "The map is crude, to say the least. In fact, there are only two locations noted. The Vault, which is where you are, and the Arcane Temple. There isn't even a scale to the map. How's that supposed to help?"},
    pileofjewels: {itemID: "Some Jewels", type: "loot", itemDesc: "Simply, a scattered selection of scintillating spinels, six sapphires, some shiny stones. Sellable."},
    jewelrystone: {itemID: "Bejeweled Stone",type: "loot", itemDesc: "A stone cut as if it was a gemstone, with smooth facets on all sides. A princess cut, perhaps?"},
    spellbookbasic:{itemID: "Basic Spellbook",type: "book", itemDesc: "A spellbook you found amidst the treasure. Its pages are covered in arcane diagrams. Meant for reading.", readContents: "A simple spellbook, bound in purple and navy. It's cover resembles a starfield. Within, you learn the secrets to shifting the world beneath your feet. By merely commanding oneself to |Teleport|, you could arrive at any room you can name. (ie: 'Teleport Vault') There is also a lot of other text warning about mutations in the fundamental state of reality, but none of that seems nearly as interesting as teleportation!"},
};

var baseRoomList = {
    roomListFormat:{
        roomID: "name",
        roomDisplayName: "Plain Text Room Name",
        roomDesc: "descriptive text for room",
        contents: ["itemID", "itemID", "itemID"],
        doors:{direction1: ["destinationRoomID", "lockBoolean", "lockKey1", "lockKey2","..." ], direction2:"destinationRoomID"}
    },
    entry:{
        roomID: "entry",
        roomDisplayName: "Vault Entrance",
        roomDesc: "A moody entranceway. There is a door leading North, and the Vault Exit is to your South.",
        contents: [],
        doors: {north: ["mhall", false], south: ["vaultExterior", false]},
    },
    mhall:{
        roomID: "mhall",
        roomDisplayName: "Great Hall",
        roomDesc: "The Great Hall of the ruin is big. Like dwarf-built big. You've seen Lord of the Rings, right? There are exits to all four cardinal directions. To the north is the Vault Door. It has two keyholes, one red and one blue. To the east and west are hallways. To the South is the Entryway.",
        contents: [],
        doors:{north:["vault", true, "redkey", "bluekey"],south:["entry",false], east:["rhall", false], west:["lhall", false]},
    },
    vault:{
        roomID: "name",
        roomDisplayName: "Vault of Wonders",
        roomDesc: "A vault with limitless gold. You're rich! Now you can retire from playing poorly beta'd games!",
        contents: ["oldKey", "basicSpellbook", "Gold"],
        doors:{south: ["mhall",false]}
    },
    rhall:{
        roomID: "rhall",
        roomDisplayName: "Right Hall",
        roomDesc: "A nondescript hallway. There's a door to the north, and to the west is the path back to the Gain Hall.",
        contents: [],
        doors:{north: ["bluekeyroom", false], west:["mhall",false]}
    },
    lhall:{
        roomID: "lhall",
        roomDisplayName: "Left Hall",
        roomDesc: "A nondescript hallway. There's a door to the north, and to the east is the path back to the Main Hall.",
        contents: [],
        doors:{north: ["redkeyroom", false], east:["mhall",false]}
    },
    redkeyroom:{
        roomID: "redkeyroom",
        roomDisplayName: "Red Key Room",
        roomDesc: "A beautiful shrine to a forgotten diety. On the altar, a Red Key is displayed.",
        contents: ["pileofjewels", "redkey", "vaultmap"],
        doors:{south: ["lhall", false]}
    },
    bluekeyroom:{
        roomID: "bluekeyroom",
        roomDisplayName: "Blue Key Room",
        roomDesc: "A beautiful shrine to an unknown god. On the altar, a Blue Key is displayed.",
        contents: ["bluekey"],
        doors:{south: ["rhall", false]}
    },
    templeentry:{
        roomID: "templeentry",
        roomDisplayName: "Temple Entrance",
        roomDesc: "An entranceway to a marvelous, white temple, nestled deep in the highest mountains. There is a door leading South into the rest of the temple, but no other exits. How could anyone have gotten here without magic?",
        contents: [],
        doors: {south: ["templefoyer", false]},
    },
    templefoyer:{
        roomID: "templefoyer",
        roomDisplayName: "Temple Foyer",
        roomDesc: "",
        contents: [],
        doors: {north: ["templeentry", false], south: ["templeassessmentchamber", false], east: ["templehallofstatues",false], west: ["templeantechamber", false]},
    },
    templeantechamber:{
        roomID: "templeantechamber",
        roomDisplayName: "Temple Antechamber",
        roomDesc: "",
        contents: [],
        doors: {east: ["templefoyer", false]},
    },
    templehallofstatues:{
        roomID: "templehallofstatues",
        roomDisplayName: "Hall of Statues",
        roomDesc: "",
        contents: [],
        doors: {west: ["templefoyer", false], south: ["templebathingchamber",false]},
    },
    templebathingchamber:{
        roomID: "templebathingchamber",
        roomDisplayName: "Bathing Chamber",
        roomDesc: "",
        contents: [],
        doors: {north: ["templehallofstatues",false]},
    },
    templeassessmentchamber:{
        roomID: "templeassessmentchamber",
        roomDisplayName: "Assessment Chamber",
        roomDesc: "",
        contents: [],
        doors: {north: ["templefoyer",false], south:["templesanctuary", true, "templecleanliness"]},
        //TODO: Configure locks to be able to open based on condition.
    },
    templesanctuary:{
        roomID: "templesanctuary",
        roomDisplayName: "Sanctuary",
        roomDesc: "",
        contents: [],
        doors: {north: ["templeassessmentchamber",false], south:["templenexusofmagic", true, "NYI"], west:["templeweststairs",false], east:["templeeaststairs", false]},
        //TODO: Implement nexus lock
    },
    templeweststairs:{
        roomID: "templeweststairs",
        roomDisplayName: "West Temple Staircase",
        roomDesc: "",
        contents: [],
        doors: {upstairs: ["templebalcony",false], downstairs:["templesanctuary", false]},
    },
    templeeaststairs:{
        roomID: "templeeaststairs",
        roomDisplayName: "East Temple Staircase",
        roomDesc: "",
        contents: [],
        doors: {downstairs: ["templepuzzlechamber",false], upstairs:["templesanctuary", false]},
    },
}; 

var itemList = {};
var roomList = {};
var player = {};
var inventory = []; //Inventory is an array with the form [itemKey, itemKey, itemKey]
var currentRoom = ""; //currentRoom is a simple string that contains the roomID of the player's current room

//ITEM RELATED
function lookUpDisplayName(itemKey){//Looks up the display name of an itemKey
    //console.log (itemList[itemKey].itemID)
    return itemList[itemKey].itemID;
};

function lookUpItemID(displayName){//Looks up the itemID of a display name
    console.log("looking for " + displayName)   
    for (const i in itemList){
        if(itemList[i].itemID == displayName){
            console.log("Returning " + i)
            return i;
        }
    } console.log("That's not a real item.")
    return false;
};

function itemPickUp(plainTextItemName){
    //User types in name of item in plaintext
    //Convert the displayname to ID
        var itemID = lookUpItemID(plainTextItemName); 
    //Test failure conditions
    //  -Does room have contents
        if(itemID == false){
            console.log("Item Lookup Failed");
            return
        }
        if(roomList[currentRoom].contents === []){
            console.log("This room has no contents.")
            return false;
        }else{
            console.log("Room has contents")
        };
    //  -Is itemID in those contents
        var index
        function roomHasItemAsProperty(){
            console.log(itemID);
            console.log(roomList[currentRoom].contents);
            for(var i in roomList[currentRoom].contents){
                console.log("i is " + i)
                console.log(roomList[currentRoom].contents[i]);
                if(roomList[currentRoom].contents[i] == itemID){
                    index = i;
                    return true;
                }
            }
            return false;
        }   
        if(roomHasItemAsProperty()==true){
            console.log("Item Found In Room");
            inventory.push(itemID);
            console.log(itemID + " added to Inventory, which now contains")
            console.log(inventory);
            //Remove itemID from room contents
            roomList[currentRoom].contents.splice(index,1)
            console.log ("Removed " + itemID + " from room. Remaining contents are:")
            console.log(roomList[currentRoom].contents)
            //TODO: Refactor this to permit quantity
        }else{
            console.log("Item does not exist in Room.")
            return false; 
        //  -Is locked? <future function goes here probably
    
    }
};

function useItem(item){
    var itemID = lookUpItemID(item);
    var itemType = findItemType(itemID);
    if (itemType == key){
        //TODO: Prompt for direction
        direction = ""
        useKey(item, direction);
    };
    if(itemType == book){
        readItemByID(itemID);
    }  
};

function useKey(keyName, direction){
    //TODO: Refactor: Make this a more generic function
    //Init Vars
    var foundKeyIndex
    var inventoryKeyIndex
    //Check Fail Conditions
        //if no key in inventory
        function isKeyHere(keyName, inventory){
            for(i=0;i<inventory.length;i++){
                console.log("Checking inventory spot i = " + i)
                if (keyName === inventory[i]){
                    console.log("You have the requested key.")
                    inventoryKeyIndex = i;
                    return true;
            }
        }   console.log("You do not have that key.")
            return false;
        }
        if(isKeyHere(keyName, inventory)=== true){
            console.log("Key Check Passed!")
        }else{
            console.log("Key Check Failed")
            return;
        }
        //if no direction
        //TODO: Refactor this. Rename to isDoorValid
        function isDirectionValid(direction){
            //if you find the direction in currentRoom return true
            //if you don't print "invalid direction" and return false
            if(direction in roomList[currentRoom].doors){
                    return true;    
            }else{ 
                    console.log("Invalid Direction.")
                    return false;
    }};
        console.log("Begin Direction Test");
        if(isDirectionValid(direction)===true){
            console.log("Direction Check Passed!")
        }else{
            console.log("Direction Check Failed!")
            return;
        }
        //if no lock in direction
        function isDirectionLocked(direction){
            console.log("Lock looks like " + roomList[currentRoom].doors[direction])
            if(roomList[currentRoom].doors[direction][1] === true){
                console.log("Found a lock to the " + direction)
                return true;
            }else {
                console.log("No Lock Found in that direction.")
                return false;
            }
        }
        console.log("Begin Lock Test");
        if(isDirectionLocked(direction)===true){
            console.log("Lock Check Passed!")
        }else{
            console.log("Lock Check Failed!")
            return;
        }

    //if lock doesnt need this key
    //TODO: Deprecate foundDirectionIndex here
        function doesKeyMatchLock(keyName){
            console.log("Lock Length of "+ roomList[currentRoom].doors[direction].length)
            for(i=2;i<roomList[currentRoom].doors[direction].length;i++){
                console.log ("Analyzing lock position " + i + " which contains " + roomList[currentRoom].doors[direction][i]);
                if(keyName === roomList[currentRoom].doors[direction][i]){
                    console.log("setting foundKeyIndex to "+ i);
                    foundKeyIndex = i;
                    return true;
                }
            }return false;
        }
        console.log("Begin Lock|Key Concordance Test");
        console.log("Keyname: " + keyName);
        if(doesKeyMatchLock(keyName)===true){
            console.log("Concordance Check Passed!")
        }else{
            console.log("Concordance Check Failed!")
            return;
        }
    
    //remove key from inventory
    function removeKeyfromInventory(keyName, inventoryKeyIndex){
        console.log("Inventory: " + inventory)
        console.log("Removing item at " + inventoryKeyIndex + ". It should be " + keyName)
        inventory.splice(inventoryKeyIndex,1);
        console.log("Inventory: " + inventory);
    }
    removeKeyfromInventory(keyName,inventoryKeyIndex)

    //remove key from lock list
    function removeKeyfromLock(keyName, foundKeyIndex){
        console.log("Lock is: " + roomList[currentRoom].doors[direction])
        console.log("Removing item at " + foundKeyIndex + ". It should be " + keyName)
        roomList[currentRoom].doors[direction].splice(foundKeyIndex,1);
        console.log("Lock is: " + roomList[currentRoom].doors[direction]); 
    }
    removeKeyfromLock(keyName, foundKeyIndex);

    //check if lock open
    function lockCheck(){
        if(roomList[currentRoom].doors[direction].length === 2){
            console.log("Lock length remaining is 2. Unlocking.");
            roomList[currentRoom].doors[direction][1] = false;
        }else{
            var keysNeeded = roomList[currentRoom].doors[direction].length - 2;
            console.log("Number of Remaining Keys Needed: " + keysNeeded + ". You need more keys.")
        }
    }
    lockCheck();
};

function inspectItem(plainTextItemName){
    //TODO Allow a lock to be applied to the inventory item - like a locked box or scroll case or something. Maybe even MAGIC LOCKS!~ 
    var itemID = lookUpItemID(plainTextItemName);
        console.log(itemID + " is itemID")
    //Do you have the item?
    for (var i in inventory){
        if(itemID == inventory[i]){
            //print description of itemname
            console.log(itemList[itemID].itemDesc)
            return; 
        }
    }   console.log ("Item Not Found in Inventory");
        return false;

};

function readItem(plainTextItemName){
    //TODO Allow a lock to be applied to the inventory item - like a locked box or scroll case or something. Maybe even MAGIC LOCKS!~ 
    var itemID = lookUpItemID(plainTextItemName);
        //console.log(itemID + " is itemID")
        //console.log(itemList[itemID])
    if(typeof itemList[itemID] == "undefined"){
        console.log("That's not a real item");
        return;
    }
    if(itemList[itemID].hasOwnProperty("readContents")===false){
        console.log("That item can not be read")
        return;
    }
        //Do you have the item?
    for (var i in inventory){
        if(itemID == inventory[i]){
            //print readContents of itemID
            console.log(itemList[itemID].readContents)
            return; 
        }
    }   console.log ("Item Not Found in Inventory");
        return false;
};

function readItemByID(itemID){
    if(typeof itemList[itemID] == "undefined"){
        console.log("That's not a real item");
        return;
    }
    if(itemList[itemID].hasOwnProperty("readContents")===false){
        console.log("That item can not be read")
        return;
    }
        //Do you have the item?
    for (var i in inventory){
        if(itemID == inventory[i]){
            //print readContents of itemID
            console.log(itemList[itemID].readContents)
            return; 
        }
    }   console.log ("Item Not Found in Inventory");
        return false;
};

function findItemType(itemID){
    //TODO: Handle not-an-item issues
    return itemList[itemID].type;

};

//MOVEMENT RELATED
function movePlayer(direction){//Moves Player in the noted direction
    console.log("Moving player " + direction + " from " + currentRoom)
    //Fails out if direction not found.
    if (roomList[currentRoom].doors.hasOwnProperty(direction)===false){
        console.log("You can not go that direction.");
        return
    }

    //Locked door check
    if(roomList[currentRoom].doors[direction][1] === false){
        console.log("No lock detected! Move accepted.");
    }else if(roomList[currentRoom].doors[direction][1] === true){
        console.log("The Door is Locked! Stopping move.")
        return;
    };

//Set currentRoom to the destination.
currentRoom = roomList[currentRoom].doors[direction][0]
console.log ("currentRoom has been changed to " + currentRoom)
getLocationDescription(currentRoom);

//Prints description of new currentRoom

};

function tpPlayer(room){//Teleports player to target room.
    //TODO: Add teleport safety rails for incorrect room name.
    //TODO: Add support for roomDisplayName in both inputs and outputs.
    console.log("Player casts a teleportation spell in " + currentRoom)
    currentRoom = room;
    console.log ("Player has reappeared in " + currentRoom)
};

function getLocationDescription(location){
    console.log(roomList[location].roomDesc)
};

//ACTION RELATED
function playerSpeak(words){
    var userInput = words
    console.log (`You say "${userInput}"`)
    //TODO: Response function. (Handled by lieutenant?)
}

//ENGINE MANAGEMENT
function newGame(){
    inventory = []
    currentRoom = "entry"
    player = basePlayer
    itemList = baseItemList;
    roomList = baseRoomList;
    console.log("Item List loaded with " + Object.keys(itemList).length + " items.")
    console.log("Room List loaded with " + Object.keys(roomList).length + " rooms.")
    console.log("Initialized currentRoom to " + currentRoom)
};

function lieutenant(verb, noun){//Lieutenant is the service that is responsible for carrying out Commander's orders. It takes a command and determines if additional information is necessary.
     
    // [ ] Admin
    // [ ] Use
        //TODO: Update key function to be a generic use item function
        //Use function should look at item type to determine how it can be used.
    switch(verb){
        //Initialize
        case "new game":
        case "initialize":
            newGame();
            break;
        //Move
        case "move":
        case "go":
            movePlayer(noun);
            break;
        //Teleport
        case "teleport":
            tpPlayer(noun);
            break;
        //Look Around
        case "look":
        case "explore":
            getLocationDescription(noun);
            break;
        //Inspect
        case "inspect":
            inspectItem(noun);
            break;
        //Read
        case "read":
            readItem(noun);
            break;
        //Help
        case "help":
            help(noun);
            break;
        //Credits
        case "credits":
            playCredits();
            break;
        //Grab
        case "take":
        case "pick up":
        case "grab":
        case "get":
            itemPickUp(noun);
            break;
        //Talk
        case "talk":
        case "approach":
        case "chat":
            console.log("Conversations not implemented yet");
            break;
        //Say
        case "say":
        case "speak":
            playerSpeak(noun);    
            break;
        //Profane
        case "fuck":
            console.log("That's not a nice word. We need to maintain an ESRB rating here!");
        //Default
        default:
            console.log("I did not understand that command. Try again.");
            break;
    }
};

function commander(command){//Commander acts as the routing and translating function within stanleyMUD. It is the primary translation service. It is responsible for turning a player input into a well formed command to the LIEUTENANT service.
    //TODO: Refactor this to work with 2 word verbs and 2 word nouns
    //Sanitize input. remove caps.
    command = command.toLowerCase();
    verb = command.split(" ")[0];
    //console.log(command.split(" ").length)
    
    //If command is only one word, that word is a verb and we should return a blank string as the noun
    if(command.split(" ").length == 1){
        noun = ""
    }
    //If command is exactly two words, the second word (index 1) is a noun and we return it. 
    else if (command.split(" ").length == 2){
        noun = command.split(" ")[1]
    }
    //Otherwise we need to combine the remaining words into a single key.
    else {
        noun = command.split(" ");
        //console.log (noun);
        noun = noun.splice(1,noun.length);
        for (var i in noun){
            noun[i].split();
        }
        noun = noun.join(" ");
    }
    //console.log(verb);
    //console.log(noun);
    lieutenant(verb, noun);


    //Possible flow for multi-word verbs?
    //ID first verb. If it clicks, set rest for noun.
    //If not add another word to verb
    //Look at convo with Mike to determine strategy here.
};

function seer(question){//Seer is a Question Asker. It asks the user a question and returns the user's answer.
    

};

function dungeonMaster(question){//Dungeon Master describes the situation that you are currently in and prints the text to the console.log, then asks a question (typically "What do you do?")
    
};

function help(topic){
    switch(topic){
        //General Help
        case "":
        case "me":
            console.log("General Help Text, Explaining To You How to utilize Verb-Noun Syntax.")
            console.log("To play, type in what you would like to do. Simplicity is key here. Typically something like 'Move West' or 'Grab Key' or 'Look Around' works best. You can also learn about other commands by playing!");
            console.log("As a bit of a cheat sheet, here's some verbs that work well: Help, Move, Grab, Use, Read, Talk, Look, Inspect");
            console.log("If you want more information about any of those, just type 'Help <topic>' - for example 'Help Move' will bring up the Help page for the move command, in case you forgot how to walk.");
            break;
        //Movement Help
        case "move":
        case "go":
        case "walk":
            console.log("Oh, this one's easy. Just type 'Move <exit>.' A good example might be 'Move North', or 'Move Downstairs' or 'Move Secret Bookshelf Door'.");
            console.log("Something like that, right?");
            break;
        //Teleport Help
        case "teleport":
        case "teleportation":
            console.log("Well, if you want to teleport, then you should probably find a spellbook to explain it. I'm just a help file afterall, not a proper wizard. Once you learn how though, you can just type 'Teleport <place>' and you'll immediately be brought there, so long as 'there' exists. Oh also, be careful, and don't miss!")
            console.log("Also, you have enough magical power to teleport, right? Not having enough power would likely hurt a lot. Don't do that.");
            break;
        //Pick Up Help
        case "grab":
        case "pick up":
        case "snag":
            console.log("To pick something up, just type 'Grab <itemName>'.");
            console.log("For example, 'Grab food' or 'pick up screwdriver'.");
            console.log("Some people or objects might not appreciate being grabbed. Consent is important when dealing with thinking things.")
            break;
        //Use Help
        case "use":
            console.log("Use is a complicated one! You can use just about every item, but what happens will be different depending on what the item is.");
            console.log("For example 'Use Novel' will read the book Novel if it's in your inventory. 'Use Red Key' will use the Red Key on a door. (You will be prompted to input where you want to use the key.)");
            console.log("There are tons of items to use. Experiment with them!");
            break;
        //Read Help
        case "read":
            console.log("If you want to get more specific than 'use' for a given item, and you want to explicitly read it rather than do anything else with it, use the verb 'read'.")
            console.log("For example, 'Use Fireball Spellbook' might create a fireball if you use it. But 'Read Fireball Spellbook' will give you the text of the book instead.")
            console.log("I mean, no promises that a Fireball Spellbook will be intelligible. Maybe be sure you can read whatever arcane language its in first?")
            break;
        //Talk Help
        case "talk":
        case "approach":
            console.log("Both 'talk' and 'approach' will begin a conversation with the noun provided. Some things are not good conversationalists.");
            break;
        //Inspect Help
        case "look":
        case "inspect":
            console.log("Verbs like 'look' and 'inspect' will give you more information about an object.")
            console.log("A note here that inspecting a book will give you a description of the book, and not the text of the book.")
            console.log("If you want to read the book, try using the 'read' verb.")
            break;
        //Say
        case "say":
        case "utter":
            console.log("Here in this game, we're not a big fan of silent-protagonists, so we've given you the ability to speak words.")
            console.log("If you're talking to someone, using the say verb will respond to whatever they said to you.")
            console.log("If you're not in a conversation, you'll just say whatever you type in. For example 'Say bread' will exclaim about gluten.")
            break;
        //Fallback Failure
        default:
            console.log("Er, sorry. I don't know anything about that. Maybe try something else?")
            //TODO: Log the incorrect statement so we can add it to this matrix later.
            break;
        };
};

function playCredits(){
    console.log("This whole game was made by Andrew Rula.")
    console.log("This game is dedicated to Casey Patterson, who is excellent and indulges both my silly hobbies and excessive explanations.")
    console.log("Special Thanks to Mike Kolbeck, who indulged approximately 4721* questions during the making of this game.")
};


//ADMIN COMMANDS
function adminRouter(){//routes the command from Lieutenant into the correct admin function
    //List Admin Commands Needed
    //Admin Teleport
    //Admin Give Item
    //Admin Remove Item
    //Admin Give Buff
    //Admin Remove Buff
};

//TEST SUITE
function runTest(){
    newGame();
    movePlayer("north");
    itemPickUp("blork")
    movePlayer("west");
    movePlayer("north");
    itemPickUp("Red Key");
    itemPickUp("Vault Map");
    inspectItem("Red Key")
    movePlayer("south");
    movePlayer("east");
    movePlayer("east");
    movePlayer("north");
    movePlayer("south");
    movePlayer("west");
    movePlayer("north");
    movePlayer("west")
    tpPlayer("vault");
    movePlayer("south");
    movePlayer("north");
    movePlayer("west");
    movePlayer("north");
    lookUpItemID("Vault Map");
    itemPickUp(lookUpItemID("Vault Map"));
    console.log("Inventory: " + inventory);
    movePlayer("south");
    movePlayer("east");
    useKey("redkey", "north")
    movePlayer("east");
    movePlayer("north");
    itemPickUp("Blue Key");
    movePlayer("south");
    movePlayer("west");
    useKey("bluekey", "north")
    movePlayer("north")
    console.log("Inventory: " + inventory);
    inspectItem("Vault Map");
    inspectItem("BIG SUPER FAKE ITEM");
};
function itemTest(){
    var displayNameLookupTest = lookUpDisplayName("redkey");
    console.log ("displayNameLookupTest outputs: " + displayNameLookupTest + ". Expected 'Red Key'");
    var idLookupTest = lookUpItemID("Red Key");
    console.log("idLookUpTest outputs: " + idLookupTest + " Expected: 'redkey'")
};
function newItemTest(){
    movePlayer("north")
    movePlayer("west")
    movePlayer("north")
    itemPickUp("Red Key")
    itemPickUp("Florb")
    itemPickUp("Red Key")
    itemPickUp("Blue Key")
};
function commanderTests(){
    console.log("Test 1: Basic parsing of verb. Expected 'move' then 'north'")
    commander("Move North");
    commander("Go West");
    console.log("Test 2: Advanced noun parsing. Expected teleport to redkeyroom")
    commander("Teleport Red Key Room")
    inventory = ["spellbookbasic"]
    commander ("Read Basic Spellbook");
    commander ("Read BIG FAKE BOOK")
        //TODO: Refactor roomName to use similar nomenclature to items. Use display names only for inputs and convert to ID in the input-handling function!


};

//runTest();
//itemTest();
//newItemTest()
//commanderTests();