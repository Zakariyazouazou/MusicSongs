var song_pic = document.getElementById("song_pic")
// song_pic.style.backgroundImage=`url(./pic/image3.jpg)`
var song_number = document.getElementById("song_number")
var song_art = document.getElementById("song_art")
var song_artiste=document.getElementById("song_artiste")
var range_time=document.getElementById("range_time")
var customRange = document.getElementById("customRange")
var song_pic = document.querySelector(".song_pic")
var range_time_rest = document.getElementById("range_time_rest")
var customRange1 = document.getElementById("customRange1")
var shuffle_button = document.getElementById("shuffle_button")
var backward_fast_button = document.getElementById("backward-fast_button")
var play = document.getElementById("play")
var next = document.getElementById("next")
var retry = document.getElementById("retry")
var wave = document.querySelector(".wave")
var song = document.createElement("audio")
var fa_shuffle = document.querySelector(".fa-shuffle")

var index = 0 ; 
var isRandom = false ; 
var isplay = false ; 


var album = [
    { numero : "1" , 
      image : 'pic/image1.jpg',
      song : 'music/Bang Bang  Paloma & James  [007].mp3',
      song_name : 'bang bang',
      song_artiste : 'dua lipa' 
    },
    {
        numero : "2" , 
        image:'pic/image2.jpg' , 
        song:'music/Bebe Rexha - I Got You (Audio).mp3' , 
        song_name: 'I got you', 
        song_artiste: 'bebe Rexha',
    },
    {
        numero : "3" , 
        image:'pic/image3.jpg' , 
        song:'music/Mabel - Dont Call Me Up.mp3' , 
        song_name: 'Dont call me up', 
        song_artiste: 'Mabel',
    },
    {
        numero : "4" , 
        image:'pic/image4.jpg' , 
        song:'music/Mark Ronson & Miley Cyrus - Nothing Breaks Like a Heart (Audio).mp3' , 
        song_name: 'nothing breal like heart', 
        song_artiste: 'Miley Cyrus',
    }
]; 

play_index(index)


function play_index(index){
    reset()


    song.src=album[index].song
    song.load()



    song_number.innerHTML=album[index].numero ; 
    song_pic.style.backgroundImage=`url(${album[index].image})`
    song_art.innerHTML=album[index].song_name
    song_artiste.innerHTML=album[index].song_artiste

    setInterval(upload,500)
    gradiationcolor()
    song.addEventListener("ended",()=>{next_play()})
    
   
    
}
function  gradiationcolor(){
    var a ; 
    var hex=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e'] ; 
    function transform(a){
        for(var i = 0 ; i<6 ; i++){
            var x = Math.round(Math.random()*14)
            var y = hex[x]; 
            a += y
        }
        return a  
    }

   var Color1 = transform("#"); 
  
   var Color2 = transform("#"); 
   var angel = 'to right'
   var gradient =  'linear-gradient(' + angel + ',' + Color1 + ', ' + Color2 + ")";
  console.log(gradient)
   document.body.style.background=gradient  
}

function play_pause(){
   isplay ? pause_song() : play_song()
}
function play_song(){
   isplay = true ; 
   song.play()
   song_pic.classList.add("rotation")
   wave.classList.add("loader")
   backward_fast_button.innerHTML=`<i class="fa-sharp fa-solid fa-circle-pause"></i>`
}
function pause_song(){
    isplay = false ; 
    song.pause()
    song_pic.classList.remove("rotation")
    wave.classList.remove("loader")
    backward_fast_button.innerHTML=`<i class="fa-solid fa-play "></i>`
 }

 function  random(){
    isRandom ? randomu_pause() : random_play()
 }


 function random_play(){
    isRandom = true ; 
    fa_shuffle.classList.add("random_modify")
 }
 function randomu_pause(){
    isRandom = false ; 
    fa_shuffle.classList.remove("random_modify")
 }

 function next_play(){
    if(index<album.length-1 && isRandom===false){
        index+=1
        play_index(index)
        play_song()
    }
    else if (index<album.length-1 && isRandom===true){
       var index_number = parseInt(Math.random()*album.length-1)
       index = index_number
       play_index(index)
       play_song()
    }
    else{
        index = 0 ; 
        play_index(index)
       play_song()
    }
 }
 function pre_play() {
    if(index>0){
        index-=1
        play_index(index)
        play_song()
    }
    else{
        index = album.length - 1
        play_index(index)
        play_song()
    }
 }
 function reset(){
    var again = index ; 
    index = again
    play_index(index)
    play_song()
 }
 function  volume_valeur() {
    var nivou = customRange1.value/100
    song.volume=nivou
 }

 function time_contrle(){
    var time = song.duration*(customRange.value/100)
    song.currentTime = time
 }

function reset(){
    range_time.innerHTML="00:00" ;
    range_time_rest.innerHTML="0"+( Math.round (song.duration/60))+":"+(Math.round (song.duration%60))
}



function upload(){
    var now = 0 ; 
    now = song.currentTime * (100/song.duration)
    customRange.value=now ; 



    var minutes = Math.floor(song.currentTime/60); 
    var second = Math.floor(song.currentTime-minutes*60)
    if (minutes<60){var minut2="0"+minutes}
    
    if(second <60)
    {var second2=second}
    range_time.innerHTML=minut2+":"+second2

}
