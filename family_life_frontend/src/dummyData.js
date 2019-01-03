export const users = [
  {
    name: "Dad",
    id: 123,
    chores: [
      { title: "Mow lawn", status: "not started" },
      { title: "Fix sink", status: "in progress" }
    ]
  },
  {
    name: "Mom",
    id: 124,
    chores: [{ title: "Buy grocery", status: "not started" }]
  },
  {
    name: "Jan",
    id: 125,
    chores: [
      { title: "Wash dishes", status: "completed" },
      { title: "Clean room", status: "in progress" }
    ]
  },
  {
    name: "Tom",
    id: 126,
    chores: [
      { title: "Clean bathroom", status: "not started" },
      { title: "Walk dog", status: "completed" }
    ]
  }
];

export const account = {
  id: 123,
  name: "Dad",
  type: "Parent",
  familyMembers: [
    {
      name: "Mom",
      type: "Parent"
    },
    {
      name: "Jan",
      type: "Child"
    },
    {
      name: "Tom",
      type: "Child"
    }
  ]
}
export const activities = [
 { 
   id: 1,
  name: "Football",
  type: "Sports"
 },
 { 
  id: 2,
 name: "Run",
 type: "Sports"
}
]
