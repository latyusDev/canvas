'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { exportAsJson, exportAsPDF, exportAsPng, exportAsSVG } from '@/services/export-service'
import { exportFormats } from '@/static/data'
import { useEditorStore } from '@/store/useEditorStore'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Download, Loader2 } from 'lucide-react'
import React, { useState } from 'react'

const ExportModal = ({isOpened,onClose}) => {
  const {canvas} = useEditorStore();
  const [selectedFormat,setSelectedFormat] = useState('png')
  const [isExporting,setIsExporting] = useState(false);

  

  if(!isOpened) return null;

  const handleExport=async()=>{
    if(!canvas) return ;
    setIsExporting(true)
    try{
        let successFlag = false;
        switch(selectedFormat){
          case 'json':
                successFlag = exportAsJson(canvas,'JSON filename')
          break
          case 'png':
                successFlag = exportAsPng(canvas,'PNG filename')
          break
          case 'svg':
                successFlag = exportAsSVG(canvas,'SVG filename')
          break
          case 'pdf':
                successFlag = exportAsPDF(canvas,'SVG filename')
          break
          default:
          break;
        }

        if(successFlag){
          setTimeout(()=>{
              onClose()
          },500)
        }
    }catch(e){
      throw new error('Export Failed');

    }finally{
      setIsExporting(false)
    }
  }

  
  return (
    <div>
      <Dialog open={isOpened} onOpenChange={onClose} >
        <DialogContent className={'sm:max-w-2xl'}>
          <DialogHeader>
            <DialogTitle className='text-xl'>Export Designs</DialogTitle>
          </DialogHeader>
          <div className='pt-4'>
            <h3 className='text-xs font-medium mb-3'>Choose Format</h3>
            <div className='grid grid-cols-2 gap-2'>
              {
                exportFormats.map(exportFormat=>(
                  <Card key={exportFormat.id} 
                  className={cn("cursor-pointer border transition-colors hover:bg-accent hover:text-accent-foreground",
                    selectedFormat === exportFormat.id?'border-primary bg-accent':'border-border'
                  )}
                  onClick={()=>setSelectedFormat(exportFormat.id)}
                  >
                    <CardContent className={'p-4 flex flex-col items-center text-center'}>
                      <exportFormat.icon className={cn('h-8 w-8 mb-2',selectedFormat === exportFormat.id ? 'text-primary':'text-muted-forground')} />
                      <h4 className='font-medium text-sm'>{exportFormat.name}</h4>
                      <p className='mt-1 text-muted-foreground font-medium'>{exportFormat.description}</p>
                    </CardContent>


                  </Card>
                ))
              }
            </div>
        <DialogFooter className={' mt-3'}>
          <button onClick={handleExport} disabled={isExporting}
          className='min-w-[120px] bg-purple-700 text-white p-3 rounded-md'
          variant='default'>
            {
              isExporting? <>
                <Loader2 className='mr-2 h-4 w-4'/>
                Exporting...
              </>:
              <div className='flex items-center gap-2'>
                <Download className=' h-4 w-4'/>
                Export {selectedFormat.toUpperCase()}
              </div>
            }
          </button>

        </DialogFooter>
          </div>

        </DialogContent>

      </Dialog>
    </div>
  )
}

export default ExportModal