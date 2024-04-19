'use client'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { ArticlePost } from '@/lib/validations/Userpost'
import { zodResolver } from '@hookform/resolvers/zod'
import { Image } from '@nextui-org/react'
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type Props = {}

export default function Postt({}: Props) {
  const [image, setImage] = useState<string[]>([])

  const postArticle = useForm<z.infer<typeof ArticlePost>>({
    resolver: zodResolver(ArticlePost),
    defaultValues: {},
  })

  const onSubmitPost = async () => {
    console.log('submitted')
  }

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault()
    const fileReadar = new FileReader()

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (!file.type.includes('image')) return

      fileReadar.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ''
        fieldChange(imageDataUrl)
        setImage((prevImages) => [...prevImages, imageDataUrl])
      }
      fileReadar.readAsDataURL(file)
      console.log(setImage)
    }
  }

  return (
    <Form {...postArticle}>
      <form onSubmit={postArticle.handleSubmit(onSubmitPost)}>
        <FormField
          control={postArticle.control}
          name="articleImage"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              {image.map((image, index) => (
                <div key={index}>
                  <Image alt="" src={image} />
                </div>
              ))}
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  )
}
