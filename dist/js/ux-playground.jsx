
var avatarAndDate = {        
  avatarUrl:"/img/ownerImage.jpg",
  text:"default text",
  date:"1/2/2015"
};
var avatarAndNoDate = {        
  avatarUrl:"/img/ownerImage.jpg",
  text:"default text"
};

var noAvatarAndNoDate = {        
  text:"default text"
};

React.render(
  <Item data={avatarAndDate} />,
  document.getElementById('avatar-nodate-item')
);
React.render(
  <Item data={avatarAndNoDate} />,
  document.getElementById('avatar-date-item')
);
React.render(
  <Item data={noAvatarAndNoDate} />,
  document.getElementById('noavatar-nodate-item')
);
