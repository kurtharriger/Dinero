var longName ={
  text:"Long Name - Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Dude"
}
var avatarAndTodayitem = {        
  id:0,
  avatarUrl:"/img/ownerImage.jpg",
  text:"Due Today",
  date:new Date()
};

var avatarAndDate = {
  id:1,
  avatarUrl:"/img/ownerImage.jpg",
  text:"Due Jan 1",
  date:new Date(2015,0,1)
};

var farDateItem = {        
  id:2,
  date:new Date(2090,1,2),
  text:"I am due in the FUTURE"
};

var overDueItem = {        
  id:3,
  date:new Date(2000,1,2),
  text:"Over Due Item"
};
var avatarAndNoDate = {        
  id:4,
  avatarUrl:"/img/ownerImage.jpg",
  text:"My user has a pic"
};

var noAvatarAndNoDate = {        
  id:5,
  text:"No much info here"
};

var archivedItem = {
  id:6,
  text:"Archived Item",
  archived:true,
  date:new Date(2014,11,1),
  checked:true
}

React.render(
  <Item data={avatarAndNoDate} />,
  document.getElementById('avatar-nodate-item')
);
React.render(
  <Item data={avatarAndDate} />,
  document.getElementById('avatar-date-item')
);
React.render(
  <Item data={noAvatarAndNoDate} />,
  document.getElementById('noavatar-nodate-item')
);

React.render(
  <Item data={longName} />,
  document.getElementById('long-name-item')
);

React.render(
  <Item data={farDateItem} />,
  document.getElementById('far-date-item')
);
React.render(
  <Item data={avatarAndTodayitem} />,
  document.getElementById('avatar-today-item')
);

React.render(
  <Item data={overDueItem} />,
  document.getElementById('overdue-item')
);
React.render(
  <Item data={archivedItem} />,
  document.getElementById('archived-item')
);



var listData = [noAvatarAndNoDate,avatarAndNoDate,avatarAndDate,archivedItem];

React.render(
  <List items={listData} text="My List"/>,
  document.getElementById('list')
);
