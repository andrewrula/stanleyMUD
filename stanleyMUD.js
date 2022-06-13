//Description of Game
//
// Map should be: 
//    [RedKeyRoom]   [Vault]   [BlueKeyRoom]
//        ||           ||       git   || 
//     [LHall]  =  [MHall]  =  [RHall]
//                   ||
//                 [Entry]
//
// In RedKeyRoom there is a Red Key.
// In BlueKeyRoom there is a Blue Key.
// In MHall there is a North-facing door. It needs both red and blue keys to open.
// In Vault is the Treasure.

//Initializing currentRoom to Entry and calling vars
    console.log ("I am a startup message!")
    var inventory = [];
    var foundRoomIndex;
    var currentRoom = "Entry";
    console.log("Initialized currentRoom to " + currentRoom)
//Loads Room List and sets Current Index
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
                lock:[true,"Red Key","Blue Key"]}
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
            contents:["Some Jewels", "Red Key","A Map"]
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
        contents:["Blue Key"]
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
    console.log("Room List loaded with " + RoomList.length + " rooms")
    findCurrentRoomIndex();
    console.log("CurrentRoom index set to " + foundRoomIndex);    

var itemList = [
    {//itemKeyFormat
        id: "itemKeyFormat",
        desc: "itemDescription"
        },
    { //Red Key
        id:"Red Key",
        desc: "An ornate Red Key, found in the Red Key Room. It is the same color as one of the Vault door locks in the Main Hall."
        },
    { //Blue Key
        id:"Blue Key",
        desc: "An ornate Blue Key, found in the Blue Key Room. It is the same color as one of the Vault door locks in the Main Hall."
        },
];

var itemList2 = {
    itemKeyformat: {itemId: "name", itemDesc: "itemDescription"},
    redKey: {itemId: "Red Key", itemDesc: "An ornate Red Key, found in the Red Key Room. It is the same color as one of the Vault door locks in the Main Hall."},
    blueKey:{itemId: "Blue Key", itemDesc: "An ornate Blue Key, found in the Blue Key Room. It is the same color as one of the Vault door locks in the Main Hall."},
}

function findCurrentRoomIndex(){//Find the index for the currentRoom
for (var i=0; i < RoomList.length; i++){
    if (currentRoom === RoomList[i].id){
        foundRoomIndex = i;
    } 
 }
 console.log ("Found room at index " + foundRoomIndex)  
}

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

function pickUpItem(item){
//TODO: Refactor this to use the some() array method.
    var exists = 0
    var tryingToPickUp = item 
    function ifExistsAddExists(target){
        if(target === tryingToPickUp){
            exists += 1;
            return;
        }else{
            return;
        }
    }

    if(RoomList[foundRoomIndex].contents === undefined){
        console.log("That item does not exist here")
        return;
    }else{
    RoomList[foundRoomIndex].contents.forEach(ifExistsAddExists);
        if(exists > 0){
            inventory.push(tryingToPickUp);
            console.log("Added " + tryingToPickUp + " to Inventory")
            for(i=0; i<RoomList[foundRoomIndex].contents.length;i++){
                console.log("Looking for " + tryingToPickUp + " in " + RoomList[foundRoomIndex].contents[i] + " with i of " + i);
                if(tryingToPickUp == RoomList[foundRoomIndex].contents[i]){
                    RoomList[foundRoomIndex].contents.splice(i,1);
                    console.log("Removed " + tryingToPickUp + "from " + currentRoom);
                    console.log("Remaining in Room: " + RoomList[foundRoomIndex].contents)
                    return;
                }
            }
        }else{console.log("That item does not exist here.")
    }
}
}

function useKey(keyName, direction){
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

function runTest(){
    movePlayer("North");
    pickUpItem("Blork")
    movePlayer("West");
    movePlayer("North");
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
    pickUpItem("A Map")
    pickUpItem("Red Key");
    pickUpItem("Red Key");
    console.log("Inventory: " + inventory)
    movePlayer("South");
    movePlayer("East");
    useKey("Red Key", "North")
    movePlayer("East");
    movePlayer("North");
    pickUpItem("Blue Key");
    movePlayer("South");
    movePlayer("West");
    useKey("Blue Key", "North")
    movePlayer("North")
    console.log("Inventory: " + inventory);
};


runTest();


/* RoadMap
Milestone 1:
    -Basic End-to-End of Dungeon Level 1
    -Inventory
    -Rooms
    -Doors
    -Locks
    -Using Keys on Doors
    -Picking Up Items

Milestone 2:
-Get git going good    
-User Input + Core Game Loop (User Input --> Game Does a Thing --> Ask for New Input )
        -Help Command (To teach you to play)
    -Item Expansion!
        -Add Item Directory
            TODO: Decide on directory format.
            TODO: Support itemID vs display name
        -Inspect Items -> Read Description Out
        -Teach Players About Teleporting!
            -Add Item Descriptions
    -Room Expansion
        -Inspect current room -> Display description
        -Flesh out room descriptions in RoomList
    -Refactor: Use items that arent keys
    -Dynamic Events (Events triggered on something happening)
    -Dungeon Expansion 1 - The Ancient Temple!
        -Tons more rooms! 
            - Lots of keys of different forms 
        -Secret doors.
            -Modify descriptions depending on door being detected.
        -Solve puzzles!
            -Sphinx's Riddle
            -Shrine of the Silver Monkey

Milestone 3:
    -Menu screen on load
        -New Game, Load Game, Exit
    -Add ability to Save game
    -Add Game Over condition. --> Back to Menu
    -Build out external(?) Test Suite
    -Abilities and Spells?
    
    
Milestone 4+:
    -NPCs!
        -Conversations and conversation trees
        -Vendors
        -Add Money
    -Combat System
        -Player needs stats
        -Equipment
        -Inventory needs quantity
            -Refactor pickUpItem to have quantity handling
        
*/