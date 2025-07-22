'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

export default function PaymentMethod({
  name,
  url,
  selected,
  onSelect,
}: {
  name: string
  url: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <Label
      onClick={onSelect}
      className="hover:bg-accent/50 cursor-pointer flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
    >
      <Checkbox
        checked={selected}
        onCheckedChange={onSelect}
        className="pointer-events-none data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
      />
      <div className="grid gap-1.5 font-normal">
        <p className="capitalize text-sm leading-none font-medium flex items-center gap-2">
          {name =="cod"?"Cash on develvery":name}
          <Image src={url} width={20} height={20} alt={name} />
        </p>
      </div>
    </Label>
  )
}
