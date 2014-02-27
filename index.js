var express = require("express");
var app = express();
var port = 3131;


app.set('views',__dirname+'/views');
app.set('view engine',"jade");
app.engine('jade',require('jade').__express);

app.get("/",function(req,res){
	res.render("index.jade");
});

app.use(express.static(__dirname+'/public'));

var io = require('socket.io').listen(app.listen(port,'0.0.0.0'));

var superglobalHighScore=0,globaltopscore1=0, globaltopscore2=0, globaltopscore3=0, globaltopscore4=0,globaltopscore5=0,connectCounter=0;

io.sockets.on('connection',function(socket)
{
	connectCounter++;
	io.sockets.emit('count',{number:connectCounter});
	socket.emit('highscoreUpdate',
	{
					highscoreUpdate:superglobalHighScore,
					topscore1:globaltopscore1,
					topscore2:globaltopscore2,
					topscore3:globaltopscore3,
					topscore4:globaltopscore4,
					topscore5:globaltopscore5,
					number:connectCounter
	});
	socket.on('send',function(data)
	{
		if(data.highscoreUpdate)
		{	
			superglobalHighScore=data.highscoreUpdate;
			io.sockets.emit('highscoreUpdate',data);
		}
		if(data.topscore1)
		{	
			if(data.topscore1>globaltopscore1)
			{
				globaltopscore1=data.topscore1;
				io.sockets.emit('highscoreUpdate',data);
			}
		}
		if(data.topscore2)
		{
			if(data.topscore2>globaltopscore2)
			{
				globaltopscore2=data.topscore2;
				io.sockets.emit('highscoreUpdate',data);
			}
		}
		if(data.topscore3)
		{
			if(data.topscore3>globaltopscore3)
			{
				globaltopscore3=data.topscore3;
				io.sockets.emit('highscoreUpdate',data);
			}
		}
		if(data.topscore4)
		{
			if(data.topscore4>globaltopscore4)
			{
				globaltopscore4=data.topscore4;
				io.sockets.emit('highscoreUpdate',data);
			}
		}
		if(data.topscore5)
		{
			if(data.topscore5>globaltopscore5)
			{
				globaltopscore5=data.topscore5;
				io.sockets.emit('highscoreUpdate',data);
			}
		}
	});
	
	socket.on('disconnect',function()
	{
		connectCounter--;
		io.sockets.emit('count',{number:connectCounter});
	});
});

console.log("Listening on port "+port);