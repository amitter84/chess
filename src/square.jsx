export function Square({ key, className, valid, piece, onClick })
{
function pieceToUnicode(p)
{
  switch(p)
  {
  //white
    case "w_king": return '\u2654';
    break;
    case "w_queen": return '\u2655';
    break;
    case "w_rook": return '\u2656';
    break;
    case "w_bishop": return '\u2657';
    break;
    case "w_knight": return '\u2658';
    break;
    case "w_pawn": return '\u2659';
    break;
    //black
    case "b_king": return '\u265A';
    break;
    case "b_queen": return '\u265B';
    break;
    case "b_rook": return '\u265C';
    break;
    case "b_bishop": return '\u265D';
    break;
    case "b_knight": return '\u265E';
    break;
    case "b_pawn": return '\u265F';
    break;
    case "validMove": return "\u25CF";
  }
  
  
}
return(
  <div key={key} className={className} onClick={onClick}>
  {valid && <div className="circle">
  {pieceToUnicode(piece)}
  </div>}
  {!valid && <>{pieceToUnicode(piece)}</>}
  </div>
);
}