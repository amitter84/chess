import { Square } from './square.jsx';
import { useState, useEffect } from 'react';
import { findValidMoves } from './findValidMoves.js'
import { findControls } from './findControls.js'

export function Board({socket, roomId, playerName })
{
//Start of socket handling
 useEffect(() => {
    socket.on('move', ({pieces, squares, whitesTurn, check}) => {
      setPieces(pieces);
      setSquares(squares);
      setWhitesTurn(whitesTurn);
      setCheck(check);
      setToggle(false); // Reset selection after remote move
    });

    return () => {
      socket.off('move');
    };
  }, [socket]);

  const handleMove = (move) => {
    socket.emit('move', move, roomId);
    // Update local board state
  };
//End of socket handling
const [pieces,setPieces] = useState(["b_rook","b_knight","b_bishop","b_queen","b_king","b_bishop","b_knight","b_rook","b_pawn","b_pawn","b_pawn","b_pawn","b_pawn","b_pawn","b_pawn","b_pawn",...Array(32).fill(null),"w_pawn","w_pawn","w_pawn","w_pawn","w_pawn","w_pawn","w_pawn","w_pawn","w_rook","w_knight","w_bishop","w_queen","w_king","w_bishop","w_knight","w_rook"]);
const [squares,setSquares] = useState([{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0},{class: "tile",valid:false,whitecontrol:0,blackcontrol:0}]);
const [toggle,setToggle] = useState(false);
const [whitesTurn,setWhitesTurn] = useState(true);
const [selectPiece,setSelectPiece] = useState(0);
const [piecesBackUp,setPiecesBackUp] = useState(Array(64).fill(null));
const [check,setCheck] = useState(null);

function handleClick(i)
{
 console.log('clicked');
 let overlapInd=false;
 let p = pieces.slice(); 
 let s = squares.slice();
 //1st click on board toggle=false
if((pieces[i]!=null) && (check==null))
 {
 if (toggle && pieces[i].split("_")[0]===pieces[selectPiece].split("_")[0])
 {
 
   overlapInd=true;
   
  
  
  
  p=p.map(a=>(a=="validMove")?null:a);
  s[selectPiece]=(s[selectPiece].class=="tile-highlight")?{class: "tile",valid:false,whitecontrol:0,blackcontrol:0}:{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0};
 
  s=s.map((b)=> {
  if(b.valid)
  {
    if(b.class=="tile")
    {
      return ({class: "tile",valid:false,whitecontrol:0,blackcontrol:0});
    }
    else if(b.class=="tile-black")
    {
      return ({class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0});
    }
  }
  else
  {
    return b;
    
  }
  });
  
  //setSquares(s);
  //setPieces(p);

 } 

 }
 if(!toggle  || overlapInd)
 {
  
  if(p[i]!=null)
  {
  if((whitesTurn && p[i].split("_")[0]=="w") || (!whitesTurn && p[i].split("_")[0]=="b"))
    {
       
       
       
       let validMoves=findValidMoves(p,s,i);
      
       
       setPieces(validMoves[0]);
       setSquares(validMoves[1]);
       setSelectPiece(i);
    
      if(!overlapInd)
       setToggle(!toggle);
      
    }   
  } 
 }
 //2nd click on board toggle=true
 else if (toggle)
 {
   let isMoveValid;
   if(pieces[i]=="validMove" || squares[i].valid==true)
    {
      isMoveValid=true;
    }
   else
    {
      isMoveValid=false;
    }
  //if()
  //if(pieces[i][0]==null || pieces[i][0]!=pieces[selectPiece][0])
  
  
  if(isMoveValid)
  {
   p[i]=p[selectPiece];
   p[selectPiece]=null;
  
   
   
  }
  p=p.map(a=>(a=="validMove")?null:a);
  s[selectPiece]=(s[selectPiece].class=="tile-highlight")?{class: "tile",valid:false,whitecontrol:0,blackcontrol:0}:{class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0};
 
  s=s.map((b)=> {
  if(b.valid || b.whitecontrol>0 || b.blackcontrol>0)
  {
    if(b.class=="tile")
    {
      return ({class: "tile",valid:false,whitecontrol:0,blackcontrol:0});
    }
    else if(b.class=="tile-black")
    {
      return ({class: "tile-black",valid:false,whitecontrol:0,blackcontrol:0});
    }
  }
  else
  {
    return b;
    
  }
  });
 
  let arr = findControls(p,s);
  s=arr[0];
  let c =arr[1] ;
  let wk=c.whiteking;
  let bk=c.blackking;
  let flag =0;
  console.log(wk,bk);
  if(check=="black" && s[bk].whitecontrol>0)
  {
   p[selectPiece]=p[i];
   p[i]=null;
  
   flag=1;

  }
  else if (check=="white" && s[wk].blackcontrol>0) {
    
  p[selectPiece]=p[i];
   p[i]=null;
  flag=1;
   

   }
  else if (check=="black" && s[bk].whitecontrol==0)
  {
  setCheck(null)  ;
  }
  else if (check=="white" && s[wk].blackcontrol==0) {
  setCheck(null)  ;
  }
  
  
  setSquares(s);
  setPieces(p);
  
  
  if(s[wk].blackcontrol!=0)
  {
    alert("check...");
    setCheck("white");
  }
  else if (s[bk].whitecontrol!=0)
  {
    alert("check...");
    setCheck("black");
  }

  if(isMoveValid && flag!=1)
  {
  
  
   
   setWhitesTurn(!whitesTurn);
 // Emit move to other clients
    socket.emit('move', {
      pieces: p,
      squares: s,
      whitesTurn: !whitesTurn,
      check: check,
    },  roomId);


  }
  setToggle(!toggle);
 
 }

}
return(
<div id='board'>
 {pieces.map((piece,index)=>
  (<Square key={index} className={squares[index].class} valid={squares[index].valid} piece={piece} onClick={()=>handleClick(index)} />
  ))}
</div>
 );
}