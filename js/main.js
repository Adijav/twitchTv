$(document).ready(function(){
	var streamers = ["freecodecamp", "GeoffStorbeck", "terakilobyte", "habathcx","notmichaelmcdonald","RobotCaleb","medrybw","comster404","brunofin","thomasballinger","joe_at_underflow","noobs2ninjas","mdwasp","beohoff","xenocomagain"];
	var callback = '?client_id=5j0r5b7qb7kro03fvka3o8kbq262wwm&callback=?';
	var url = 'https://api.twitch.tv/kraken/';

	streamers.forEach(function(streamer){
		var myObj = {};
		$.getJSON(url+'streams/'+streamer+callback).success(function(data){
			var streaming = (data.stream === null) ? false : true;

			if(streaming)
				myObj.status = "online";
			else
				myObj.status = "offline";

			$.getJSON(url + 'users/' + streamer + callback).success(function(response){
				myObj.userLogo = response.logo;
				myObj.userName = response.display_name;

				console.log(myObj);

				if(myObj.status === "online"){
					if((myObj.userLogo !== null ) && (myObj.userLogo !== undefined))
						$('.onlineUsers,.allUsers').append('<a target="_blank" href="http://www.twitch.tv/'+streamer+'"><li><img class="img-circle" src="' + myObj.userLogo + '" /><div class="userName">'+streamer+'</div><div class="green">&nbsp</div></li></a>');	
					else
						$('.onlineUsers,.allUsers').append('<a target="_blank" href="http://www.twitch.tv/'+streamer+'"><li><img class="img-circle" src="../images/default.png"/><div class="userName">'+streamer+'</div><div class="green">&nbsp</div></li></a>');
				}
				else{
					if((myObj.userLogo !== null) && (myObj.userLogo !== undefined))
						$('.offlineUsers,.allUsers').append('<a target="_blank" href="http://www.twitch.tv/'+streamer+'"><li><img class="img-circle" src="' + myObj.userLogo + '" /><div class="userName">'+streamer+'</div><div class="red">&nbsp</div></li></a>');	
					else
						$('.offlineUsers,.allUsers').append('<a target="_blank" href="http://www.twitch.tv/'+streamer+'"><li><img class="img-circle" src="../images/default.png"/><div class="userName">'+streamer+'</div><div class="red">&nbsp</div></li></a>');
				}
			}); 	
		});
	});
});	