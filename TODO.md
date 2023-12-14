1. It accepts 2 arrays: newMembersData and currentUserFriendsData
2. Both are arrays of objects, objects that represent user data
3. All objects from both arrays have _id property, and each _id represents a user
4. A user can be in both arrays or just one or be not included in either
5. I want the function to look for any currentUserFriendsData[] user and check if in newMembersdata[], there's an object with the same _id, and if so, remove it from the currentUserFriendsData[]