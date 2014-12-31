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
  checked:true
}
];
React.render(
  <List items={listData} text="My List"/>,
  document.getElementById('list')
);
