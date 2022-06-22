//Initializing currentRoom to Entry and calling vars
    console.log ("I am a startup message!")
    //Inventory is an array with the form [itemKey, itemKey, itemKey]
    var inventory = [];
    var foundRoomIndex;
    var currentRoom = "Entry";
    console.log("Initialized currentRoom to " + currentRoom)

//Loads Room List and sets Current Index
var itemList = {
    itemListformat: {itemID: "name", type:"example", itemDesc: "Inspect to find this", readContents:"Read the item to see this"},
    redKey: {itemID: "Red Key", type: "key", itemDesc: "An ornate Red Key, found in the Red Key Room. It is the same color as one of the Vault door locks in the Main Hall."},
    blueKey:{itemID: "Blue Key", type: "key", itemDesc: "An ornate Blue Key, found in the Blue Key Room. It is the same color as one of the Vault door locks in the Main Hall."},
    vaultMap: {itemID: "Vault Map", type: "book", itemDesc: "A map of the Vault that you're in. Maybe if you Read it you could learn more?", readContents: "The map is crude, to say the least. In fact, there are only two locations noted. The Vault, which is where you are, and the Arcane Temple. There isn't even a scale to the map. How's that supposed to help?"},
    pileofjewels: {itemID: "Some Jewels", type: "loot", itemDesc: "Simply, a scattered selection of scintillating spinels, six sapphires, some shiny stones. Sellable."},
    jewelryStone: {itemID: "Bejeweled Stone",type: "loot", itemDesc: "A stone cut as if it was a gemstone, with smooth facets on all sides. A princess cut, perhaps?"},
    spellbookBasic:{itemID: "Basic Spellbook",type: "book", itemDesc: "A spellbook you found amidst the treasure. Its pages are covered in arcane diagrams. Meant for reading.", readContents: "A simple spellbook, bound in purple and navy. It's cover resembles a starfield. Within, you learn the secrets to shifting the world beneath your feet. By merely commanding oneself to |Teleport|, you could arrive at any room you can name. (ie: 'Teleport Vault') There is also a lot of other text warning about mutations in the fundamental state of reality, but none of that seems nearly as interesting as teleportation!"},
}

var RoomList = [
    { //Entry
        id:"Entry",
        possibleExits:[
            [
                {exit:"South",
                to:"Exit"}
                ],
            [
                {exit:"North",
                to:"MHall"}
            ]],
        desc: "A moody entranceway. There is a door leading North, and the Dungeon Exit is to your South.",
        },
    { //MHall
        id:"MHall",
        possibleExits:[
            [
                {exit:"North",
                to:"Vault",
                lock:[true, "redKey" ,"blueKey"]}
            ],
            [
                {exit:"South",
                to:"Entry"}
            ],
            [
                {exit:"West",
                to:"LHall"}
            ],
            [
                {exit:"East",
                to:"RHall"}
            ]],
        desc: "The Main Hall of the ruin is big. Like dwarf-built big. You've seen Lord of the Rings, right? There are exits to all four cardinal directions. To the north is the Vault Door. It has two keyholes, one red and one blue. To the east and west are hallways. To the South is the Entryway.",
        },
    { //LHall
            id:"LHall",
            possibleExits:[
                [
                    {exit:"North",
                    to:"RedKeyRoom"}
                  ],
                [
                    {exit:"East",
                    to:"MHall"}
                ]],
            desc: "A nondescript hallway. There's a door to the north, and to the east is the path back to the Main Hall."
        },
    { //RHall
                id:"RHall",
                possibleExits:[
                    [
                        {exit:"North",
                        to:"BlueKeyRoom"}
                      ],
                    [
                        {exit:"West",
                        to:"MHall"}
                    ]],
                desc: "A nondescript hallway. There's a door to the north, and to the west is the path back to the Main Hall."
        },
    { //RedKeyRoom
            id:"RedKeyRoom",
            possibleExits:[
                [
                    {exit:"South",
                    to:"LHall"}
                  ]
                ],
            desc: "A beautiful temple. On the altar, a Red Key is displayed.",
            contents:["pileofjewels", "redKey", "vaultMap"]
        },
    { //BlueKeyRoom
        id:"BlueKeyRoom",
        possibleExits:[
            [
                {exit:"South",
                to:"RHall"}
              ]
            ],
        desc: "A beautiful temple. On the altar, a Blue Key is displayed.",
        contents:["blueKey"]
        },
    { //Vault
        id:"Vault",
        possibleExits:[
            [
                {exit:"South",
                to:"MHall"}
                ]
            ],
        desc: "A vault with limitless gold. You're rich! Now you can retire from playing poorly beta'd games!"
        },
]

var newRoomList = {
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
        doors: {north: ["MHall", false], south: ["vaultExterior", false]},
    },
    mHall:{
        roomID: "mHall",
        roomDisplayName: "Great Hall",
        roomDesc: "The Great Hall of the ruin is big. Like dwarf-built big. You've seen Lord of the Rings, right? There are exits to all four cardinal directions. To the north is the Vault Door. It has two keyholes, one red and one blue. To the east and west are hallways. To the South is the Entryway.",
        contents: [],
        doors:{north: ["vault", true, "redKey", "blueKey"], south:["entry",false]},
    },
}
    
    console.log("Room List loaded with " + RoomList.length + " rooms")
    findCurrentRoomIndex();
    console.log("CurrentRoom index set to " + foundRoomIndex);    

function findCurrentRoomIndex(){//Find the index for the currentRoom
for (var i=0; i < RoomList.length; i++){
    if (currentRoom === RoomList[i].id){
        foundRoomIndex = i;
    } 
 }
 console.log ("Found room at index " + foundRoomIndex)  
}

function lookUpDisplayName(itemKey){
    console.log (itemList[itemKey].itemID)
    return itemList[itemKey].itemID;
};

function lookUpItemID(displayName){
    console.log("looking for " + displayName)   
    for (const key in itemList){
        console.log("key is " + key);
        if(itemList[key].itemID == displayName){
            console.log("Returning " + key)
            return key;
        }
    } console.log("Returning False")
    return false;
};

function movePlayer(direction){//Moves Player in the noted direction
console.log("Moving player " + direction + " from " + currentRoom)

//Look through currentRoom to find the exit
findCurrentRoomIndex()
    for (var i=0; i < RoomList[foundRoomIndex].possibleExits.length; i++){
        console.log("PossibleExits legnth is " + RoomList[foundRoomIndex].possibleExits.length)
        console.log("Testing for direction = " + direction + " with i of " + i)
        if (direction === RoomList[foundRoomIndex].possibleExits[i][0].exit){
            var foundDirIndex = i
    }
 }
 console.log ("Found direction at index " + foundDirIndex)

//Fails out if direction not found.
    if (RoomList[foundRoomIndex].possibleExits[foundDirIndex] === undefined){
        console.log("You can not go that direction.");
        return
}

//Locked door check
    if(RoomList[foundRoomIndex].possibleExits[foundDirIndex][0].lock === undefined){
        console.log("No lock detected! Move accepted.");
    }else if(RoomList[foundRoomIndex].possibleExits[foundDirIndex][0].lock[0] === true){
        console.log("The Door is Locked! Stopping move.")
        return;
    }else if(RoomList[foundRoomIndex].possibleExits[foundDirIndex][0].lock[0] === false){
        console.log("This door has been unlocked already. Allowing move.")
    }

//Set currentRoom to the destination.
currentRoom = RoomList[foundRoomIndex].possibleExits[foundDirIndex][0].to
console.log ("currentRoom has been changed to " + currentRoom)

//Prints description of new currentRoom
 findCurrentRoomIndex()
 console.log (RoomList[foundRoomIndex].desc)
}

function tpPlayer(room){//Teleports player to target room.
    console.log("Player casts a teleportation spell in " + currentRoom)
    currentRoom = room;
    findCurrentRoomIndex();
    console.log ("Player has reappeared in " + currentRoom)
}

function itemPickUp(plainTextItemName){
    //User types in name of item in plaintext
    //Convert the displayname to ID
        var itemID = lookUpItemID(plainTextItemName);
        console.log(itemID + " is itemID")
    //Test failure conditions
    //  -Does room have contents
        if(RoomList[foundRoomIndex].contents === undefined){
            console.log("This room has no contents.")
            return false;
        }else{
            console.log("Room has contents")
        };
    //  -Is itemID in those contents
        var index
        function roomHasItemAsProperty(){
            console.log(itemID);
            console.log(RoomList[foundRoomIndex].contents);
            for(var i in RoomList[foundRoomIndex].contents){
                console.log("i is " + i)
                console.log(RoomList[foundRoomIndex].contents[i]);
                if(RoomList[foundRoomIndex].contents[i] == itemID){
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
            RoomList[foundRoomIndex].contents.splice(index,1)
            console.log ("Removed " + itemID + " from room. Remaining contents are:")
            console.log(RoomList[foundRoomIndex].contents)
            //TODO: Refactor this to permit quantity
        }else{
            console.log("Item does not exist in Room.")
            return false; 
        //  -Is locked? <future function goes here probably
    //Remove itemID from room contents
    }
}

function useKey(keyName, direction){
    //TODO: Refactor: Make this a more generic function
    //Init Vars
    var foundDirectionIndex
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
        function isDirectionValid(direction){
            for(i=0;i<RoomList[foundRoomIndex].possibleExits.length;i++){
                console.log("Checking " + direction + " against " + RoomList[foundRoomIndex].possibleExits[i][0].exit)
                if(direction === RoomList[foundRoomIndex].possibleExits[i][0].exit){
                    console.log("foundDirectionIndex is at i=" + i);
                    foundDirectionIndex = i;
                    return true;    
                }
        }console.log("Invalid Direction.")
         return false;
    }
        console.log("Begin Direction Test");
        if(isDirectionValid(direction)===true){
            console.log("Direction Check Passed!")
        }else{
            console.log("Direction Check Failed!")
            return;
        }
        //if no lock in direction
        function isDirectionLocked(direction){
            console.log("foundDirectionIndex is " + foundDirectionIndex)
            console.log("Lock looks like " + RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock)
            if (RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock === undefined){
                console.log("No Lock Found in that direction")
                return false;
            }
            else if(RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock[0] === true){
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
        function doesKeyMatchLock(keyName, foundDirectionIndex){
            console.log("Lock Length of "+ RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock.length)
            for(i=1;i<RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock.length;i++){
                console.log ("Analyzing lock position " + i + " which contains " + RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock[i]);
                if(keyName === RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock[i]){
                    console.log("setting foundKeyIndex to "+ i);
                    foundKeyIndex = i;
                    return true;
                }
            }return false;
        }
        console.log("Begin Lock|Key Concordance Test");
        console.log("Keyname: " + keyName + " and foundDirectionIndex " + foundDirectionIndex);
        if(doesKeyMatchLock(keyName, foundDirectionIndex)===true){
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
        console.log("Lock is: " + RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock)
        console.log("Removing item at " + foundKeyIndex + ". It should be " + keyName)
        RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock.splice(foundKeyIndex,1);
        console.log("Lock is: " + RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock); 
    }
    removeKeyfromLock(keyName, foundKeyIndex);

    //check if lock open
    function lockCheck(){
        if(RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock.length === 1){
            console.log("Lock length remaining is 1. Unlocking.");
            RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock[0]=false;
        }else{
            var keysNeeded = RoomList[foundRoomIndex].possibleExits[foundDirectionIndex][0].lock.length - 1;
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

    }
        



//TEST SUITE
function runTest(){
    movePlayer("North");
    itemPickUp("Blork")
    movePlayer("West");
    movePlayer("North");
    itemPickUp("Red Key");
    itemPickUp("Vault Map");
    console.log("DEBUG RED KEY INSPECT")
    inspectItem("Red Key")
    movePlayer("South");
    movePlayer("East");
    movePlayer("East");
    movePlayer("North");
    movePlayer("South");
    movePlayer("West");
    movePlayer("North");
    movePlayer("West")
    tpPlayer("Vault");
    movePlayer("South");
    movePlayer("North");
    movePlayer("West");
    movePlayer("North");
    lookUpItemID("Vault Map");
    itemPickUp(lookUpItemID("Vault Map"));
    console.log("Inventory: " + inventory);
    movePlayer("South");
    movePlayer("East");
    useKey("redKey", "North")
    movePlayer("East");
    movePlayer("North");
    itemPickUp("Blue Key");
    movePlayer("South");
    movePlayer("West");
    useKey("blueKey", "North")
    movePlayer("North")
    console.log("Inventory: " + inventory);
    inspectItem("Vault Map");
    inspectItem("BIG SUPER FAKE ITEM");
};

function itemTest(){
    lookUpDisplayName("redKey");
    var displayNameLookupTest = lookUpDisplayName("redKey");
    console.log ("displayNameLookupTest outputs: " + displayNameLookupTest + ". Expected 'Red Key'");
    var idLookupTest = null
    idLookupTest = lookUpItemID("Red Key");
    console.log(idLookupTest);
    console.log("idLookUpTest outputs:" + idLookupTest + " Expected: 'itemList.redKey'")
    console.log("Inventory Check Next")
    console.log(inventory);

    };

function newItemTest(){
    movePlayer("North")
    movePlayer("West")
    movePlayer("North")
    itemPickUp("Red Key")
    itemPickUp("Florb")
    itemPickUp("Red Key")
    itemPickUp("Blue Key")
    };

//runTest();
console.log("North Door is " + newRoomList.mHall.doors.north.length);
//itemTest();
//newItemTest()




