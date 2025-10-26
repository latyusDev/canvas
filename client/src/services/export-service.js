import { saveAs } from "file-saver";
import jsPDF from "jspdf";

const exportAsJson = (canvas,fileName = 'FileName')=>{

    if(!canvas) return;

    try{

        const canvasData = canvas.toJSON(['id','filters']);
        const jsonString = JSON.stringify(canvasData);
        const canvasJsonBlob = new Blob([jsonString],{type:'application/json'});
        saveAs(canvasJsonBlob,`${fileName}.json`);

    }catch(e){
        console.log(e)
        return false
    }

} 


const exportAsSVG = (canvas,fileName='SVG FileName',options={})=>{
    if(!canvas) return;

    try{

        const svgData = canvas.toSVG();
        const blob = new Blob([svgData],{type:'image/svg+xml'})
        saveAs(blob,`${fileName}`)
    }catch(e){
        console.log(e)
        return false
    }
}
const exportAsPng = (canvas,fileName='PNG FileName',options={})=>{
    if(!canvas) return;

    try{
        const defaultOptions = {
            format:'png',
            quality:1,
            multiplier:1,
            enableRetinaScaling:true,
            ...options
        }
        const dataUrl = canvas.toDataURL(defaultOptions)
        saveAs(dataUrl,`${fileName}`)
    }catch(e){
        console.log(e)
        return false
    }
}
const exportAsPDF = (canvas,fileName='PNG FileName',options={})=>{
    if(!canvas) return;

    try{
        const defaultOptions = {
            format:'a4',
            orientation:'landscape',
            unit:'mm',
            ...options
        }

        const pdf = new jsPDF(
            defaultOptions.orientation,
            defaultOptions.unit,
            defaultOptions.format,
        )
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()

        const dataUrl = canvas.toDataURL(defaultOptions)

        const scale = Math.min(pdfWidth/canvasWidth,pdfHeight/canvasHeight)*0.9//90% of the space available
        const x = (pdfWidth - canvasWidth*scale)/2
        const y = (pdfHeight - canvasHeight*scale)/2
        const imageData = canvas.toDataURL('image/png',1.0);
        pdf.addImage(
            imageData,
            'PNG',
            x,y,canvasWidth*scale,canvasHeight*scale
        ) 
        pdf.save(`${fileName}`)
        return true
    }catch(e){
        console.log(e)
        return false
    }
}


export {exportAsJson,exportAsPng,exportAsSVG,exportAsPDF}