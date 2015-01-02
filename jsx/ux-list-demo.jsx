var listData = [
{
  id:1,
  avatarUrl:"/img/ownerImage.jpg",
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
];
React.render(
  <List items={listData} text="My List" show="show"/>,
  document.getElementById('list')
);
