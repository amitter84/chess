
export function findControls(p,s)
{
console.log("hi");
function findI(a,b)
{
  let k=(8*(b-1)+(a-1));
  return k;
}
 let check= {checkblackking: 0,whiteking:0};
for(let i=0;i<64;i++)
{
  if(p[i]!=null)
  {

  let y=Math.floor(i/8)+1;
  let x=i%8+1;
  let color=p[i].split("_")[0];
  let piece=p[i].split("_")[1];
  let x1=[], y1=[],i1=0,i2=0,i3=[];

  if(piece=="pawn")
  {
      x1[0]=x;
      y1[0]=(color=="w")?(y-1):(y+1);
      i1=findI(x1[0],y1[0]);
     
    
    /*
      if(p[i1]==null)
      {
        p[i1]="validMove";
        console.log("nice");
      }
      
      if((color=="w" && y==7) || (color=="b" && y==2) && p[i1]!=null)
      {
      y1[0]=(color=="w")?(y1[0]-1):(y1[0]+1);
      i2=findI(x1[0],y1[0]);
      console.log(x1[0],y1[0],i2);
      if(p[i2]==null && p[i1]=="validMove")
        {
          console.log("nice1");        
          p[i2]="validMove";
        }
        
      }
      */
      let ibr=0;
    
      if( (x-1)>0 && (y+1)<=8 && color=="b")
      {
        ibr=findI((x-1),(y+1));
        
          s[ibr].blackcontrol = 1;
          

      }
      
      if( (x+1)<=8 && (y+1)<=8 && color=="b")
      {
        ibr=findI((x+1),(y+1));
        
          s[ibr].blackcontrol = 1;
      }
      if( (x+1)<=8 && (y-1)>0 && color=="w")
      {
        ibr=findI((x+1),(y-1));
        
          s[ibr].whitecontrol = 1;
        
          
        
      }
      if( (x-1)>0 && (y-1)>0 && color=="w")
      {
        ibr=findI((x-1),(y-1));
        
        s[ibr].whitecontrol = 1;
      }
      
    
  }
  else if(piece=="rook" || piece=="queen")
  {
    
      for(i2=y+1;i2<=8;i2++)
      {
       
      i1=findI(x,i2);
      
      
    
        if(color=="w")
        {
          s[i1].whitecontrol++;
        }
        else if(color=="b")
        {
          s[i1].blackcontrol++;
        }
      
      if(p[i1]!=null)
      {
      break;
      }
      
        
      }
      
      for(i2=y-1;i2>0;i2--)
      {
       
      i1=findI(x,i2);
      
      
        if(color=="w")
        {
          s[i1].whitecontrol++;
        }
        else if(color=="b")
        {
          s[i1].blackcontrol++;
        }
      
      if(p[i1]!=null)
      {
      break;
      }
        
      }
      for(i2=x+1;i2<=8;i2++)
      {
       
      i1=findI(i2,y);
      
        if(color=="w")
        {
          s[i1].whitecontrol++;
        }
        else if(color=="b")
        {
          s[i1].blackcontrol++;
        }
      
      if(p[i1]!=null)
      {
      break;
      }
        
      }
      for(i2=x-1;i2>0;i2--)
      {
       
      i1=findI(i2,y);
      
        if(color=="w")
        {
          s[i1].whitecontrol++;
        }
        else if(color=="b")
        {
          s[i1].blackcontrol++;
        }
      
      if(p[i1]!=null)
      {
      break;
      }
      
        
      }
      
  }
  if(piece=="bishop" || piece=="queen")
  {
      i3=x;
      for(i2=y+1;i2<=8;i2++)
      {
      if(i3<2 || i3>7)
      {
        break;
      }
      else
      {
      i3++;
      }
      i1=findI(i3,i2);
    
        if(color=="w")
      {
        s[i1].whitecontrol++;
      
      }
      else if(color=="b")
      {
        s[i1].blackcontrol++;
      
      } 
      
      if(p[i1]!=null)
      {
      break;
      }
      
      
        
      }
      i3=x;
      for(i2=y-1;i2>0;i2--)
      {
       if(i3<2 || i3>7)
      {
        break;
      }
      else
      {
      i3--;
      }
      i1=findI(i3,i2);
    
      if(color=="w")
      {
        s[i1].whitecontrol++;
      
      }
      else if(color=="b")
      {
        s[i1].blackcontrol++;
      
      } 
      
      if(p[i1]!=null)
      {
      break;
      }
      }
      
        
      
      i3=x;
      for(i2=y+1;i2<=8;i2++)
      {
       if(i3<2 || i3>7)
      {
        break;
      }
      else
      {
      i3--;
      }
      i1=findI(i3,i2);
      
      if(color=="w")
      {
        s[i1].whitecontrol++;
      
      }
      else if(color=="b")
      {
        s[i1].blackcontrol++;
      
      } 
      
      if(p[i1]!=null)
      {
      break;
      }
      
        
      }
      i3=x;
      for(i2=y-1;i2>0;i2--)
      {
       if(i3<2 || i3>7)
      {
        break;
      }
      else
      {
      i3++;
      }
      i1=findI(i3,i2);
      
      if(color=="w")
      {
        s[i1].whitecontrol++;
      
      }
      else if(color=="b")
      {
        s[i1].blackcontrol++;
      
      } 
      
      if(p[i1]!=null)
      {
      break;
      }
      
        
      }
  }
  else if(piece=="knight")
  {
      x1[0]=x+1;
      y1[0]=y+2;
      x1[1]=x-1;
      y1[1]=y+2;
      x1[2]=x+2;
      y1[2]=y+1;
      x1[3]=x+2;
      y1[3]=y-1;
      x1[4]=x+1;
      y1[4]=y-2;
      x1[5]=x-1;
      y1[5]=y-2;
      x1[6]=x-2;
      y1[6]=y-1;
      x1[7] =x-2;
      y1[7]=y+1;
      for(i2=0;i2<=7;i2++)
      {
      if((x1[i2]>0 && x1[i2]<=8) && (y1[i2]>0 && y1[i2]<=8))
      {
      i1=findI(x1[i2],y1[i2]);
      
        if(color=="b")
        {
          s[i1].blackcontrol++;
        }
        if(color=="w")
        {
          s[i1].whitecontrol++;
        }
      
      
      }
      }
  }
  
  else if(piece=="king")
  {
      if(color=="b")
      check.blackking=i;
      else
      check.whiteking=i;
      
      x1[0]=x;
      y1[0]=y-1;
      x1[1]=x-1;
      y1[1]=y-1;
      x1[2]=x-1;
      y1[2]=y;
      x1[3]=x-1;
      y1[3]=y+1;
      x1[4]=x;
      y1[4]=y+1;
      x1[5]=x+1;
      y1[5]=y+1;
      x1[6]=x+1;
      y1[6]=y;
      x1[7]=x+1;
      y1[7]=y-1;

      for(i2=0;i2<=7;i2++)
      {
      if((x1[i2]>0 && x1[i2]<=8) && (y1[i2]>0 && y1[i2]<=8))
      {
      i1=findI(x1[i2],y1[i2]);
      
      if(color=="w")
      {
        s[i1].whitecontrol++;
      }
      else if(color=="b")
      {
        s[i1].blackcontrol++;
      }
      }
      }
    
  }
}
}
  let arr=[];
  arr.push(s);
  arr.push(check);
  return arr;

}