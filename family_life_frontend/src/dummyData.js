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

export const homework = [
  {
    user: "Jan",
    due: new Date("2019-01-05"),
    status: "completed",
    title: "Algebra II",
    description: "Ex.4, no 1-10, page 110"
  },
  {
    user: "Tom",
    due: new Date("2019-01-10"),
    status: "incomplete",
    title: "Science Project",
    description: "Which Type of Sunglass Lenses Gives the Best Sun Protection?"
  },
  {
    user: "Jan",
    due: new Date("2019-02-20"),
    status: "incomplete",
    title: "Social Study",
    description: ""
  },
  {
    user: "Jan",
    due: new Date("2019-01-13"),
    status: "incomplete",
    title: "Toy Drive",
    description: "Run Math club toy drive"
  }
]