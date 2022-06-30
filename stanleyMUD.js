//INITIALIZE
    console.log ("I am a startup message!")
var inventory = []; //Inventory is an array with the form [itemKey, itemKey, itemKey]
var currentRoom = "entry"; //currentRoom is a simple value that contains the roomID of the player's current room
    console.log("Initialized currentRoom to " + currentRoom)
var itemList = {//Provides a list of items and their associated properties
    itemListformat: {itemID: "name", type:"example", itemDesc: "Inspect to find this", readContents:"Read the item to see this"},
    redkey: {itemID: "Red Key", type: "key", itemDesc: "An ornate Red Key, found in the Red Key Room. It is the same color as one of the Vault door locks in the Main Hall."},
    bluekey:{itemID: "Blue Key", type: "key", itemDesc: "An ornate Blue Key, found in the Blue Key Room. It is the same color as one of the Vault door locks in the Main Hall."},
    vaultmap: {itemID: "Vault Map", type: "book", itemDesc: "A map of the Vault that you're in. Maybe if you Read it you could learn more?", readContents: "The map is crude, to say the least. In fact, there are only two locations noted. The Vault, which is where you are, and the Arcane Temple. There isn't even a scale to the map. How's that supposed to help?"},
    pileofjewels: {itemID: "Some Jewels", type: "loot", itemDesc: "Simply, a scattered selection of scintillating spinels, six sapphires, some shiny stones. Sellable."},
    jewelrystone: {itemID: "Bejeweled Stone",type: "loot", itemDesc: "A stone cut as if it was a gemstone, with smooth facets on all sides. A princess cut, perhaps?"},
    spellbookbasic:{itemID: "Basic Spellbook",type: "book", itemDesc: "A spellbook you found amidst the treasure. Its pages are covered in arcane diagrams. Meant for reading.", readContents: "A simple spellbook, bound in purple and navy. It's cover resembles a starfield. Within, you learn the secrets to shifting the world beneath your feet. By merely commanding oneself to |Teleport|, you could arrive at any room you can name. (ie: 'Teleport Vault') There is also a lot of other text warning about mutations in the fundamental state of reality, but none of that seems nearly as interesting as teleportation!"},
};
    console.log("Item List loaded with " + Object.keys(itemList).length + " items.")
var roomList = {
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
    }
};    
    console.log("Room List loaded with " + Object.keys(roomList).length + " rooms.")


//ITEM RELATED
function lookUpDisplayName(itemKey){//Looks up the display name of an itemKey
    //console.log (itemList[itemKey].itemID)
    return itemList[itemKey].itemID;
};
function lookUpItemID(displayName){//Looks up the itemID of a display name
    //BROKEN DUE TO NEW ITEM LIST.
    console.log("looking for " + displayName)   
    for (const i in itemList){
        //console.log("key is " + i);
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
    }

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

//ENGINE MANAGEMENT
function lieutenant(verb, noun){//Lieutenant is the service that is responsible for carrying out Commander's orders. It takes a command and determines if additional information is necessary.
    // Help
    // Initialize
    // Admin
    // Move (ie: Go) [x]
    // Pick Up (ie Grab)
    // Use
    // Read
    // Teleport      [x]
    // Credits
    //Talk (ie: Approach)
    // Profane
    if (verb == "move"||verb == "go"){
        noun = noun.toLowerCase();
        movePlayer(noun);
    }
    else if( verb == "teleport"){
        tpPlayer(noun);
    }
    else if (verb == "read"){
        readItem(noun);
    }
}

function commander(command){//Commander acts as the routing and translating function within stanleyMUD. It is the primary translation service. It is responsible for turning a player input into a well formed command to the LIEUTENANT service.
    //Sanitize input. remove caps.
    verb = command.split(" ")[0].toLowerCase();
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
};

function dungeonMaster(question){//Dungeon Master describes the situation that you are currently in and prints the text to the console.log, then asks a question (typically "What do you do?")
    
}

function help(topic){
    if (topic == ""|topic == "me"){
        console.log("General Help Text, Explaining To You How to utilize Verb-Noun Syntax.")
        console.log("To play, type in what you would like to do. Simplicity is key here. Typically something like 'Move West' or 'Grab Key' or 'Look Around' works best. You can also learn about other commands by playing!")
        console.log("As a bit of a cheat sheet, here's some verbs that work well: Help, Move, Grab, Use, Read, Talk, Look, Inspect, Read")
        console.log("If you want more information about any of those, just type 'Help <topic>' - for example Help Move will bring up the Help page for the move command, in case you forgot how to walk.")
        return;
    };
    if(topic == "move"|topic == "go"){
        console.log("Oh, this one's easy. Just type 'Move <exit>.' A good example might be Move North, or Move Downstairs or Move Secret Bookshelf Door.");
        console.log("Something like that, right?");
    };
    if (topic == "teleport" | topic == "teleportation" ){
        console.log("Well, if you want to teleport, then you should probably find a spellbook to explain it. I'm just a help file afterall, not a proper wizard. Once you learn how though, you can just type 'Teleport <place>' and you'll immediately be brought there, so long as 'there' exists. Oh also, be careful, and don't miss!")
    };

}

//TEST SUITE
function runTest(){
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
