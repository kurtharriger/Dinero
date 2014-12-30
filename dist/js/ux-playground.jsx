var longName ={
  text:"Long Name - Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Dude"
}
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

React.render(
  <Item data={longName} />,
  document.getElementById('long-name-item')
);


var listData = [noAvatarAndNoDate,avatarAndNoDate,avatarAndDate];

React.render(
  <List items={listData} text="My List"/>,
  document.getElementById('list')
);
