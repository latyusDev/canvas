


export const createShape = (fabric,type,shapeDefinitions,customProps = {})=>{
        const definition = shapeDefinitions[type]
        // console.log(definition)
        if(!definition) return null ;

        const props = {...definition?.defaultProps,...customProps};

        // switch(definition.type){
        //     case 'rect':
        //         return new fabric.Rect(proper)
        //     case 'circle':
        //         return new fabric.Circle(proper)
        //     default :
        //          return null
        // }

        
    let shape;
    switch (definition.type) {
        case 'rect':
            shape = new fabric.Rect(props);
            break;
        case 'circle':
            shape = new fabric.Circle(props);
            break;
        case 'ellipse':
            shape = new fabric.Ellipse(props);
            break;
        case 'line':
            shape = new fabric.Line([props.x1, props.y1, props.x2, props.y2], props);
            break;
        case 'polygon':
            shape = new fabric.Polygon(props.points, props);
            break;
        case 'path':
            shape = new fabric.Path(props.path, props);
            break;
        default:
            console.error(`Unknown shape type: ${definition.type}`);
            return null;
    }

    return shape;
}