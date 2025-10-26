
import { FileIcon, FileImage,FileJson,File } from 'lucide-react'

const _textProperties = {
    text:'',
    fontSize:24,
    fontFamily:'Arial',
    fontWeight:'normal',
    fontStyle:'normal',
    underline:false,
    textColor:'#000000',
    textBackgroundColor:'#000000',
    spacing:0,
    letterSpacing:0,

}

const _imageProperties = {
    fillColor:'#000000',
    borderColor:'#000000',
    borderWidth:0,
    borderStyle:'solid',
    filter:'none',
    blur:0

}

const borderStyles = ['solid','dashed','dotted']

const fontFamilies = [
    'Arial',
    'Helvetica',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Verdana',
    'Impact',
    'Comic Sans MS',
]

const exportFormats = [
    {
      id:'png',
      name:'PNG Image',
      icon:FileImage,
      description:'best for web and social media',
    },
    {
      id:'svg',
      name:'SVG Vector',
      icon:FileIcon,
      description:'Scalable vector format',
    },
    {
      id:'pdf',
      name:'PDF Document',
      icon: File,
      description:'Best for printing',
    },
    {
      id:'json',
      name:'JSON  Template',
      icon:FileJson,
      description:'Editable template format',
    },
  ]

export {_textProperties,fontFamilies,
    _imageProperties,borderStyles,exportFormats}