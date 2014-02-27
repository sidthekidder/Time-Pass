window.onfocus = function()
{
	focussed=true;
}
window.onblur = function()
{
	focussed=false;
}
var focussed=true;
window.onload = function()
{
	var content=document.getElementById("timerWrapper");
	var highscores=document.getElementById("highscoreTimerWrapper");
	var counter=0;
	var globalHighScore=0,topscore1=5,topscore2=4,topscore3=3,topscore4=2,topscore5=1;
	var divTopScore1 = document.getElementById("score first");
	var divTopScore2 = document.getElementById("score second");
	var divTopScore3 = document.getElementById("score third");
	var divTopScore4 = document.getElementById("score fourth");
	var divTopScore5 = document.getElementById("score fifth");
	var noOfClients = document.getElementById("numberOnline");
	console.log(divTopScore5);
	console.log(divTopScore4);
	console.log(divTopScore3);
	console.log(divTopScore2);
	console.log(divTopScore1);
	var socket = io.connect('http://172.17.20.65:3131');
	
	socket.on('highscoreUpdate',function(data)
	{
		if(data.highscoreUpdate)
		{
			if(data.highscoreUpdate>=globalHighScore)
			{	
				globalHighScore = data.highscoreUpdate;
				highscores.innerHTML = globalHighScore;
			}
		}
		if(data.topscore1)
		{
			console.log('got topscore1');
			topscore1 = data.topscore1;
			divTopScore1.innerHTML = data.topscore1;
		}		
		if(data.topscore2)
		{
			console.log('got topscore2');
			topscore2 = data.topscore2;
			divTopScore2.innerHTML = data.topscore2;
		}		
		if(data.topscore3)
		{
			console.log('got topscore3');
			topscore3 = data.topscore3;
			divTopScore3.innerHTML = data.topscore3;
		}		
		if(data.topscore4)
		{
			console.log('got topscore4');
			topscore4 = data.topscore4;
			divTopScore4.innerHTML = data.topscore4;
		}	
		if(data.topscore5)
		{
			console.log('got topscore5');
			topscore5 = data.topscore5;
			divTopScore5.innerHTML = data.topscore5;
		}			
		if(data.number)
		{
			numberOnline.innerHTML = data.number;
		}
	});
	
	socket.on('count',function(data)
	{
		if(data.number)
		{
		console.log('got a count!');
			numberOnline.innerHTML = data.number;
		}
	});

	setInterval(function(){
		if(focussed==true)
		{
			counter++;
			content.innerHTML=counter;
			if(counter>=topscore5)
			{	if(counter>=topscore4)
				{	if(counter>=topscore3)
					{	if(counter>=topscore2)
						{	if(counter>=topscore1)
							{	
								socket.emit('send',{topscore1:counter});
							}
							else
							socket.emit('send',{topscore2:counter});
						}
						else
						socket.emit('send',{topscore3:counter});
					}
					else
					socket.emit('send',{topscore4:counter});
				}
				else
				socket.emit('send',{topscore5:counter});
			}
			if(counter>globalHighScore)													
			{
				socket.emit('send',{highscoreUpdate:counter});
			}
		}
	},1000);
	
}