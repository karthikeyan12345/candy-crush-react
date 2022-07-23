
import React,{useState,useEffect} from "react";
import BlueCandy from './images/Blue-candy.png';
import GreenCandy from './images/Green-candy.png';
import OrangeCandy from './images/Orange-candy.png';
import PurpleCandy from './images/Purple-candy.png';
import RedCandy from './images/Red-candy.png';
import YellowCandy from './images/Yellow-candy.png';
import blank from './images/blank.png';
import ScoreBoard from "./components/scoreBoard";

const width =8;

const candyColors= [BlueCandy,GreenCandy,RedCandy,OrangeCandy,PurpleCandy,YellowCandy];

const App=()=> {
  const [currentColorArrangement,setCurrentColorArrangement] = useState([]);
  const [squareBeingDragged,setSquareBeingDragged]= useState(null);
  const [squareBeingReplaced,setSquareBeingReplaced]= useState(null);
  const [scoreDisplay,setScoreDisplay] = useState(0);

  const checkForRowOfFour =()=>
  {
    for(let i=0;i<64;i++)
    {
      const rowOfFour =[i,i+1,i+2];
      const decidedColor=currentColorArrangement[i];
      const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55,61,62,63];
      const isBlank= currentColorArrangement[i]===blank;
      if(notValid.includes(i))
      {
        continue;
      }

      if(rowOfFour.every(square => currentColorArrangement[square]===decidedColor && !isBlank))
      {
        rowOfFour.forEach(element =>(currentColorArrangement[element]=blank));
        setScoreDisplay((score)=>(score+4));
        return true;
          
      };
    }
  }

  const checkForColumnOfFour =()=>
  {
    for(let i=0;i<=39;i++)
    {
      const columnOfFour =[i,i+width,i+width*2,i+width*3];
      const decidedColor=currentColorArrangement[i];
      const isBlank= currentColorArrangement[i]===blank;

      if(columnOfFour.every(square => currentColorArrangement[square]===decidedColor && !isBlank))
      {
        columnOfFour.forEach(element =>(currentColorArrangement[element]=blank));
        setScoreDisplay((score)=>(score+4));
        return true;
          
      };
    }
  }
  const checkForRowOfThree =()=>
  {
    for(let i=0;i<64;i++)
    {
      const rowOfThree =[i,i+1,i+2];
      const decidedColor=currentColorArrangement[i];
      const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55,62,63];
      const isBlank= currentColorArrangement[i]===blank;
      if(notValid.includes(i))
      {
        continue;
      }

      if(rowOfThree.every(square => currentColorArrangement[square]===decidedColor && !isBlank))
      {
        rowOfThree.forEach(element =>(currentColorArrangement[element]=blank));
        setScoreDisplay((score)=>(score+3));
        return true;
          
      };
    }
  }

  const checkForColumnOfThree =()=>
  {
    for(let i=0;i<=47;i++)
    {
      const columnOfThree =[i,i+width,i+width*2];
      const decidedColor=currentColorArrangement[i];
      const isBlank= currentColorArrangement[i]===blank;

      if(columnOfThree.every(square => currentColorArrangement[square]===decidedColor && !isBlank))
      {
        columnOfThree.forEach(element =>(currentColorArrangement[element]=blank));
        setScoreDisplay((score)=>(score+3));
        return true;
          
      };
    }
  }
  const moveIntoSquareBelow = () =>
  {
    
    for(let i=0;i<=55;i++)
    {
    const firstRow= [0,1,2,3,4,5,6,7];
    const isFirstRow =firstRow.includes(i)
    if( isFirstRow && currentColorArrangement[i]===blank)
    {
      let randomNumber= Math.floor(Math.random()*candyColors.length);
      currentColorArrangement[i]=candyColors[randomNumber];
    }
      if(currentColorArrangement[i+width]===blank)
      {
        currentColorArrangement[i+width]=currentColorArrangement[i];
        currentColorArrangement[i]=blank;
      }
    }

  }
  const dragStart=(e)=>
  {
    
    setSquareBeingDragged(e.target);
  }
  const dragDrop=(e)=>
  {
    
    setSquareBeingReplaced(e.target);
  }
  const dragEnd=()=>
  {
    const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

        currentColorArrangement[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
        currentColorArrangement[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')

        const validMoves = [
            squareBeingDraggedId - 1,
            squareBeingDraggedId - width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]

        const validMove = validMoves.includes(squareBeingReplacedId)

        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()

        if (squareBeingReplacedId &&
            validMove &&
            (isARowOfThree || isARowOfFour || isAColumnOfFour || isAColumnOfThree)) {
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        } else {
            currentColorArrangement[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
            currentColorArrangement[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
            setCurrentColorArrangement([...currentColorArrangement])
        }
  }
  

  const createBoard = () =>
  {
    const randomColorArrangement=[];
    for(let i=0;i<width*width;i++)
    {
      const randomColor = candyColors[Math.floor(Math.random()* candyColors.length)];
      randomColorArrangement.push(randomColor);
    }
   setCurrentColorArrangement(randomColorArrangement);
   console.log(currentColorArrangement)
    
  }
  useEffect(()=>
  {
    createBoard();

  },[]);

  useEffect(()=>{
    const timer= setInterval(()=>
    {
      
      checkForColumnOfFour();
      checkForRowOfFour();
      checkForColumnOfThree();
      checkForRowOfThree();
      moveIntoSquareBelow();
      
      setCurrentColorArrangement([...currentColorArrangement]);
    },100);
    return ()=> clearInterval(timer)



  },[checkForColumnOfFour,checkForRowOfFour,checkForColumnOfThree,checkForRowOfThree,moveIntoSquareBelow,currentColorArrangement])
  
  return (
    
    
    <div className="app">
      <div className="game">
        {currentColorArrangement.map((candyColor, index )=>
        (
          <img 
            key={index}
            src={candyColor}
            alt={candyColor}
            data-id={index}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={(e)=> e.preventDefault()}
            onDragEnter={(e)=> e.preventDefault()}
            onDragLeave={(e)=> e.preventDefault()}
            onDrop={dragDrop}
            onDragEnd={dragEnd}
          />
        ))}


      </div>
      <ScoreBoard score={scoreDisplay}/>
      
    </div>
    
  );

        }
export default App;
