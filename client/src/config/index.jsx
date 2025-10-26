const { Youtube, Type, Heart, Sticker, Palette, Image, Printer, Sparkles, Upload, Wand2 } = require("lucide-react");


const designTypes = [ 
    {
        id:1,
        icon:<Youtube className="h-6 w-6 text-white"/>,
        label:'Youtube Thumbnail',
        bgColor:'bg-purple-500',
    },
    {
        id:2,
        icon:<Type className="h-6 w-6 text-white"/>,
        label:'Typography',
        bgColor:'bg-blue-500',
    },
    {
        id:3,
        icon:<Palette className="h-6 w-6 text-white"/>,
        label:'Color  Palette',
        bgColor:'bg-green-500',
    },
    {
        id:4,
        icon:<Sticker className="h-6 w-6 text-white"/>,
        label:'Stickers',
        bgColor:'bg-pink-500',
    },
    {
        id:5,
        icon:<Image className="h-6 w-6 text-white"/>,
        label:'Images',
        bgColor:'bg-red-500',
    },
    {
        id:6,
        icon:<Printer className="h-6 w-6 text-white"/>,
        label:'Print',
        bgColor:'bg-orange-500',
    },
    {
        id:7,
        icon:<Sparkles className="h-6 w-6 text-white"/>,
        label:'AI backround',
        bgColor:'bg-blue-500',
    },
    {
        id:8,
        icon:<Wand2 className="h-6 w-6 text-white"/>,
        label:'AI image con',
        bgColor:'bg-purple-500',
    },
    {
        id:9,
        icon:<Upload className="h-6 w-6 text-gray-500"/>,
        label:'Typography',
        bgColor:'bg-white',
    }
]

const colorPresets = [
  // Whites & Grays
  '#FFFFFF', // Pure White
  '#F8F9FA', // Light Gray
  '#E9ECEF', // Light Gray 2
  '#DEE2E6', // Medium Light Gray
  '#ADB5BD', // Medium Gray
  '#6C757D', // Gray
  '#495057', // Dark Gray
  '#343A40', // Darker Gray
  '#212529', // Very Dark Gray
  '#000000', // Pure Black
  
  // Reds
  '#FFEBEE', // Light Red
  '#FFCDD2', // Lighter Red
  '#EF5350', // Medium Red
  '#E53935', // Red
  '#C62828', // Dark Red
  '#B71C1C', // Very Dark Red
  
  // Pinks & Purples
  '#FCE4EC', // Light Pink
  '#F8BBD9', // Pink
  '#E91E63', // Deep Pink
  '#D81860', // Dark Pink
  '#AD1457', // Very Dark Pink
  '#880E4F', // Darkest Pink
  
  // Purples & Violets
  '#F3E5F5', // Light Purple
  '#CE93D8', // Light Violet
  '#AB47BC', // Medium Purple
  '#8E24AA', // Purple
  '#7B1FA2', // Dark Purple
  '#5E3581', // Deep Purple
  
  // Blues
  '#E3F2FD', // Light Blue
  '#90CAF9', // Light Blue 2

 
]

const textPresets = [
    {
        name:'Heading',
        text:'Add a heading',
        fontSize:36,
        fontWeight:'bold',
        fontFamily:'Inter, sans-serif'
    },
    {
        name:'Subheading',
        text:'Add a sub heading',
        fontSize:24,
        fontWeight:'normal',
        fontFamily:'Inter, sans-serif'
    },
    {
        name:'Body Text',
        text:'Add body text',
        fontSize:16,
        fontWeight:'normal',
        fontFamily:'Inter, sans-serif'
    },
    {
        name:'caption',
        text:'Add a caption',
        fontSize:12,
        fontWeight:'normal',
        fontFamily:'Inter, sans-serif',
        fontStyle:'normal'
    },

]

const brushSizes = [
    {
        value:2,
        label:'Small'
    },
    {
        value:5,
        label:'Medium'
    },
    {
        value:10,
        label:'Large'
    },
    {
        value:20,
        label:'Extra Large'
    }
]

const drawingColorPresets = [
  // Whites & Grays
  '#FFFFFF', // Pure White
  '#F8F9FA', // Light Gray
  '#E9ECEF', // Light Gray 2
  '#DEE2E6', // Medium Light Gray
  '#ADB5BD', // Medium Gray
  '#6C757D', // Gray
  '#495057', // Dark Gray
  '#343A40', // Darker Gray
  '#212529', // Very Dark Gray
  '#000000', // Pure Black
  
  // Reds
  '#FFEBEE', // Light Red
  '#FFCDD2', // Lighter Red
  '#EF5350', // Medium Red
  '#E53935', // Red
  '#C62828', // Dark Red
  '#B71C1C', // Very Dark Red
  
  // Pinks & Purples
  '#FCE4EC', // Light Pink
  '#F8BBD9', // Pink
  '#E91E63', // Deep Pink
  '#D81860', // Dark Pink
  '#AD1457', // Very Dark Pink
  '#880E4F', // Darkest Pink
  
  // Purples & Violets
  '#F3E5F5', // Light Purple
  '#CE93D8', // Light Violet
  '#AB47BC', // Medium Purple
  '#8E24AA', // Purple
  '#7B1FA2', // Dark Purple
  '#5E3581', // Deep Purple
  
  // Blues
  '#E3F2FD', // Light Blue
  '#90CAF9', // Light Blue 2

 
]

export {designTypes,colorPresets,textPresets,drawingColorPresets,brushSizes}