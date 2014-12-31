var longName ={
  text:"Long Name - Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Dude"
}
var avatarAndTodayitem = {        
  avatarUrl:"/img/ownerImage.jpg",
  text:"Due Today",
  date:new Date()
};

var avatarAndDate = {
  avatarUrl:"/img/ownerImage.jpg",
  text:"Due Jan 1",
  date:new Date(2015,0,1)
};

var farDateItem = {        
  date:new Date(2090,1,2),
  text:"I am due in the FUTURE"
};

var overDueItem = {        
  date:new Date(2000,1,2),
  text:"Over Due Item"
};
var avatarAndNoDate = {        
  avatarUrl:"/img/ownerImage.jpg",
  text:"default text"
};

var noAvatarAndNoDate = {        
  text:"default text"
};

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




var listData = [noAvatarAndNoDate,avatarAndNoDate,avatarAndDate];

React.render(
  <List items={listData} text="My List"/>,
  document.getElementById('list')
);
