I need a function that does the ff:
1. It accepts memberID, which is another label for userID data
2. It also accepts tasksData, which is an array of tasks objects, each of which has "owner" properties
3. Those "owner" property is another label for userID data
4. The function must find all items in the tasksData array that have their "owner" property equal to the "memberID
5. Then, update those "owner" property to have the value "Unassigned"