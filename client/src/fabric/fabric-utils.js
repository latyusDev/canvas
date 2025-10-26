import { FabricImage } from 'fabric'
import { shapesDefinitions } from './shapes/shape-definitions'
import { createShape } from './shapes/shape-factory'

const initializeFabric = async(canvasEl,containerEl)=>{
    try{

        const {Canvas,PencilBrush} = await import('fabric')
        const canvas = new Canvas(canvasEl,{
            preserveObjectStacking:true,
            isDrawingMode:false,
            renderOnAddRemove:true
        })
        // create a drawing init
        const brush = new PencilBrush(canvas)
        brush.color = '#000000',
        brush.width = 10
        canvas.freeDrawingBrush = brush
        return canvas 


    }catch(e){
        console.error(e)
        return null
    }
    
}

const centerCanvas = (canvas)=>{
    if(!canvas || !canvas.wrapperEl) return;
    const canvasWrapper = canvas.wrapperEl;
    canvasWrapper.style.width = `${canvas.width}px`
    canvasWrapper.style.height = `${canvas.height}px`
    canvasWrapper.style.position = 'absolute';
    canvasWrapper.style.top = '50%';
    canvasWrapper.style.left = '50%';
    canvasWrapper.style.transform = 'translate(-50%,-50%)';

}

const addShapeToCanvas = async(canvas,shapeType,customProps={})=>{

    if(!canvas) return ;

    try{

        const fabricModule = await import('fabric');

        const shape = createShape(fabricModule,shapeType,shapesDefinitions,{
            left:100,
            top:100,
            ...customProps
        });
        console.log(shape)

        if(shape){
            shape.id = `${shapeType}-${Date.now()}`,
            canvas.add(shape);
            canvas.setActiveObject(shape);
            canvas.renderAll();
            return shape
        }
        
    }catch(e){
            console.error(e)
    }
}

const addTextToCanvas = async(canvas,text,options={},background = false)=>{
        if(!canvas) return null ;

        try{
            const {IText} = await import('fabric');
            const defaultProps = {
                left:100,
                top:100,
                fontSize:24,
                fontFamily:'Arial',
                fill:'#000000',
                padding:10,
                textAlign:'left',
                id:`text-${Date.now()}`
            }

            const textObj = new IText(text,{
                ...defaultProps,
                ...options
            })
            canvas.add(textObj)
            canvas.setActiveObject(textObj)
            canvas.renderAll(textObj);

            return textObj;

        }catch(e){
            console.error(e)
            return null;
        }
}

const toggleDrawingMode = (canvas,isDrawingMode,drawingColor= '#000000',brushWidth= 5)=>{
    if(!canvas) return null;
    try{
        canvas.isDrawingMode = isDrawingMode
        if(isDrawingMode){
            canvas.freeDrawingBrush.color = drawingColor;
            canvas.freeDrawingBrush.width = brushWidth;
        }
        return true
    }catch(e){
        console.error(e);
        return null
    }
}

const toggleEraseMode =(canvas,isErasing,previousColor='#000000',eraserwidth=20)=>{
if(!canvas|| !canvas.freeDrawingBrush) return false;

try{
    if(isErasing){
        canvas.freeDrawingBrush.color = '#ffffff';
        canvas.freeDrawingBrush.width = eraserwidth;
    }else{
        canvas.freeDrawingBrush.color = previousColor
        canvas.freeDrawingBrush.width = 5
    }
    return true
}catch(e){
    console.error(e)
    return false
}
}


const updateDrawingBrush = (canvas,properties={})=>{
    if(!canvas|| !canvas.freeDrawingBrush) return false;
    try{
        const {width,color,opacity} = properties;
        if(color !== undefined){
            canvas.freeDrawingBrush.color = color
        }
        if(width !== undefined){
            canvas.freeDrawingBrush.width = width
        }
        if(opacity !== undefined){
            canvas.freeDrawingBrush.opacity = opacity
        }
        return true;

    }catch(e){
        console.error(e)
        return false
    }
}

const addImageToCanvas = async(canvas,imageUrl)=>{
    if(!canvas) return null;

    try{
        const {image:fabricImage} = await import('fabric')
        let imgObj = new Image();
        imgObj.crossOrigin = 'Anonymous'
        imgObj.src = imageUrl;
        return new Promise((resolve,reject)=>{
            imgObj.onload = ()=>{
                let image = new FabricImage(imgObj);
                image.set({
                    id:`image-id-${Date.now()}`,
                    top:100,
                    left:100,
                    padding:10,
                    cornerSize:10
                })

                const maxDimension = 400;
                if(image.width > maxDimension || image.height > maxDimension){
                    if(image.width > image.height){
                        const scale = maxDimension/image.width;
                        image.scale(scale);
                    }else{
                        const scale = maxDimension/image.height;
                        image.scale(scale);
                    }
                }
                canvas.add(image);
                canvas.setActiveObject(image);
                canvas.renderAll()
                resolve(image)
            }
            imgObj.onerror = ()=>{
                reject(new Error('Failed to load image',imageUrl))
            }
        })
        // const 
    }catch(e){
        console.error('error adding imege :'+e)
        return null;
    }
}


const cloneSelectedObject = async(canvas)=>{
    if(!canvas) return;
    const activeObject = canvas.getActiveObject();
    if(!activeObject) return;

    try{
        const clonedObject = await activeObject.clone();
        clonedObject.set({
            left:activeObject.left +10,
            top:activeObject.top +10,
            id:`${activeObject.type||Date.now()}`,
        })
        canvas.add(clonedObject)
        canvas.renderAll()
        return clonedObject
    }catch(e){
        console.log('error while cloning')
        return null;
    }
}

const deleteSelectedObject = (canvas)=>{

    const activeObject = canvas.getActiveObject();
    if(!activeObject) return;
    try{
        canvas.remove(activeObject);
        canvas.discardActiveObject()
        canvas.renderAll();
        return true;
    }catch(e){
        console.log(e)
        return false
    }


}

const customizeBoundingBox = (canvas)=>{
    if(!canvas) return;
    try{
        canvas.on('object:added',(e)=>{
            if(e.target){
                e.target.set({
                    borderColor:'#000000',
                    cornerColor:'#ffffff',
                    cornerStrokeColor:'#000000',
                    cornerSize:10,
                    transparentCorners:false
                })
            }
        })

        canvas.getObjects().forEach(obj=>{
              obj.target.set({
                    borderColor:'#000000',
                    cornerColor:'#ffffff',
                    cornerStrokeColor:'#000000',
                    cornerSize:10,
                    transparentCorners:false
                })
        })
        canvas.renderAll()
    }catch(e){
        console.log('failed to customize bounding box'+e)
    }
}
export {initializeFabric,centerCanvas,addShapeToCanvas,toggleEraseMode,addImageToCanvas,customizeBoundingBox,
    updateDrawingBrush,toggleDrawingMode,addTextToCanvas,cloneSelectedObject,deleteSelectedObject}