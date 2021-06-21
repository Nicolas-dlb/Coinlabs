import './Grid.scss';

type GridProps = {
    tooltip?: true;
}

/* <svg className={`grid${number}`} width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    <svg className={`grid${number +4}`} width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
            <svg className={`grid${number +3}`} width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
            <svg className={`grid${number +6}`} width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg> */

function Grid({tooltip = undefined}: GridProps) {
    const halfGrid = (number: number) =>  (<>
    <div className="grid-container">
        <div className={`grid${number}`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid${number}`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid${number}`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid${number}`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid${number}`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid${number}`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid${number}`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    </div>
            </>
    );

    const verticalGrid = () => (
        <>
<div className="grid_vertical">
     <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    <div className={`grid_v`}>
<svg width="100%" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
	    		<line stroke-dasharray="10, 5" x1="0" y1="10" x2="80%" y2="10" style={{strokeWidth: "2px", stroke: "grey"}}></line>
            </svg>
    </div>
    
    
   
    
</div>
        </>
    )
    return (
        <>
{tooltip ? halfGrid(2) 
            : 
            <div className="grid">
            <span className="grid_card"></span>
            <span className="grid_card"></span>
            <span className="grid_card"></span>
            <span className="grid_card"></span>
            <span className="grid_card"></span>
        </div>
}
{tooltip && verticalGrid()}

        </>
      
		  
    )
}

export default Grid
