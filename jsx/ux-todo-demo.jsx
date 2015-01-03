var listOneData = 
{
  id:2,
  text:"List One",
  archived:false,
  items:[
  {
    id:1,
    avatarUrl:"img/ownerImage.jpg",
    text:"Due Jan 1",
    date:new Date(2015,0,1),
    complete:true
  },
  {
    id:2,
    text:"Archived Item",
    archived:true,
    complete:true
  },
  {
    id:5,
    text:"Not much info here"
  },
  {
    id:6,
    text:"Finished this forever ago. Back when I was young and cool",
    archived:true,
    date:new Date(2014,11,1),
    complete:true
  }
  ]
};
var listTwoData = {
  id:1,
  text:"List Two",
  archived:true,
  items:[
  {
    id:1,
    avatarUrl:"img/ownerImage.jpg",
    text:"Due Jan 1",
    date:new Date(2015,0,1),
    complete:true
  },
  {
    id:2,
    text:"Archived Item",
    archived:true,
    complete:true
  },
  {
    id:5,
    text:"Not much info here"
  },
  {
    id:6,
    text:"Finished this forever ago. Back when I was young and cool",
    archived:true,
    date:new Date(2014,11,1),
    complete:true
  }
  ]
}
var listThreeData = {
  id:2,
  text:"List Three",
  archived:true,
  items:[
  {
    id:1,
    avatarUrl:"img/ownerImage.jpg",
    text:"Due Jan 1",
    date:new Date(2015,0,1),
    complete:true
  },
  {
    id:2,
    text:"Archived Item",
    archived:true,
    complete:true
  },
  {
    id:5,
    text:"Not much info here"
  },
  {
    id:6,
    text:"Finished this forever ago. Back when I was young and cool",
    archived:true,
    date:new Date(2014,11,1),
    complete:true
  }
  ]
};
React.render(
  <Todo lists={[listOneData,listTwoData,listThreeData]} />,
  document.getElementById('todo')
);

