I have the ff JSON
[{
  "_id": {
    "$oid": "65773f7c9407d34564bd6ee7"
  },
  "name": "Beat Kaido",
  "description": "We need to beat the Yonko, and we'll do Kaido first",
  "priority": "High",
  "done": false,
  "start": "2023-12-12",
  "due": "2023-12-31",
  "members": [
    {
      "_id": "65773b179407d34564bd6ed9",
      "role": "Captain"
    },
    {
      "_id": "65773bd49407d34564bd6edb",
      "role": "Swordsman"
    },
    {
      "_id": "65773c7c9407d34564bd6edd",
      "role": "Thing"
    }
  ],
  "tasks": [
    {
      "_id": "657741469407d34564bd6ef6"
    },
    {
      "_id": "657741629407d34564bd6ef7"
    },
    {
      "_id": "6577416c9407d34564bd6ef8"
    },
    {
      "_id": "6577417a9407d34564bd6ef9"
    },
    {
      "_id": "6577419b9407d34564bd6efc"
    },
    {
      "_id": "657741a59407d34564bd6efd"
    },
    {
      "_id": "657741b19407d34564bd6efe"
    },
    {
      "_id": "657741c09407d34564bd6eff"
    },
    {
      "_id": "657741ca9407d34564bd6f00"
    },
    {
      "_id": "657741d49407d34564bd6f01"
    },
    {
      "_id": "657741e39407d34564bd6f02"
    },
    {
      "_id": "657741ec9407d34564bd6f03"
    }
  ]
}]

When I console.log the value of the one object in it, "tasks" isn't being read. Is it because it's just a bunch of objects with _id and nothing else?