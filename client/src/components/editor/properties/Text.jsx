import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const Text = ({textProperties}) => {
    console.log(textProperties)
  return (
  <div>
                  <div className="space-y-4 border-t">
                      <h3 className="text-sm font-medium"> Text Properties</h3>
                      <div className="space-y-2">
                          <Label className={'text-xs'} htmlFor='text-content'>Text Content</Label>
                          <Textarea
                          id='text-content'
                          value={textProperties?.text}
                          onChange={handleTextChange}
                          className={'h-20 resize-none'}
                          />
  
                      </div>
                  </div>
              </div>
  )
}

export default Text